import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import { ICONS } from './constants';
import HomeView from './components/HomeView';
import AIChat from './components/AIChat';
import WorryShredder from './components/WorryShredder';
import MusicPlayer from './components/MusicPlayer';
import Onboarding from './components/Onboarding';
import MoodDiary from './components/MoodDiary';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [userName, setUserName] = useState<string | null>(localStorage.getItem('user_name'));
  // Store mood logs as { "2023-10-27": "happy", ... }
  const [moodLogs, setMoodLogs] = useState<Record<string, string>>(() => {
    return JSON.parse(localStorage.getItem('mood_logs') || '{}');
  });

  // Listen for quick nav events from Home view
  useEffect(() => {
    const handleNavChange = (e: CustomEvent) => {
        const view = e.detail as AppView;
        if (Object.values(AppView).includes(view)) {
            setCurrentView(view);
        }
    };
    window.addEventListener('nav-change', handleNavChange as EventListener);
    return () => window.removeEventListener('nav-change', handleNavChange as EventListener);
  }, []);

  const handleOnboardingComplete = (name: string) => {
    setUserName(name);
    localStorage.setItem('user_name', name);
  };

  const handleSaveMood = (moodId: string) => {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const newLogs = { ...moodLogs, [dateStr]: moodId };
    setMoodLogs(newLogs);
    localStorage.setItem('mood_logs', JSON.stringify(newLogs));
  };

  const getTodayMood = () => {
     const today = new Date();
     const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
     return moodLogs[dateStr];
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomeView onViewChange={setCurrentView} userName={userName || '朋友'} onSaveMood={handleSaveMood} todayMoodId={getTodayMood()} />;
      case AppView.CHAT:
        return <AIChat />;
      case AppView.SHREDDER:
        return <WorryShredder />;
      case AppView.MUSIC:
        return <MusicPlayer />;
      case AppView.DIARY:
        return <MoodDiary moodLogs={moodLogs} />;
      default:
        return <HomeView onViewChange={setCurrentView} userName={userName || '朋友'} onSaveMood={handleSaveMood} todayMoodId={getTodayMood()} />;
    }
  };

  if (!userName) {
    return (
        <div className="flex justify-center min-h-screen bg-sage-50 font-sans text-gray-800">
             <div className="w-full max-w-md bg-white h-[100dvh] shadow-2xl overflow-hidden flex flex-col relative">
                <Onboarding onComplete={handleOnboardingComplete} />
             </div>
        </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-sage-50 font-sans text-gray-800">
      <div className="w-full max-w-md bg-white h-[100dvh] shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
            {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-gray-100 px-4 py-4 pb-8 flex justify-between items-center z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
          <button 
            onClick={() => setCurrentView(AppView.HOME)}
            className={`flex flex-col items-center space-y-1 transition-colors w-1/5 ${currentView === AppView.HOME ? 'text-sage-600' : 'text-gray-300 hover:text-sage-400'}`}
          >
            <ICONS.Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">首页</span>
          </button>

           <button 
            onClick={() => setCurrentView(AppView.SHREDDER)}
            className={`flex flex-col items-center space-y-1 transition-colors w-1/5 ${currentView === AppView.SHREDDER ? 'text-sage-600' : 'text-gray-300 hover:text-sage-400'}`}
          >
            <ICONS.Shredder className="w-6 h-6" />
            <span className="text-[10px] font-medium">发泄</span>
          </button>

           <button 
            onClick={() => setCurrentView(AppView.MUSIC)}
            className={`flex flex-col items-center space-y-1 transition-colors w-1/5 ${currentView === AppView.MUSIC ? 'text-sage-600' : 'text-gray-300 hover:text-sage-400'}`}
          >
            <ICONS.Music className="w-6 h-6" />
            <span className="text-[10px] font-medium">助眠</span>
          </button>

          <button 
            onClick={() => setCurrentView(AppView.DIARY)}
            className={`flex flex-col items-center space-y-1 transition-colors w-1/5 ${currentView === AppView.DIARY ? 'text-sage-600' : 'text-gray-300 hover:text-sage-400'}`}
          >
            <ICONS.Diary className="w-6 h-6" />
            <span className="text-[10px] font-medium">日记</span>
          </button>

          <button 
            onClick={() => setCurrentView(AppView.CHAT)}
            className={`flex flex-col items-center space-y-1 transition-colors w-1/5 ${currentView === AppView.CHAT ? 'text-sage-600' : 'text-gray-300 hover:text-sage-400'}`}
          >
            <ICONS.Chat className="w-6 h-6" />
            <span className="text-[10px] font-medium">树洞</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default App;