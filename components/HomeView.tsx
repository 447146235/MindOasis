import React, { useState, useEffect } from 'react';
import { generateDailyQuote } from '../services/gemini';
import { ICONS, MOODS, MOOD_RESPONSES } from '../constants';

// Helper component for typewriter effect
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let index = 0;
    
    // Simple logic: if text is the placeholder, show immediately, otherwise animate
    if (text === "正在获取今日能量...") {
        setDisplayedText(text);
        return;
    }

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100); // 100ms per char

    return () => clearInterval(timer);
  }, [text]);

  return <span className="font-serif leading-relaxed">{displayedText}</span>;
};

interface HomeViewProps {
  onViewChange: (view: any) => void;
  userName: string;
  onSaveMood: (moodId: string) => void;
  todayMoodId?: string;
}

const HomeView: React.FC<HomeViewProps> = ({ onViewChange, userName, onSaveMood, todayMoodId }) => {
  const [quote, setQuote] = useState("正在获取今日能量...");
  const [selectedMood, setSelectedMood] = useState<string | null>(todayMoodId || null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    generateDailyQuote().then(setQuote);
    
    const hour = new Date().getHours();
    if (hour < 5) setGreeting("夜深了");
    else if (hour < 11) setGreeting("早安");
    else if (hour < 13) setGreeting("午安");
    else if (hour < 18) setGreeting("下午好");
    else setGreeting("晚安");

  }, []);

  useEffect(() => {
    if (todayMoodId) {
        setSelectedMood(todayMoodId);
    }
  }, [todayMoodId]);

  const refreshQuote = async () => {
    setQuote("正在获取今日能量...");
    const newQuote = await generateDailyQuote();
    setQuote(newQuote);
  };

  const handleMoodSelect = (moodId: string) => {
      setSelectedMood(moodId);
      onSaveMood(moodId);
  };

  const currentMoodResponse = selectedMood ? MOOD_RESPONSES[selectedMood] : null;

  return (
    <div className="p-6 h-full overflow-y-auto pb-24">
      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-bold text-sage-800">{greeting}, {userName}</h1>
        <p className="text-sage-600 mt-1">今天也要好好爱自己 🌿</p>
      </header>

      {/* Daily Quote Card */}
      <section className="bg-gradient-to-br from-sage-500 to-sage-700 rounded-3xl p-6 text-white shadow-lg mb-8 relative overflow-hidden group min-h-[160px] flex flex-col justify-center">
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <button onClick={refreshQuote} className="p-2 bg-white/20 rounded-full hover:bg-white/30 backdrop-blur-sm transition-colors">
                <ICONS.Refresh className="w-4 h-4 text-white" />
            </button>
        </div>
        <div className="relative z-10">
          <div className="text-xs font-bold tracking-widest opacity-70 mb-3 uppercase">Daily Wisdom</div>
          <div className="text-xl font-medium min-h-[60px]">
             <TypewriterText text={quote} />
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
      </section>

      {/* Mood Tracker */}
      <section className="mb-8">
        <h3 className="text-lg font-bold text-sage-800 mb-4">现在感觉如何？</h3>
        <div className="flex justify-between mb-6">
          {MOODS.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood.id)}
              className={`flex flex-col items-center transition-all duration-300 ${
                selectedMood === mood.id ? 'scale-125 -translate-y-2' : 'opacity-70 hover:opacity-100 hover:scale-110'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm border transition-colors ${selectedMood === mood.id ? 'bg-white border-sage-300 shadow-md' : 'bg-white border-transparent'}`}>
                {mood.emoji}
              </div>
              <span className={`text-xs mt-2 transition-colors ${selectedMood === mood.id ? 'text-sage-800 font-bold' : 'text-sage-600'}`}>{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Mood Response */}
        {currentMoodResponse && (
            <div className={`animate-fade-in p-5 rounded-2xl border ${currentMoodResponse.color} shadow-sm transition-all`}>
                <div className="flex items-start">
                    <div>
                        <h4 className="font-bold text-base mb-1">{currentMoodResponse.title}</h4>
                        <p className="text-sm opacity-90 leading-relaxed">{currentMoodResponse.message}</p>
                    </div>
                </div>
            </div>
        )}
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="text-lg font-bold text-sage-800 mb-4">开始疗愈</h3>
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 cursor-pointer hover:bg-orange-100 transition-colors group" onClick={() => (window as any).dispatchEvent(new CustomEvent('nav-change', { detail: 'SHREDDER' }))}>
                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center text-orange-600 mb-3 group-hover:scale-110 transition-transform">
                    <ICONS.Shredder className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-800">烦恼粉碎机</h4>
                <p className="text-xs text-gray-500 mt-1">释放压力，粉碎烦恼</p>
            </div>
             <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors group" onClick={() => (window as any).dispatchEvent(new CustomEvent('nav-change', { detail: 'MUSIC' }))}>
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                    <ICONS.Music className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-800">疗愈声波</h4>
                <p className="text-xs text-gray-500 mt-1">白噪音助眠冥想</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;