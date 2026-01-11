
import React, { useState } from 'react';
import { generateSpeech, playPCM } from '../services/geminiService';

const SpeechView: React.FC = () => {
  const [text, setText] = useState('Salom! Men Gemini sun\'iy intellekti yordamida gapirmoqdaman. Ushbu dastur o\'zbek tilini ham tushunadi.');
  const [voice, setVoice] = useState('Kore');
  const [loading, setLoading] = useState(false);

  const voices = [
    { name: 'Kore', label: 'Erkak (Jiddiy)' },
    { name: 'Puck', label: 'Ayol (Yumshoq)' },
    { name: 'Charon', label: 'Erkak (Chuqur)' },
    { name: 'Fenrir', label: 'Erkak (Vazmin)' },
    { name: 'Zephyr', label: 'Neytral (Silliq)' }
  ];

  const handleSpeak = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    try {
      const pcm = await generateSpeech(text, voice);
      if (pcm) await playPCM(pcm);
    } catch (e) {
      alert("Xatolik: Nutqni yaratishda muammo bo'ldi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 flex flex-col h-full items-center justify-center max-w-4xl mx-auto space-y-10 overflow-y-auto">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-extrabold flex items-center justify-center gap-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          <i className="fas fa-waveform-lines text-red-500"></i> Ovozli Labaratoriya
        </h2>
        <p className="text-slate-400 text-lg">Matnni yuqori sifatli ovozga aylantiring.</p>
      </div>

      <div className="glass p-10 rounded-[48px] w-full space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full"></div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {voices.map(v => (
            <button
              key={v.name}
              onClick={() => setVoice(v.name)}
              className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all ${
                voice === v.name 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105' 
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-4">Gapirish kerak bo'lgan matn</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full bg-slate-900/50 border border-white/10 rounded-[32px] p-8 outline-none focus:ring-2 focus:ring-red-600 h-52 text-xl font-medium leading-relaxed transition-all shadow-inner"
          />
        </div>

        <button
          onClick={handleSpeak}
          disabled={loading || !text.trim()}
          className="w-full h-24 bg-gradient-to-r from-red-600 to-orange-600 rounded-[32px] text-2xl font-black text-white hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 flex items-center justify-center gap-6 shadow-xl shadow-red-600/20"
        >
          {loading ? (
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-play text-white ml-1"></i>
              </div>
              Tinglash
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SpeechView;
