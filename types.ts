export enum AppView {
  HOME = 'HOME',
  CHAT = 'CHAT',
  SHREDDER = 'SHREDDER',
  MUSIC = 'MUSIC',
  DIARY = 'DIARY'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum SoundType {
  RAIN = 'RAIN',
  WHITE_NOISE = 'WHITE_NOISE',
  PINK_NOISE = 'PINK_NOISE',
  OCEAN = 'OCEAN',
  FOREST = 'FOREST',
  STREAM = 'STREAM',
  BOWL = 'BOWL'
}

export interface SoundPreset {
  id: SoundType;
  name: string;
  description: string;
  icon: string; // SVG path data
}

export interface MoodLog {
  date: string; // YYYY-MM-DD
  moodId: string;
}