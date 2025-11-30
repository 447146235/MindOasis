import React, { useState, useEffect } from 'react';
import { audioEngine } from '../services/audioEngine';

const WorryShredder: React.FC = () => {
  const [worry, setWorry] = useState('');
  const [isShredding, setIsShredding] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Vibrate if available
  const triggerVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
  };

  const handleShred = () => {
    if (!worry.trim()) return;
    setIsShredding(true);
    triggerVibration();
    audioEngine.playShredderSound();
    
    // Wait for animation to finish (3 seconds)
    setTimeout(() => {
      setWorry('');
      setIsShredding(false);
      setIsDone(true);
      
      // Reset "Done" state
      setTimeout(() => setIsDone(false), 3000);
    }, 3000); 
  };

  return (
    <div className="flex flex-col h-full relative bg-gray-50/50">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-sage-800 mb-2 mt-2 shrink-0">烦恼粉碎机</h2>
        <p className="text-sage-600 mb-6 text-sm shrink-0">在这里写下你的烦恼，然后点击粉碎。</p>

        {isDone ? (
          <div className="animate-fade-in flex flex-col items-center justify-center flex-1 w-full min-h-[300px]">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 text-4xl animate-[bounce_1s_infinite]">
              ✨
            </div>
            <p className="text-xl text-sage-700 font-medium">都碎啦！</p>
            <p className="text-sage-500 mt-2 max-w-xs text-center">别担心，坏情绪已经清理完毕。<br/>现在，深呼吸一下吧。</p>
            <button 
              onClick={() => setIsDone(false)}
              className="mt-8 px-8 py-3 bg-sage-200 text-sage-800 rounded-full font-bold hover:bg-sage-300 transition-colors"
            >
              我还有烦恼
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md flex flex-col items-center relative">
            
            {/* Shredder Input Area (Paper) */}
            <div className="relative w-full z-10 mb-[-15px]">
              <div 
                className={`bg-white shadow-lg border border-gray-200 rounded-t-lg p-6 min-h-[220px] bg-[linear-gradient(transparent_23px,#e5e7eb_24px)] bg-[length:100%_24px] ${
                  isShredding ? 'animate-shred-paper' : ''
                }`}
              >
                 {/* Binder holes visual */}
                 <div className="absolute top-0 left-0 w-full h-8 flex justify-between px-4 items-center border-b border-gray-100 bg-gray-50 rounded-t-lg">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                 </div>

                <textarea
                  className="w-full h-full min-h-[160px] pt-8 bg-transparent border-none resize-none focus:ring-0 text-gray-700 placeholder-gray-400 text-lg leading-[24px]"
                  placeholder="写下让你心烦的事..."
                  value={worry}
                  onChange={(e) => setWorry(e.target.value)}
                  disabled={isShredding}
                />
              </div>
            </div>

            {/* Shredder Machine Body */}
            <div className={`relative z-20 w-[105%] h-28 bg-gradient-to-b from-gray-800 to-gray-700 rounded-xl shadow-2xl flex flex-col items-center justify-center border-t-8 border-gray-600 shrink-0 ${isShredding ? 'animate-shake' : ''}`}>
               <div className="w-[90%] h-2 bg-black/40 rounded-full mb-2 shadow-inner"></div>
               <div className="flex space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isShredding ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
               </div>
               <span className="text-gray-400 text-[10px] mt-1 tracking-widest uppercase">Mind Shredder 3000</span>
            </div>

            {/* Shreds (Strips) Falling out bottom */}
            <div className="relative w-[90%] h-32 z-10 overflow-hidden mt-[-10px] pointer-events-none">
               {isShredding && (
                  <div className="w-full h-full flex justify-center space-x-1">
                     {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-2 sm:w-3 bg-white h-8 animate-shred-fall opacity-0"
                          style={{ 
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: `${2 + Math.random()}s`,
                            backgroundColor: i % 2 === 0 ? '#f9fafb' : '#ffffff'
                          }}
                        ></div>
                     ))}
                  </div>
               )}
            </div>

          </div>
        )}
      </div>

      {/* Action Button - Pinned to bottom */}
      {!isDone && (
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-gray-50/90 to-transparent z-30">
          <button
            onClick={handleShred}
            disabled={!worry.trim() || isShredding}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-2
              ${!worry.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 shadow-red-200'}
            `}
          >
            <span>{isShredding ? '正在粉碎中...' : '彻底粉碎烦恼'}</span>
            {!isShredding && <span className="text-xl">🗑️</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default WorryShredder;