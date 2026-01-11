
import React, { useState } from 'react';
import { AppMode } from './types';
import ChatView from './components/ChatView';
import ImageView from './components/ImageView';
import VisionView from './components/VisionView';
import SpeechView from './components/SpeechView';

const StatCard = ({ title, value, icon, color, trend }: any) => (
  <div className="col-12 col-md-6 col-xl-3">
    <div className="pc-card stat-box">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className={`icon-box bg-${color}-subtle text-${color}`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <span className={`badge bg-${trend.startsWith('+') ? 'success' : 'danger'}-subtle text-${trend.startsWith('+') ? 'success' : 'danger'} border`}>
          {trend}
        </span>
      </div>
      <div>
        <h6 className="text-muted fw-bold mb-1" style={{fontSize: '12px'}}>{title}</h6>
        <h3 className="mb-0 fw-bold">{value}</h3>
      </div>
    </div>
  </div>
);

const DashboardHome = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold mb-1">Tizim holati</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-muted small">Bosh sahifa</a></li>
              <li className="breadcrumb-item active small" aria-current="page">Dashboard</li>
            </ol>
          </nav>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <i className="fas fa-plus"></i> <span className="d-none d-sm-inline">Yangi Server</span>
        </button>
      </div>

      <div className="row">
        <StatCard title="Jami Serverlar" value="124" icon="fa-server" color="primary" trend="+14%" />
        <StatCard title="Disk Bandligi" value="82.4 GB" icon="fa-database" color="info" trend="+2.5%" />
        <StatCard title="Oylik Trafik" value="4.2 TB" icon="fa-chart-line" color="success" trend="+22%" />
        <StatCard title="Xizmat Ko'rsatish" value="99.9%" icon="fa-clock" color="warning" trend="+0.01%" />
      </div>

      <div className="row">
        <div className="col-12 col-xl-8">
          <div className="pc-card">
            <div className="pc-card-header">
              <h5 className="mb-0 fw-bold">So'nggi harakatlar logi</h5>
              <div className="dropdown">
                <button className="btn btn-light btn-sm border" type="button"><i className="fas fa-filter me-1"></i> Filtrlash</button>
              </div>
            </div>
            <div className="pc-card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="px-4 py-3">Server</th>
                      <th>Hodisa</th>
                      <th>Vaqt</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { srv: 'Cloud-Node-1', event: 'Yangi SSL o\'rnatildi', time: '5 daqiqa oldin', status: 'Bajarildi' },
                      { srv: 'Backup-Store', event: 'Arxivlash yakunlandi', time: '12 daqiqa oldin', status: 'Bajarildi' },
                      { srv: 'Mail-Relay', event: 'DDoS hujumi bloklandi', time: '1 soat oldin', status: 'Himoyalangan' },
                      { srv: 'API-Gateway', event: 'Resurslar tahlili (AI)', time: '2 soat oldin', status: 'Ko\'rib chiqildi' }
                    ].map((log, i) => (
                      <tr key={i}>
                        <td className="px-4">
                          <div className="d-flex align-items-center gap-2">
                            <div className="rounded-circle bg-primary-subtle p-2" style={{width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <i className="fas fa-server text-primary" style={{fontSize: '12px'}}></i>
                            </div>
                            <span className="fw-semibold">{log.srv}</span>
                          </div>
                        </td>
                        <td>{log.event}</td>
                        <td className="text-muted small">{log.time}</td>
                        <td><span className="badge bg-success-subtle text-success border">{log.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="pc-card border-primary" style={{background: 'linear-gradient(to bottom, #ffffff, #f0f4ff)'}}>
            <div className="pc-card-header">
              <h5 className="mb-0 fw-bold text-primary">Resurslar sarfi</h5>
            </div>
            <div className="pc-card-body">
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold small">CPU Yuklanishi</span>
                  <span className="text-primary small fw-bold">45%</span>
                </div>
                <div className="progress" style={{height: '8px', borderRadius: '4px'}}>
                  <div className="progress-bar" style={{width: '45%'}}></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold small">RAM Xotira</span>
                  <span className="text-info small fw-bold">62%</span>
                </div>
                <div className="progress" style={{height: '8px', borderRadius: '4px'}}>
                  <div className="progress-bar bg-info" style={{width: '62%'}}></div>
                </div>
              </div>
              <div className="mb-0">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-bold small">Network Bandwidth</span>
                  <span className="text-warning small fw-bold">12%</span>
                </div>
                <div className="progress" style={{height: '8px', borderRadius: '4px'}}>
                  <div className="progress-bar bg-warning" style={{width: '12%'}}></div>
                </div>
              </div>
              <hr className="my-4 opacity-10" />
              <div className="p-3 bg-white rounded-3 border border-primary-subtle">
                <h6 className="fw-bold mb-2">AI Maslahati:</h6>
                <p className="small text-muted mb-0 italic">"Server-3 yuklanishi oshmoqda. RAM-ni kengaytirishni maslahat beraman."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode | 'dashboard'>('dashboard');
  const [sidebarShow, setSidebarShow] = useState(false);

  const menuSections = [
    {
      title: 'Asosiy',
      items: [
        { mode: 'dashboard', icon: 'fa-gauge-high', label: 'Boshqaruv Paneli' },
        { mode: 'servers', icon: 'fa-server', label: 'Serverlar Ro\'yxati' },
        { mode: 'users', icon: 'fa-users', label: 'Foydalanuvchilar' },
      ]
    },
    {
      title: 'AI Studio (Gemini)',
      items: [
        { mode: AppMode.CHAT, icon: 'fa-message', label: 'AI Yordamchi' },
        { mode: AppMode.IMAGE, icon: 'fa-wand-magic-sparkles', label: 'Rasm Generatori' },
        { mode: AppMode.VISION, icon: 'fa-camera-viewfinder', label: 'Vizual Tahlil' },
        { mode: AppMode.SPEECH, icon: 'fa-microphone-lines', label: 'Nutq Studio' },
      ]
    },
    {
      title: 'Sozlamalar',
      items: [
        { mode: 'profile', icon: 'fa-circle-user', label: 'Mening Profilim' },
        { mode: 'billing', icon: 'fa-credit-card', label: 'To\'lovlar' },
        { mode: 'security', icon: 'fa-shield-halved', label: 'Xavfsizlik' },
      ]
    }
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarShow ? 'show' : ''}`}>
        <div className="sidebar-brand">
          <div className="bg-primary p-2 rounded-3 text-white">
            <i className="fas fa-gem fa-lg"></i>
          </div>
          <h4 className="mb-0 fw-bold tracking-tight">HostGem <span className="text-primary">Pro</span></h4>
        </div>
        
        {menuSections.map((section, idx) => (
          <div key={idx}>
            <p className="sidebar-section-title">{section.title}</p>
            <nav className="nav flex-column">
              {section.items.map((item) => (
                <button
                  key={item.mode}
                  onClick={() => {
                    setCurrentMode(item.mode as any);
                    setSidebarShow(false);
                  }}
                  className={`nav-link border-0 text-start bg-transparent ${currentMode === item.mode ? 'active' : ''}`}
                >
                  <i className={`fas ${item.icon}`}></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        ))}
        
        <div className="mt-5 p-4 mx-3 rounded-4 bg-light border text-center">
          <p className="small fw-bold mb-2">Pro Versiyaga O'ting</p>
          <button className="btn btn-primary btn-sm w-100">Yangilash</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper flex-grow-1">
        <header className="header">
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light d-lg-none border" onClick={() => setSidebarShow(!sidebarShow)}>
              <i className="fas fa-bars"></i>
            </button>
            <div className="d-none d-md-flex position-relative align-items-center">
              <i className="fas fa-search position-absolute text-muted ms-3"></i>
              <input type="text" className="form-control border-0 bg-light rounded-pill ps-5" style={{width: '300px'}} placeholder="Qidiruv..." />
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="dropdown">
              <button className="btn btn-light rounded-circle border p-2 position-relative" type="button" data-bs-toggle="dropdown">
                <i className="fas fa-bell text-muted"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '9px'}}>4</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-3 rounded-4 p-2" style={{width: '280px'}}>
                <li><h6 className="dropdown-header fw-bold">Bildirishnomalar</h6></li>
                <li><a className="dropdown-item rounded-3 mb-1" href="#"><small><b>Server-1:</b> Yuklanish me'yordan oshdi</small></a></li>
                <li><a className="dropdown-item rounded-3 mb-1" href="#"><small><b>Billing:</b> To'lov muvaffaqiyatli o'tdi</small></a></li>
              </ul>
            </div>
            
            <div className="vr d-none d-sm-block"></div>
            
            <div className="d-flex align-items-center gap-2 cursor-pointer dropdown">
              <img src="https://ui-avatars.com/api/?name=Admin+User&background=3f51b5&color=fff" className="rounded-circle border" width="38" height="38" alt="Admin" />
              <div className="d-none d-lg-block">
                <p className="mb-0 fw-bold small">Otabek Admin</p>
                <p className="mb-0 text-muted" style={{fontSize: '10px'}}>Asosiy Boshqaruvchi</p>
              </div>
            </div>
          </div>
        </header>

        <main className="page-content">
          {currentMode === 'dashboard' && <DashboardHome />}
          {currentMode === AppMode.CHAT && (
            <div className="pc-card h-100 animate-in slide-in-from-bottom duration-300 shadow-lg">
              <div className="pc-card-header bg-primary-subtle">
                <h5 className="mb-0 fw-bold text-primary"><i className="fas fa-robot me-2"></i> AI Suhbat Studio</h5>
              </div>
              <div className="pc-card-body">
                <ChatView />
              </div>
            </div>
          )}
          {currentMode === AppMode.IMAGE && (
            <div className="pc-card animate-in slide-in-from-bottom duration-300">
               <div className="pc-card-header">
                <h5 className="mb-0 fw-bold"><i className="fas fa-wand-magic-sparkles me-2 text-primary"></i> Rasm Generatori</h5>
              </div>
              <ImageView />
            </div>
          )}
          {currentMode === AppMode.VISION && (
             <div className="pc-card animate-in slide-in-from-bottom duration-300">
              <div className="pc-card-header">
                <h5 className="mb-0 fw-bold"><i className="fas fa-eye me-2 text-primary"></i> Vizual Tahlil Markazi</h5>
              </div>
              <VisionView />
             </div>
          )}
          {currentMode === AppMode.SPEECH && (
            <div className="pc-card animate-in slide-in-from-bottom duration-300">
              <div className="pc-card-header">
                <h5 className="mb-0 fw-bold"><i className="fas fa-microphone-lines me-2 text-primary"></i> Ovozli Labaratoriya</h5>
              </div>
              <SpeechView />
            </div>
          )}
          {['servers', 'users', 'profile', 'billing', 'security'].includes(currentMode as string) && (
            <div className="text-center py-5">
              <i className="fas fa-tools fa-3x text-muted mb-3"></i>
              <h3>Bu bo'lim ishlab chiqilmoqda</h3>
              <p className="text-muted">Keyingi yangilanishlarda ushbu funksiya to'liq ishlaydi.</p>
              <button onClick={() => setCurrentMode('dashboard')} className="btn btn-primary">Dashboardga qaytish</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
