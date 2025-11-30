import React, { useState, useEffect, useRef } from 'react';
import { ICONS } from '../constants';
import { createTherapistChat, convertTextToSpeech } from '../services/gemini';
import { Message } from '../types';
import { Chat } from '@google/genai';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '你好呀！我是 Oasis。今天工作累了吗？想说什么都可以告诉我，这里只有我们两个人。🌿',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // Initialize chat session
    if (!chatSessionRef.current) {
      chatSessionRef.current = createTherapistChat();
    }
    // Init audio context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      stopAudio();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const stopAudio = () => {
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
      } catch (e) {}
      currentSourceRef.current.disconnect();
      currentSourceRef.current = null;
    }
    setPlayingId(null);
  };

  // Helper: Decode Base64 to Uint8Array
  const decodeBase64 = (base64: string): Uint8Array => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  // Helper: Convert PCM data (Int16) to AudioBuffer (Float32)
  const pcmToAudioBuffer = (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number = 24000,
    numChannels: number = 1
  ): AudioBuffer => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        // Convert Int16 [-32768, 32767] to Float32 [-1.0, 1.0]
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const handlePlayAudio = async (msg: Message) => {
    // If clicking same message that is playing, stop it
    if (playingId === msg.id) {
      stopAudio();
      return;
    }

    // Stop previous
    stopAudio();
    setLoadingAudioId(msg.id);

    // Fetch Audio
    const base64Audio = await convertTextToSpeech(msg.text);
    
    if (!base64Audio) {
      setLoadingAudioId(null);
      return;
    }

    try {
      if (!audioContextRef.current) {
         audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Decode Base64 manually
      const pcmData = decodeBase64(base64Audio);
      // Convert PCM to AudioBuffer manually (native decodeAudioData fails on headerless PCM)
      const audioBuffer = pcmToAudioBuffer(pcmData, audioContextRef.current, 24000); // 24kHz is standard for Gemini TTS
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => {
        setPlayingId(null);
        currentSourceRef.current = null;
      };

      currentSourceRef.current = source;
      source.start(0);
      setPlayingId(msg.id);
    } catch (e) {
      console.error("Audio playback error", e);
    } finally {
      setLoadingAudioId(null);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatSessionRef.current) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatSessionRef.current.sendMessage({ message: userMsg.text });
      const text = response.text || "抱歉，我刚刚走神了，能再说一遍吗？";
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "抱歉，连接有点不稳定，就像偶尔的心情波动。请稍后再试一下吧。",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/50">
      {/* Header */}
      <div className="p-4 border-b border-sage-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-sage-800">心灵树洞</h2>
          <p className="text-xs text-sage-500">AI 疗愈师在线</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-sage-200 flex items-center justify-center text-sage-600 text-sm">
          O
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-sage-600 text-white rounded-br-none'
                    : 'bg-white text-gray-700 border border-sage-100 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>

              {/* Speaker Icon for Model messages */}
              {msg.role === 'model' && (
                <button
                  onClick={() => handlePlayAudio(msg)}
                  className="p-2 bg-white rounded-full border border-gray-100 shadow-sm text-sage-500 hover:text-sage-700 hover:shadow-md transition-all flex-shrink-0"
                  title="Play Voice"
                >
                  {loadingAudioId === msg.id ? (
                    <ICONS.Loading className="w-4 h-4" />
                  ) : playingId === msg.id ? (
                    <ICONS.Stop className="w-4 h-4 fill-current" />
                  ) : (
                    <ICONS.Speaker className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-sage-100 rounded-2xl rounded-bl-none px-4 py-3 flex space-x-1">
              <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-sage-100 absolute bottom-0 left-0 w-full">
        <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 px-4 py-2 focus-within:border-sage-400 focus-within:ring-2 focus-within:ring-sage-100 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="告诉我想说的..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-full transition-colors ${
              input.trim() && !isLoading ? 'text-sage-600 hover:bg-sage-100' : 'text-gray-300'
            }`}
          >
            <ICONS.Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;