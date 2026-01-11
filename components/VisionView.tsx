
import React, { useState, useRef } from 'react';
import { analyzeImage } from '../services/geminiService';

const VisionView: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mime, setMime] = useState('');
  const [prompt, setPrompt] = useState('Ushbu rasmda nimalar borligini va ranglar uyg\'unligini tahlil qilib ber.');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMime(file.type);
      const r = new FileReader();
      r.onload = ev => setImage(ev.target?.result as string);
      r.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image || loading) return;
    setLoading(true);
    try {
      const res = await analyzeImage(prompt, image, mime);
      setResult(res || '');
    } catch (e) {
      setResult("Xatolik: Rasmni tahlil qila olmadim.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 flex flex-col h-full gap-8 overflow-hidden">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-extrabold flex items-center justify-center md:justify-start gap-3 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          <i className="fas fa-binoculars text-emerald-500"></i> Vizual Tahlil
        </h2>
        <p className="text-slate-400 mt-2">Rasm yuklang, men uni ko'rib chiqib tushuntirib beraman.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-hidden">
        <div className="flex flex-col gap-6 overflow-y-auto pr-2">
          <div 
            onClick={() => fileRef.current?.click()}
            className={`aspect-video glass rounded-[32px] border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
              image ? 'border-transparent' : 'border-emerald-500/20 hover:border-emerald-500/50'
            }`}
          >
            {image ? <img src={image} className="w-full h-full object-contain image-pop" /> : (
              <div className="text-center p-8 space-y-4">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                  <i className="fas fa-cloud-upload-alt text-4xl text-emerald-500"></i>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Rasm yuklash</p>
                  <p className="text-sm text-slate-500">Bosing yoki rasmni shu yerga sudrab keling</p>
                </div>
              </div>
            )}
          </div>
          <input type="file" ref={fileRef} onChange={onFile} hidden accept="image/*" />
          
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Buyruq</label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-500 h-24 resize-none transition-all"
            />
            <button 
              onClick={handleAnalyze} 
              disabled={!image || loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold text-lg transition-all disabled:opacity-30 shadow-lg shadow-emerald-600/20"
            >
              {loading ? <i className="fas fa-circle-notch fa-spin mr-2"></i> : <i className="fas fa-search-plus mr-2"></i>}
              {loading ? 'Tahlil qilinmoqda...' : 'Tahlilni boshlash'}
            </button>
          </div>
        </div>

        <div className="glass p-8 rounded-[32px] overflow-y-auto border border-white/10 bg-slate-900/30">
          <h3 className="font-bold text-emerald-400 mb-6 flex items-center gap-2">
            <i className="fas fa-lightbulb"></i> AI Natijasi:
          </h3>
          {result ? (
            <div className="text-slate-200 leading-relaxed whitespace-pre-wrap animate-in fade-in duration-500">
              {result}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 text-center opacity-50 space-y-4">
              <i className="fas fa-microchip text-5xl"></i>
              <p className="max-w-[200px]">Rasm tahlili bu yerda paydo bo'ladi.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisionView;
