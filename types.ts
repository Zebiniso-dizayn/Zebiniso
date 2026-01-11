
export enum AppMode {
  CHAT = 'chat',
  IMAGE = 'image',
  VISION = 'vision',
  SPEECH = 'speech'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
}
