import React, { useState } from 'react';
import { Check, Mail, Lock, User, Sparkles } from 'lucide-react';

export default function SignUp({ setCurrentView, login, showToast }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Account created successfully!', 'success');
      
      // Auto sign-in
      login({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email
      });
      setCurrentView('dashboard');
    }, 1200);
  };

  const benefits = [
    'Free API key with 1,000 audio seconds',
    'Access to TTS synthesis & STT transcribing models',
    'Complete interactive API sandbox documentation',
    '24/7 developer email & chat support'
  ];

  return (
    <div style={styles.page} className="animate-fade-in">
      <div style={styles.container}>
        {/* Left Side: Form */}
        <div style={styles.card} className="glass-card">
          <h2 style={styles.title}>Create Your Account</h2>
          <p style={styles.sub}>Start integrating neural speech tools with AI</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* First / Last Name */}
            <div style={styles.formRow}>
              <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                <label className="form-label">First Name</label>
                <div style={styles.inputWrapper}>
                  <User size={16} color="var(--text-muted)" style={styles.inputIcon} />
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="form-input" 
                    style={styles.input}
                  />
                </div>
              </div>
              <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                <label className="form-label">Last Name</label>
                <div style={styles.inputWrapper}>
                  <User size={16} color="var(--text-muted)" style={styles.inputIcon} />
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="form-input" 
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={16} color="var(--text-muted)" style={styles.inputIcon} />
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                  className="form-input" 
                  style={styles.input}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={16} color="var(--text-muted)" style={styles.inputIcon} />
                <input 
                  type="password" 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className="form-input" 
                  style={styles.input}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={16} color="var(--text-muted)" style={styles.inputIcon} />
                <input 
                  type="password" 
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="form-input" 
                  style={styles.input}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary" 
              style={{ width: '100%', padding: '12px', marginTop: '12px' }}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={styles.footer}>
            Already have an account?{' '}
            <button onClick={() => setCurrentView('signin')} style={styles.linkBtn} className="auth-link-btn">
              Sign In
            </button>
          </div>
        </div>

        {/* Right Side: Benefits Panel */}
        <div style={styles.benefitsCol}>
          <div style={styles.benefitsHeader}>
            <Sparkles size={20} color="var(--primary-light)" />
            <h3 style={styles.benefitsTitle}>What you'll get:</h3>
          </div>
          
          <ul style={styles.benefitsList}>
            {benefits.map((benefit, idx) => (
              <li key={idx} style={styles.benefitItem}>
                <div style={styles.checkCircle}>
                  <Check size={12} color="var(--success)" />
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 24px',
    width: '100%',
    minHeight: 'calc(100vh - var(--navbar-height))',
  },
  container: {
    display: 'flex',
    gap: '48px',
    width: '100%',
    maxWidth: '850px',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: '1.8rem',
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  sub: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    marginBottom: '28px',
  },
  form: {
    textAlign: 'left',
  },
  formRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    pointerEvents: 'none',
  },
  input: {
    paddingLeft: '44px',
  },
  footer: {
    marginTop: '24px',
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
  },
  linkBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--primary-light)',
    cursor: 'pointer',
    fontSize: 'inherit',
    fontWeight: '600',
    transition: 'var(--transition)',
  },
  benefitsCol: {
    flex: '1',
    minWidth: '280px',
    maxWidth: '350px',
    textAlign: 'left',
  },
  benefitsHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '24px',
  },
  benefitsTitle: {
    fontSize: '1.2rem',
    color: 'var(--text-primary)',
    fontWeight: '700',
  },
  benefitsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '0.92rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
  checkCircle: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }
};
