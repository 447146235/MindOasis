import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: (name: string) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-sage-50 text-center animate-fade-in">
      <div className="mb-8 p-6 bg-white rounded-full shadow-xl animate-float">
        <span className="text-6xl">🌿</span>
      </div>
      
      <h1 className="text-3xl font-bold text-sage-800 mb-2">欢迎来到 MindOasis</h1>
      <p className="text-sage-600 mb-10">这是专属于你的心灵休憩地</p>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-6">
        <div className="space-y-2">
            <label className="block text-sm font-medium text-sage-700">想让我们怎么称呼你？</label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入你的昵称..."
            className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-200 outline-none transition-all text-center text-lg"
            maxLength={10}
            required
            />
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95
            ${name.trim() ? 'bg-sage-600 hover:bg-sage-700' : 'bg-sage-300 cursor-not-allowed'}
          `}
        >
          开启疗愈之旅
        </button>
      </form>
    </div>
  );
};

export default Onboarding;