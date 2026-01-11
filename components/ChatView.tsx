
import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '../services/geminiService';
import { Message } from '../types';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'start', role: 'assistant', content: 'Salom! Men HostGem AI yordamchisiman. Serverlarni boshqarish, tahlil qilish yoki savollaringizga javob berishda yordam beraman.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));
      const res = await chatWithGemini(input, history);
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'assistant', content: res || '', timestamp: new Date() }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: 'err', role: 'assistant', content: 'Xatolik yuz berdi. Internetni tekshiring.', timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column" style={{height: '65vh'}}>
      <div ref={scrollRef} className="flex-grow-1 overflow-y-auto px-2 mb-4 pe-3" style={{scrollbarWidth: 'thin'}}>
        {messages.map(m => (
          <div key={m.id} className={`d-flex mb-4 ${m.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className={`d-flex gap-2 max-w-75 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
               <div className={`flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center border`} style={{width: '32px', height: '32px', fontSize: '12px', backgroundColor: m.role === 'user' ? '#eef2ff' : '#f8f9fa'}}>
                <i className={`fas ${m.role === 'user' ? 'fa-user' : 'fa-robot text-primary'}`}></i>
              </div>
              <div className={`p-3 rounded-4 shadow-sm ${
                m.role === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-light border'
              }`} style={{maxWidth: '100%'}}>
                <p className="mb-0 small leading-relaxed whitespace-pre-wrap">{m.content}</p>
                <div className={`text-end mt-2 ${m.role === 'user' ? 'text-white-50' : 'text-muted'}`} style={{fontSize: '9px'}}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="d-flex justify-content-start mb-4">
             <div className="d-flex gap-2">
                <div className="bg-light p-3 rounded-4 border">
                  <div className="d-flex gap-1">
                    <div className="spinner-grow spinner-grow-sm text-primary" style={{width: '8px', height: '8px'}} role="status"></div>
                    <div className="spinner-grow spinner-grow-sm text-primary" style={{width: '8px', height: '8px', animationDelay: '0.2s'}} role="status"></div>
                    <div className="spinner-grow spinner-grow-sm text-primary" style={{width: '8px', height: '8px', animationDelay: '0.4s'}} role="status"></div>
                  </div>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="mt-auto border-top pt-4">
        <div className="input-group bg-light p-1 rounded-4 border shadow-sm">
          <button className="btn btn-light border-0 rounded-circle me-2" style={{width: '42px', height: '42px'}}><i className="fas fa-paperclip"></i></button>
          <input
            type="text"
            className="form-control border-0 bg-transparent py-3"
            placeholder="AI yordamchi bilan gaplashing..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button 
            className="btn btn-primary px-4 rounded-4" 
            onClick={handleSend}
            disabled={!input.trim() || loading}
          >
            <i className="fas fa-paper-plane me-2"></i> Jo'natish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
