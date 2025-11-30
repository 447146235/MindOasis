import React, { useState, useEffect } from 'react';
import { ICONS, SOUND_PRESETS } from '../constants';
import { audioEngine } from '../services/audioEngine';
import { SoundType } from '../types';

const MusicPlayer: React.FC = () => {
  const [activeSound, setActiveSound] = useState<SoundType | null>(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      audioEngine.stop();
    };
  }, []);

  const toggleSound = (soundId: SoundType) => {
    if (activeSound === soundId) {
      audioEngine.stop();
      setActiveSound(null);
    } else {
      setActiveSound(soundId);
      audioEngine.play(soundId, volume);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-calm-800">疗愈声波</h2>
        <p className="text-calm-600">戴上耳机，隔绝喧嚣。</p>
      </div>

      <div className="flex-1 grid grid-cols-1 gap-4 overflow-y-auto">
        {SOUND_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => toggleSound(preset.id)}
            className={`flex items-center p-4 rounded-2xl border transition-all duration-300 ${
              activeSound === preset.id 
                ? 'bg-calm-500 text-white border-calm-600 shadow-lg scale-[1.02]' 
                : 'bg-white text-gray-700 border-calm-100 hover:border-calm-300 shadow-sm'
            }`}
          >
            <div className={`p-3 rounded-full mr-4 ${activeSound === preset.id ? 'bg-white/20' : 'bg-calm-100 text-calm-600'}`}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={preset.icon} />
              </svg>
            </div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-lg">{preset.name}</h3>
              <p className={`text-sm ${activeSound === preset.id ? 'text-calm-50' : 'text-gray-400'}`}>
                {preset.description}
              </p>
            </div>
            <div className="ml-2">
               {activeSound === preset.id ? (
                 <div className="flex space-x-1 items-end h-6">
                   <div className="w-1 bg-white animate-[bounce_1s_infinite] h-3"></div>
                   <div className="w-1 bg-white animate-[bounce_1.2s_infinite] h-5"></div>
                   <div className="w-1 bg-white animate-[bounce_0.8s_infinite] h-4"></div>
                 </div>
               ) : (
                 <ICONS.Play className="w-6 h-6 text-gray-300" />
               )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm border border-calm-100">
        <div className="flex items-center space-x-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Volume</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={handleVolumeChange}
            className="flex-1 h-2 bg-calm-200 rounded-lg appearance-none cursor-pointer accent-calm-600"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
