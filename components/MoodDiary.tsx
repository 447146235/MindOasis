import React from 'react';
import { MOODS } from '../constants';

interface MoodDiaryProps {
  moodLogs: Record<string, string>; // date string -> mood id
}

const MoodDiary: React.FC<MoodDiaryProps> = ({ moodLogs }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getMoodEmoji = (date: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    const moodId = moodLogs[dateStr];
    if (!moodId) return null;
    return MOODS.find(m => m.id === moodId)?.emoji;
  };

  const getMoodLabel = (moodId: string) => MOODS.find(m => m.id === moodId)?.label;

  // Simple stats
  const moodCounts = Object.values(moodLogs).reduce((acc, moodId) => {
    acc[moodId] = (acc[moodId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dominantMoodId = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const dominantMood = dominantMoodId ? MOODS.find(m => m.id === dominantMoodId) : null;

  return (
    <div className="flex flex-col h-full bg-white/50 overflow-y-auto pb-24">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-sage-800">情绪日记</h2>
        <p className="text-sage-600 mb-6 text-sm">记录当下的每一份感受。</p>

        {/* Stats Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-sage-100 mb-6 flex items-center justify-between">
           <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">本月关键词</p>
              <p className="text-lg font-bold text-sage-800">
                {dominantMood ? `主要是 ${dominantMood.label} ${dominantMood.emoji}` : '开始记录吧'}
              </p>
           </div>
           <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">记录天数</p>
              <p className="text-2xl font-bold text-sage-600">{Object.keys(moodLogs).length}</p>
           </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-4">
          <div className="text-center font-bold text-sage-800 mb-4 text-lg">
            {today.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['日', '一', '二', '三', '四', '五', '六'].map(d => (
              <div key={d} className="text-center text-xs text-gray-400 py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {blanks.map(i => <div key={`blank-${i}`} className="aspect-square"></div>)}
            {days.map(d => {
              const emoji = getMoodEmoji(d);
              const isToday = d === today.getDate();
              return (
                <div 
                  key={d} 
                  className={`aspect-square rounded-xl flex items-center justify-center relative transition-all
                    ${isToday ? 'bg-sage-100 border-2 border-sage-300' : 'bg-gray-50 border border-transparent'}
                  `}
                >
                  <span className={`absolute top-1 left-1.5 text-[10px] font-bold ${isToday ? 'text-sage-600' : 'text-gray-300'}`}>
                    {d}
                  </span>
                  
                  {emoji ? (
                    <span className="text-xl mt-1">{emoji}</span>
                  ) : null}
                  
                  {isToday && !emoji && (
                      <div className="w-1.5 h-1.5 bg-sage-400 rounded-full mt-3"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodDiary;