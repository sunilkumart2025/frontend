import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Mic, 
  Globe, 
  Sparkles, 
  Trash2, 
  ArrowLeft, 
  Play,
  VolumeX,
  Languages
} from 'lucide-react';

export default function VoiceTools({ showToast }) {
  const [subView, setSubView] = useState('hub'); // 'hub' | 'tts' | 'stt'
  const [selectedLang, setSelectedLang] = useState('EN');
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSynth(window.speechSynthesis);
    }
  }, []);

  const handleClear = () => {
    setText('');
    if (isPlaying && synth) {
      synth.cancel();
      setIsPlaying(false);
    }
  };

  const handleSpeak = () => {
    if (!text) {
      showToast('Please enter some text to synthesize.', 'error');
      return;
    }

    if (!synth) {
      showToast('Speech synthesis not supported in this browser.', 'error');
      return;
    }

    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map languages to browser locales
    const langMap = {
      EN: 'en-US',
      HI: 'hi-IN',
      TA: 'ta-IN',
      TE: 'te-IN',
      BN: 'bn-IN',
      MR: 'mr-IN',
      GU: 'gu-IN',
      KN: 'kn-IN',
      ES: 'es-ES',
      FR: 'fr-FR',
      DE: 'de-DE',
      JA: 'ja-JP'
    };

    utterance.lang = langMap[selectedLang] || 'en-US';

    // Find custom voices matching locale if available
    const voices = synth.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(utterance.lang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    setIsPlaying(true);
    synth.speak(utterance);
    showToast(`Synthesizing text in ${selectedLang}...`, 'success');
  };

  // Stop synthesis on unmount
  useEffect(() => {
    return () => {
      if (synth) synth.cancel();
    };
  }, [synth]);

  const languages = [
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'HI', name: 'Hindi', flag: '🇮🇳' },
    { code: 'TA', name: 'Tamil', flag: '🇮🇳' },
    { code: 'TE', name: 'Telugu', flag: '🇮🇳' },
    { code: 'BN', name: 'Bengali', flag: '🇮🇳' },
    { code: 'MR', name: 'Marathi', flag: '🇮🇳' },
    { code: 'GU', name: 'Gujarati', flag: '🇮🇳' },
    { code: 'KN', name: 'Kannada', flag: '🇮🇳' },
    { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'FR', name: 'French', flag: '🇫🇷' },
    { code: 'DE', name: 'German', flag: '🇩🇪' },
    { code: 'JA', name: 'Japanese', flag: '🇯🇵' }
  ];

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div style={styles.page} className="animate-fade-in">
      {subView === 'hub' ? (
        /* VOICE TOOLS HUB */
        <div style={styles.container}>
          <div style={styles.hubHeader}>
            <span className="badge badge-purple">Voice Services</span>
            <h1 style={styles.hubTitle}>Voice Tools</h1>
            <p style={styles.hubSub}>Convert between voice and text with advanced AI engine parameters.</p>
          </div>

          <div style={styles.hubGrid}>
            {/* Card 1: STT */}
            <div onClick={() => setSubView('stt')} className="glass-card glass-card-hover" style={styles.hubCard}>
              <div style={styles.iconBoxPurple}>
                <Mic size={24} color="var(--primary)" />
              </div>
              <h3 style={styles.cardTitle}>Speech to Text</h3>
              <p style={styles.cardDesc}>
                Convert audio recordings or live speech streams into text transcripts with high accuracy and speaker layouts.
              </p>
              <button className="btn btn-outline" style={{ marginTop: 'auto', alignSelf: 'flex-start', padding: '6px 14px', fontSize: '0.85rem' }}>
                Open STT
              </button>
            </div>

            {/* Card 2: TTS */}
            <div onClick={() => setSubView('tts')} className="glass-card glass-card-hover" style={styles.hubCard}>
              <div style={styles.iconBoxPink}>
                <Volume2 size={24} color="var(--secondary)" />
              </div>
              <h3 style={styles.cardTitle}>Text to Speech</h3>
              <p style={styles.cardDesc}>
                Convert written text into natural-sounding audio speech in multiple languages and customized voice profiles.
              </p>
              <button className="btn btn-outline" style={{ marginTop: 'auto', alignSelf: 'flex-start', padding: '6px 14px', fontSize: '0.85rem' }}>
                Open TTS
              </button>
            </div>
          </div>

          {/* Why Voice section */}
          <div style={styles.whySection}>
            <h3 style={styles.secTitle}>Why Choose Voice Tools?</h3>
            <div style={styles.whyGrid}>
              <div>
                <h4 style={styles.whyItemTitle}>State-of-the-art Accuracy</h4>
                <p style={styles.whyItemText}>Neural models trained on multiple dialects ensure natural articulation and parsing.</p>
              </div>
              <div>
                <h4 style={styles.whyItemTitle}>Low Latency</h4>
                <p style={styles.whyItemText}>Processes audio streaming inputs in real time with quick API response speeds.</p>
              </div>
              <div>
                <h4 style={styles.whyItemTitle}>Multi-Language</h4>
                <p style={styles.whyItemText}>Full translation and synthesizer support for over 50 global languages and flag codes.</p>
              </div>
            </div>
          </div>
        </div>
      ) : subView === 'tts' ? (
        /* TEXT TO SPEECH INTERFACE */
        <div style={styles.container}>
          <div style={styles.subHeader}>
            <button onClick={() => setSubView('hub')} style={styles.backBtn}>
              <ArrowLeft size={16} /> Back to Voice Tools
            </button>
            <h1 style={{...styles.hubTitle, marginTop: '20px'}}>Text to Speech</h1>
            <p style={styles.hubSub}>Convert written documents into natural-sounding audio readouts.</p>
          </div>

          <div className="glass-card" style={styles.ttsCard}>
            {/* Lang Grid */}
            <h4 style={styles.cardSubHeader}>Select Language</h4>
            <div style={styles.langGrid}>
              {languages.map((lang) => (
                <button 
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  style={{
                    ...styles.langBtn,
                    borderColor: selectedLang === lang.code ? 'var(--primary)' : 'var(--border-color)',
                    background: selectedLang === lang.code ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                    color: selectedLang === lang.code ? 'var(--text-primary)' : 'var(--text-secondary)'
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
                  <span style={{ fontWeight: '600' }}>{lang.code}</span>
                  <span style={styles.langName}>{lang.name}</span>
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="form-group" style={{ marginTop: '28px' }}>
              <label className="form-label">Your Text</label>
              <textarea 
                rows={6}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to convert to speech..."
                className="form-input"
                style={{ resize: 'vertical', background: 'var(--bg-main)' }}
              />
              <div style={styles.textareaFooter}>
                <div style={styles.counters}>
                  <span>{wordCount} words</span>
                  <span style={styles.counterDivider}>|</span>
                  <span>{charCount} characters</span>
                </div>
                <button onClick={handleClear} style={styles.clearBtn}>
                  <Trash2 size={14} /> Clear
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div style={styles.actionRow}>
              <button onClick={handleSpeak} className="btn btn-primary" style={styles.convertBtn}>
                {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {isPlaying ? 'Stop Speech' : 'Convert to Speech'}
              </button>
              
              {/* Playback Soundwave animation */}
              {isPlaying && (
                <div style={styles.soundwave}>
                  <div style={{...styles.waveBar, animationDelay: '0s'}}></div>
                  <div style={{...styles.waveBar, animationDelay: '0.15s', height: '18px'}}></div>
                  <div style={{...styles.waveBar, animationDelay: '0.3s', height: '24px'}}></div>
                  <div style={{...styles.waveBar, animationDelay: '0.45s', height: '14px'}}></div>
                  <div style={{...styles.waveBar, animationDelay: '0.6s'}}></div>
                </div>
              )}
            </div>

            {/* Tips Banner */}
            <div style={styles.tipCallout}>
              <span style={{ fontSize: '1.1rem' }}>💡</span>
              <p style={styles.tipText}>
                <strong>Tip:</strong> For best results, use punctuation and complete sentences. Longer text segments may take a moment to load and play.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* SPEECH TO TEXT MOCKUP */
        <div style={styles.container}>
          <div style={styles.subHeader}>
            <button onClick={() => setSubView('hub')} style={styles.backBtn}>
              <ArrowLeft size={16} /> Back to Voice Tools
            </button>
            <h1 style={{...styles.hubTitle, marginTop: '20px'}}>Speech to Text</h1>
            <p style={styles.hubSub}>Transcribe speech audios into high-fidelity structured text transcripts.</p>
          </div>

          <div className="glass-card" style={{ padding: '64px', textAlign: 'center' }}>
            <Mic size={40} color="var(--primary-light)" style={{ marginBottom: '20px' }} />
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Speech to Text Sandbox</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 24px auto', fontSize: '0.92rem', lineHeight: '1.6' }}>
              STT model configuration is currently available in production integrations. Connect via the history and dashboard API pipelines to record audio files.
            </p>
            <button onClick={() => setSubView('hub')} className="btn btn-outline">
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    width: '100%',
    paddingBottom: '80px',
  },
  container: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '40px 24px',
  },
  hubHeader: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto 48px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  hubTitle: {
    fontSize: '2.2rem',
    color: 'var(--text-primary)',
  },
  hubSub: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
  },
  hubGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    maxWidth: '800px',
    margin: '0 auto',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
  hubCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
    cursor: 'pointer',
    minHeight: '220px',
  },
  iconBoxPurple: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    background: 'rgba(139, 92, 246, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxPink: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    background: 'rgba(236, 72, 153, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.2rem',
    color: 'var(--text-primary)',
  },
  cardDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
  },
  whySection: {
    marginTop: '80px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '64px',
  },
  secTitle: {
    fontSize: '1.5rem',
    color: 'var(--text-primary)',
    marginBottom: '32px',
    textAlign: 'center',
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '32px',
    textAlign: 'left',
  },
  whyItemTitle: {
    fontSize: '1.05rem',
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  whyItemText: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
  },
  subHeader: {
    textAlign: 'left',
    maxWidth: '800px',
    margin: '0 auto 32px auto',
  },
  backBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.9rem',
    transition: 'var(--transition)',
    ':hover': {
      color: 'var(--text-primary)',
    }
  },
  ttsCard: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '32px',
  },
  cardSubHeader: {
    fontSize: '1rem',
    color: 'var(--text-primary)',
    fontWeight: '600',
    marginBottom: '16px',
  },
  langGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
    gap: '10px',
  },
  langBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    padding: '12px 6px',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'var(--transition)',
  },
  langName: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  textareaFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  counters: {
    display: 'flex',
    gap: '8px',
  },
  counterDivider: {
    color: 'var(--border-color)',
  },
  clearBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'var(--transition)',
    ':hover': {
      color: '#ef4444',
    }
  },
  actionRow: {
    marginTop: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  convertBtn: {
    padding: '12px 24px',
  },
  soundwave: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    height: '32px',
  },
  waveBar: {
    width: '4px',
    height: '10px',
    background: 'var(--primary-light)',
    borderRadius: '2px',
    animation: 'wave 1s infinite alternate ease-in-out',
  },
  tipCallout: {
    background: 'rgba(139,92,246,0.02)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '16px',
    marginTop: '32px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  tipText: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    margin: 0,
  }
};

// CSS injection for wave animation
if (typeof document !== 'undefined') {
  const stylesStr = `
    @keyframes wave {
      0% { height: 6px; transform: scaleY(1); }
      100% { height: 28px; transform: scaleY(1.3); }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = stylesStr;
  document.head.appendChild(styleSheet);
}
