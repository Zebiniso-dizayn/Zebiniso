
import React from 'react';
import { AppMode } from '../types';

interface SidebarProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, onModeChange }) => {
  const menuItems = [
    { mode: AppMode.CHAT, icon: 'fa-comment-dots', label: 'Suhbat' },
    { mode: AppMode.IMAGE, icon: 'fa-paint-brush', label: 'San\'at' },
    { mode: AppMode.VISION, icon: 'fa-binoculars', label: 'Tahlil' },
    { mode: AppMode.SPEECH, icon: 'fa-volume-up', label: 'Nutq' },
  ];

  return (
    <aside className="w-20 md:w-64 glass flex flex-col items-center md:items-stretch py-8 px-4 gap-8 z-30 h-full border-r border-white/5">
      <div className="flex items-center gap-3 px-2 mb-4">
        <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <i className="fas fa-brain text-white text-2xl"></i>
        </div>
        <div className="hidden md:block">
          <h1 className="font-bold text-lg leading-tight">Gemini AI</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Studio v2.0</p>
        </div>
      </div>

      <nav className="flex flex-col gap-3 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.mode}
            onClick={() => onModeChange(item.mode)}
            className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
              currentMode === item.mode
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
            }`}
          >
            <i className={`fas ${item.icon} text-xl ${currentMode === item.mode ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}></i>
            <span className="hidden md:block font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="hidden md:block p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 text-xs">
          <p className="text-blue-400 font-bold mb-1 italic">O'zbekcha AI</p>
          <p className="text-slate-500 leading-relaxed">Gemini-3-Pro modeli orqali ishlaydi.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
