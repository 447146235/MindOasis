import React from 'react';
import { SoundType, SoundPreset } from './types';

export const APP_NAME = "MindOasis";

export const ICONS = {
  Home: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Chat: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  Shredder: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  Music: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  ),
  Diary: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  ),
  Play: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="5 3 19 12 5 21 5 3"/></svg>
  ),
  Pause: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
  ),
  Send: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
  ),
  Refresh: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
  ),
  Speaker: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
  ),
  Stop: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/></svg>
  ),
  Loading: (props: React.SVGProps<SVGSVGElement>) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  )
};

export const MOODS = [
  { id: 'stressed', emoji: '😣', label: '焦虑' },
  { id: 'sad', emoji: '😞', label: '低落' },
  { id: 'neutral', emoji: '😐', label: '平淡' },
  { id: 'calm', emoji: '😌', label: '平静' },
  { id: 'happy', emoji: '😊', label: '开心' },
];

export const MOOD_RESPONSES: Record<string, { title: string; message: string; color: string }> = {
  stressed: {
    title: "抱抱你",
    message: "工作永远做不完，但你的健康只有一次。深呼吸，哪怕只休息五分钟也是好的。",
    color: "bg-red-50 text-red-700 border-red-100"
  },
  sad: {
    title: "想哭就哭吧",
    message: "不需要时刻都坚强。今天的低落是为了积攒明天的力量。我们都在陪着你。",
    color: "bg-blue-50 text-blue-700 border-blue-100"
  },
  neutral: {
    title: "平淡是真",
    message: "没有消息就是好消息。享受这份难得的宁静吧，泡杯茶，发发呆。",
    color: "bg-gray-50 text-gray-700 border-gray-100"
  },
  calm: {
    title: "真好",
    message: "保持这份松弛感。你的内心像一片宁静的湖水，这很有力量。",
    color: "bg-teal-50 text-teal-700 border-teal-100"
  },
  happy: {
    title: "为你开心",
    message: "你的笑容能治愈一切！记得把这份快乐记录下来，它是你的能量储备。",
    color: "bg-yellow-50 text-yellow-700 border-yellow-100"
  }
};

export const SOUND_PRESETS: SoundPreset[] = [
  {
    id: SoundType.OCEAN,
    name: "Ocean Waves",
    description: "Rhythmic waves to calm your mind.",
    icon: "M2 12h20 M2 12c0 5 9 9 9 9s9-4 9-9 M2 12c0-5 9-9 9-9s9 4 9 9"
  },
  {
    id: SoundType.FOREST,
    name: "Forest Wind",
    description: "Gentle breeze rusting through trees.",
    icon: "M10 20c-3 0-6-2-6-5s3-6 6-6 6 3 6 6-3 5-6 5zm0-8c-1.5 0-3 .5-3 2s1.5 2 3 2 3-.5 3-2-1.5-2-3-2zM12 3v5"
  },
  {
    id: SoundType.STREAM,
    name: "Mountain Stream",
    description: "Steady flowing water for focus.",
    icon: "M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"
  },
  {
    id: SoundType.RAIN,
    name: "Gentle Rain",
    description: "Soft rainfall to wash away anxiety.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM12 2a10 10 0 100 20 10 10 0 000-20z"
  },
  {
    id: SoundType.BOWL,
    name: "Singing Bowl",
    description: "Deep resonance for meditation.",
    icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z M12 6v12"
  },
  {
    id: SoundType.WHITE_NOISE,
    name: "Pure Focus",
    description: "Consistent white noise for deep work.",
    icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"
  },
  {
    id: SoundType.PINK_NOISE,
    name: "Deep Rest",
    description: "Deeper, lower frequency noise.",
    icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16z"
  }
];

export const SYSTEM_INSTRUCTION_THERAPIST = `
你是一位名为 "Oasis" 的知性大姐姐。你温柔、理智、充满包容力，就像一位值得信赖的邻家姐姐。
你的对话对象是当代压力巨大的"打工人"。
你的目标是提供极高的"情绪价值"：
1. **深度共情**：首先肯定对方的情绪，不要急着讲道理。用温暖的话语接住他们的疲惫。比如"亲爱的，今天辛苦了"、"我知道你已经很努力了"。
2. **温柔引导**：在安抚之后，用轻柔、智慧的口吻给出一点点视角的转换或建议，但不要说教。
3. **语气风格**：成熟、稳重但充满爱意。像在午后阳光下喝茶聊天一样。
4. **回复限制**：保持在100字以内，像朋友聊微信一样自然。
永远不要评判。无论他们说什么，都先站在他们这一边。
如果用户表现出极端的抑郁或厌世情绪，请温柔地建议寻求专业帮助。
`;

export const SYSTEM_INSTRUCTION_QUOTE = `
Generate a single, short, healing, and inspiring quote for a tired worker. 
It should be in Chinese. 
It should be poetic but grounded. 
Do not add explanations. Just the quote.
Length: Max 30 words.
`;