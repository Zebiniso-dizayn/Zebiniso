
import React, { useState } from 'react';
import { generateImageWithGemini } from '../services/geminiService';
import { GeneratedImage } from '../types';

const ImageView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    try {
      const url = await generateImageWithGemini(prompt);
      setImages(prev => [{ id: Date.now().toString(), url, prompt, timestamp: new Date() }, ...prev]);
      setPrompt('');
    } catch (e) {
      alert("Xatolik: Rasmni chizishda muammo bo'ldi. Matnni inglizcha yozib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-6 md:p-10 overflow-hidden">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-extrabold flex items-center justify-center md:justify-start gap-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          <i className="fas fa-magic text-purple-500"></i> AI San'at Studio
        </h2>
        <p className="text-slate-400 mt-2">Xayolingizdagi narsani yozing, men uni chizib beraman.</p>
      </div>

      <div className="glass p-6 rounded-[32px] mb-10 flex flex-col md:flex-row gap-4 items-end shadow-2xl">
        <div className="flex-1 w-full space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Rasm tavsifi (Ingliz tilida yaxshi ishlaydi)</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Masalan: 'A futuristic city in space with neon lights, digital art style'..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-purple-600 h-24 transition-all"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full md:w-auto px-8 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-30 flex items-center justify-center gap-3 shadow-lg shadow-purple-600/20"
        >
          {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-wand-sparkles"></i>}
          {loading ? 'Chizilmoqda...' : 'Chizish'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pr-2 pb-10">
        {images.map(img => (
          <div key={img.id} className="group relative rounded-[32px] overflow-hidden glass shadow-2xl image-pop">
            <img src={img.url} className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" alt={img.prompt} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 flex flex-col justify-end">
              <p className="text-sm font-medium line-clamp-3 text-slate-200 italic mb-4">"{img.prompt}"</p>
              <a 
                href={img.url} 
                download={`gemini-art-${img.id}.png`} 
                className="w-full bg-white text-black py-3 rounded-xl font-bold text-center hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-download"></i>
                Yuklab olish
              </a>
            </div>
          </div>
        ))}
        {loading && (
          <div className="aspect-square glass rounded-[32px] flex flex-col items-center justify-center gap-4 animate-pulse border-2 border-dashed border-white/10">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
              <i className="fas fa-palette text-3xl text-purple-400"></i>
            </div>
            <p className="text-slate-400 font-medium italic">Mo'jiza sodir bo'lmoqda...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageView;
