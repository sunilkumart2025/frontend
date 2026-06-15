import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  const navigate = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Logo & Description */}
          <div style={styles.brandCol}>
            <div onClick={() => navigate('home')} style={styles.logo} className="navbar-brand">
              <div style={styles.logoIcon}>
                <Sparkles size={16} color="#ffffff" fill="#ffffff" />
              </div>
              <span>FinanceAI</span>
            </div>
            <p style={styles.desc}>
              AI-powered financial document processing for modern accountants and enterprise teams. Secure, fast, and compliant.
            </p>
          </div>

          {/* Links Column 1: Product */}
          <div style={styles.linksCol}>
            <h4 style={styles.title}>Product</h4>
            <ul style={styles.list}>
              <li><button onClick={() => navigate('home')} style={styles.link}>Features</button></li>
              <li><button onClick={() => navigate('documentation')} style={styles.link}>API Docs</button></li>
              <li><button onClick={() => navigate('documentation')} style={styles.link}>SDK Libraries</button></li>
              <li><button onClick={() => navigate('home')} style={styles.link}>Pricing</button></li>
            </ul>
          </div>

          {/* Links Column 2: Support */}
          <div style={styles.linksCol}>
            <h4 style={styles.title}>Support</h4>
            <ul style={styles.list}>
              <li><button onClick={() => navigate('help-center')} style={styles.link}>Help Center</button></li>
              <li><button onClick={() => navigate('contact')} style={styles.link}>Contact Sales</button></li>
              <li><button onClick={() => navigate('system-status')} style={styles.link}>System Status</button></li>
              <li><button onClick={() => navigate('about-us')} style={styles.link}>About Us</button></li>
            </ul>
          </div>

          {/* Links Column 3: Legal */}
          <div style={styles.linksCol}>
            <h4 style={styles.title}>Legal</h4>
            <ul style={styles.list}>
              <li><button style={styles.link}>Privacy Policy</button></li>
              <li><button style={styles.link}>Terms of Service</button></li>
              <li><button style={styles.link}>Security (SOC 2)</button></li>
              <li><button style={styles.link}>GDPR Compliance</button></li>
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
          <div style={styles.copyright}>
            © {new Date().getFullYear()} FinanceAI. All rights reserved. Built with precision.
          </div>
          <div style={styles.bottomLinks}>
            <span style={styles.statusDot}></span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: '1px solid var(--border-color)',
    background: 'rgba(7, 6, 14, 0.5)',
    padding: '64px 0 32px 0',
    marginTop: 'auto',
    width: '100%',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '0 24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '48px',
  },
  brandCol: {
    gridColumn: 'span 2',
    '@media (max-width: 768px)': {
      gridColumn: 'span 1',
    },
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    background: 'linear-gradient(135deg, var(--primary) 0%, #a78bfa 100%)',
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontSize: '0.9rem',
    maxWidth: '320px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    letterSpacing: '0.02em',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: 0,
    margin: 0,
  },
  link: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontSize: '0.88rem',
    padding: 0,
    textAlign: 'left',
    transition: 'var(--transition)',
    ':hover': {
      color: 'var(--text-primary)',
    }
  },
  bottom: {
    borderTop: '1px solid var(--border-color)',
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  copyright: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  bottomLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--success)',
    boxShadow: '0 0 8px var(--success)',
  }
};
