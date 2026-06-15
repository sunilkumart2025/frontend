import React, { useState } from 'react';
import { 
  FileText, 
  ChevronDown, 
  LayoutDashboard, 
  History as HistoryIcon, 
  HelpCircle, 
  Activity, 
  Info, 
  Mail, 
  LogOut, 
  User,
  Menu,
  X,
  Sparkles,
  Volume2
} from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, user, logout, showToast }) {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (view) => {
    setCurrentView(view);
    setResourcesOpen(false);
    setServicesOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogoutClick = () => {
    logout();
    showToast('Logged out successfully', 'success');
    navigate('home');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        {/* Brand Logo */}
        <div onClick={() => navigate('home')} className="navbar-brand">
          <div style={styles.logoIcon}>
            <Sparkles size={18} color="#ffffff" fill="#ffffff" />
          </div>
          <span>FinanceAI</span>
        </div>

        {/* Desktop Menu */}
        <div style={styles.navLinks}>
          {user ? (
            /* Logged In Navbar */
            <>
              <button 
                onClick={() => navigate('dashboard')} 
                style={{...styles.navLink, ...(currentView === 'dashboard' ? styles.navLinkActive : {})}}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </button>
              
              <button 
                onClick={() => navigate('documentation')} 
                style={{...styles.navLink, ...(currentView === 'documentation' || currentView === 'api-reference' ? styles.navLinkActive : {})}}
              >
                <FileText size={16} />
                Documentation
              </button>

              <button 
                onClick={() => navigate('history')} 
                style={{...styles.navLink, ...(currentView === 'history' ? styles.navLinkActive : {})}}
              >
                <HistoryIcon size={16} />
                History
              </button>

              {/* Services Dropdown */}
              <div 
                style={styles.dropdownContainer}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button style={{...styles.navLink, ...((currentView === 'voice-tools') ? styles.navLinkActive : {})}}>
                  <Sparkles size={16} />
                  Services
                  <ChevronDown size={14} style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                </button>
                {servicesOpen && (
                  <div style={styles.dropdownMenu} className="animate-fade-in">
                    <div onClick={() => navigate('voice-tools')} style={styles.dropdownItem}>
                      <Volume2 size={16} color="#8b5cf6" />
                      <div>
                        <div style={styles.dropdownItemTitle}>Voice Tools</div>
                        <div style={styles.dropdownItemDesc}>TTS & STT conversion</div>
                      </div>
                    </div>
                    <div onClick={() => { navigate('dashboard'); showToast('Document scanner available on dashboard!', 'info'); }} style={styles.dropdownItem}>
                      <FileText size={16} color="#ec4899" />
                      <div>
                        <div style={styles.dropdownItemTitle}>Document Scanner</div>
                        <div style={styles.dropdownItemDesc}>Process bank statements</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Logged Out Navbar */
            <>
              <button 
                onClick={() => navigate('home')} 
                style={{...styles.navLink, ...(currentView === 'home' ? styles.navLinkActive : {})}}
              >
                Home
              </button>
              
              <button 
                onClick={() => navigate('documentation')} 
                style={{...styles.navLink, ...(currentView === 'documentation' || currentView === 'api-reference' ? styles.navLinkActive : {})}}
              >
                Documentation
              </button>
            </>
          )}

          {/* Resources Dropdown (Shared) */}
          <div 
            style={styles.dropdownContainer}
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button style={{
              ...styles.navLink, 
              ...((['help-center', 'system-status', 'about-us', 'contact'].includes(currentView)) ? styles.navLinkActive : {})
            }}>
              Resources
              <ChevronDown size={14} style={{ transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
            </button>
            {resourcesOpen && (
              <div style={styles.dropdownMenu} className="animate-fade-in">
                <div onClick={() => navigate('help-center')} style={styles.dropdownItem}>
                  <HelpCircle size={16} color="#3b82f6" />
                  <div>
                    <div style={styles.dropdownItemTitle}>Help Center</div>
                    <div style={styles.dropdownItemDesc}>Guides & FAQ support</div>
                  </div>
                </div>
                <div onClick={() => navigate('system-status')} style={styles.dropdownItem}>
                  <Activity size={16} color="#10b981" />
                  <div>
                    <div style={styles.dropdownItemTitle}>System Status</div>
                    <div style={styles.dropdownItemDesc}>Real-time uptime metrics</div>
                  </div>
                </div>
                <div onClick={() => navigate('about-us')} style={styles.dropdownItem}>
                  <Info size={16} color="#f59e0b" />
                  <div>
                    <div style={styles.dropdownItemTitle}>About Us</div>
                    <div style={styles.dropdownItemDesc}>Our story & values</div>
                  </div>
                </div>
                <div onClick={() => navigate('contact')} style={styles.dropdownItem}>
                  <Mail size={16} color="#ec4899" />
                  <div>
                    <div style={styles.dropdownItemTitle}>Contact</div>
                    <div style={styles.dropdownItemDesc}>Get in touch with us</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Auth Buttons / Profile info */}
        <div style={styles.authSection}>
          {user ? (
            <div style={styles.userProfile}>
              <div style={styles.userAvatar}>
                <User size={16} />
              </div>
              <div style={styles.userDetails}>
                <div style={styles.userName}>{user.name || 'Varish Tomar'}</div>
                <div style={styles.userEmail}>{user.email || 'varish.tomar1303@gmail.com'}</div>
              </div>
              <button onClick={handleLogoutClick} style={styles.logoutBtn} title="Sign Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => navigate('signin')} style={styles.signInBtn}>
                Sign In
              </button>
              <button onClick={() => navigate('signup')} className="btn btn-primary" style={styles.getStartedBtn}>
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button style={styles.mobileMenuToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={styles.mobileMenu} className="animate-fade-in">
          {user ? (
            <>
              <div style={styles.mobileProfile}>
                <div style={styles.userAvatar}>
                  <User size={18} />
                </div>
                <div style={styles.userDetails}>
                  <div style={styles.userName}>{user.name}</div>
                  <div style={styles.userEmail}>{user.email}</div>
                </div>
              </div>
              <hr style={styles.mobileDivider} />
              <button onClick={() => navigate('dashboard')} style={styles.mobileNavLink}>Dashboard</button>
              <button onClick={() => navigate('documentation')} style={styles.mobileNavLink}>Documentation</button>
              <button onClick={() => navigate('history')} style={styles.mobileNavLink}>History</button>
              <button onClick={() => navigate('voice-tools')} style={styles.mobileNavLink}>Voice Tools</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('home')} style={styles.mobileNavLink}>Home</button>
              <button onClick={() => navigate('documentation')} style={styles.mobileNavLink}>Documentation</button>
            </>
          )}
          <hr style={styles.mobileDivider} />
          <button onClick={() => navigate('help-center')} style={styles.mobileNavLink}>Help Center</button>
          <button onClick={() => navigate('system-status')} style={styles.mobileNavLink}>System Status</button>
          <button onClick={() => navigate('about-us')} style={styles.mobileNavLink}>About Us</button>
          <button onClick={() => navigate('contact')} style={styles.mobileNavLink}>Contact</button>
          
          <hr style={styles.mobileDivider} />
          {user ? (
            <button onClick={handleLogoutClick} style={{...styles.mobileNavLink, color: '#ef4444'}}>Sign Out</button>
          ) : (
            <div style={styles.mobileAuthBtns}>
              <button onClick={() => navigate('signin')} style={styles.mobileSignInBtn}>Sign In</button>
              <button onClick={() => navigate('signup')} className="btn btn-primary" style={{width: '100%'}}>Get Started</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    height: 'var(--navbar-height)',
    borderBottom: '1px solid var(--border-color)',
    background: 'rgba(11, 10, 22, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    width: '100%',
  },
  navContainer: {
    maxWidth: 'var(--max-width)',
    height: '100%',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  logoIcon: {
    background: 'linear-gradient(135deg, var(--primary) 0%, #a78bfa 100%)',
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
  },
  navLinks: {
    display: 'none',
    '@media (min-width: 769px)': {
      display: 'flex',
    },
    alignItems: 'center',
    gap: '4px',
  },
  navLink: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    padding: '8px 16px',
    fontSize: '0.95rem',
    fontWeight: '500',
    cursor: 'pointer',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'var(--transition)',
  },
  navLinkActive: {
    color: 'var(--text-primary)',
    background: 'rgba(255, 255, 255, 0.05)',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: '8px',
    width: '240px',
    background: 'rgba(15, 14, 28, 0.95)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '8px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    backdropFilter: 'blur(20px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'var(--transition)',
    textAlign: 'left',
  },
  dropdownItemTitle: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  dropdownItemDesc: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  authSection: {
    display: 'none',
    '@media (min-width: 769px)': {
      display: 'flex',
    },
    alignItems: 'center',
    gap: '12px',
  },
  signInBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    fontWeight: '600',
    fontSize: '0.95rem',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'var(--transition)',
  },
  getStartedBtn: {
    padding: '8px 18px',
    fontSize: '0.9rem',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border-color)',
    padding: '6px 12px',
    borderRadius: '40px',
  },
  userAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  },
  userDetails: {
    textAlign: 'left',
  },
  userName: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    lineHeight: '1.2',
  },
  userEmail: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    lineHeight: '1.2',
  },
  logoutBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition)',
    ':hover': {
      color: '#ef4444',
      background: 'rgba(239, 68, 68, 0.1)',
    }
  },
  mobileMenuToggle: {
    display: 'block',
    '@media (min-width: 769px)': {
      display: 'none',
    },
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    padding: '4px',
  },
  mobileMenu: {
    position: 'absolute',
    top: 'var(--navbar-height)',
    left: 0,
    width: '100%',
    background: 'rgba(11, 10, 22, 0.98)',
    borderBottom: '1px solid var(--border-color)',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
    zIndex: 99,
  },
  mobileProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 0',
  },
  mobileDivider: {
    border: 'none',
    borderTop: '1px solid var(--border-color)',
    margin: '4px 0',
  },
  mobileNavLink: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    textAlign: 'left',
    padding: '8px 0',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
  },
  mobileAuthBtns: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px',
  },
  mobileSignInBtn: {
    background: 'transparent',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    padding: '10px',
    borderRadius: 'var(--border-radius)',
    fontWeight: '600',
    cursor: 'pointer',
  }
};
