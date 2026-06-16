import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  Mic, 
  Globe, 
  Sparkles, 
  Trash2, 
  ArrowLeft, 
  Play,
  VolumeX,
  Upload,
  File,
  Copy,
  Loader2
} from 'lucide-react';

export default function VoiceTools({ showToast, defaultSubView = 'hub' }) {
  const [subView, setSubView] = useState(defaultSubView);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState(null);

  // STT state
  const [sttMode, setSttMode] = useState('record'); // 'record' | 'upload'
  const [sttState, setSttState] = useState('idle'); // 'idle' | 'recording' | 'transcribing' | 'completed'
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcriptResult, setTranscriptResult] = useState(null);
  const fileInputRef = useRef(null);

  // Sync subView when defaultSubView prop changes (deep-linking from navbar)
  useEffect(() => {
    setSubView(defaultSubView);
    // Reset STT state when switching sub-views
    setSttState('idle');
    setSelectedFile(null);
    setTranscriptResult(null);
  }, [defaultSubView]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSynth(window.speechSynthesis);
    }
  }, []);

  // Timer for microphone recording
  useEffect(() => {
    let timer;
    if (sttState === 'recording') {
      timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(timer);
  }, [sttState]);

  // TTS functions
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
    const langMap = {
      EN: 'en-US', HI: 'hi-IN', TA: 'ta-IN', TE: 'te-IN',
      BN: 'bn-IN', MR: 'mr-IN', GU: 'gu-IN', KN: 'kn-IN',
      ES: 'es-ES', FR: 'fr-FR', DE: 'de-DE', JA: 'ja-JP'
    };
    utterance.lang = langMap[selectedLang] || 'en-US';

    const voices = synth.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(utterance.lang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    synth.speak(utterance);
    showToast(`Synthesizing text in ${selectedLang}...`, 'success');
  };

  useEffect(() => {
    return () => {
      if (synth) synth.cancel();
    };
  }, [synth]);

  // STT functions
  const startRecording = () => {
    setSttState('recording');
    setSelectedFile(null);
    setTranscriptResult(null);
    showToast('Microphone recording started...', 'info');
  };

  const stopRecording = () => {
    setSttState('transcribing');
    showToast('Recording stopped. Processing audio...', 'success');
    
    // Simulate API transcription call latency
    setTimeout(() => {
      setSttState('completed');
      setTranscriptResult({
        filename: "live_recording_mic.wav",
        duration: `${recordingTime}s`,
        confidence: 0.988,
        language: "en-US",
        text: "Hello, this is a live audio recording transcribed directly using the Conversa Speech-to-Text neural model. The system is able to identify vocabulary structures and speaker segments with ultra-low latency.",
        speakers: [
          { name: "Speaker 1", time: "0:01", text: "Hello, this is a live audio recording transcribed directly using the Conversa Speech-to-Text neural model." },
          { name: "Speaker 1", time: "0:06", text: "The system is able to identify vocabulary structures and speaker segments with ultra-low latency." }
        ]
      });
      showToast('Speech transcribed successfully!', 'success');
    }, 2500);
  };

  const cancelRecording = () => {
    setSttState('idle');
    showToast('Recording cancelled.', 'info');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file) => {
    if (!file.type.startsWith('audio/') && !file.name.endsWith('.mp3') && !file.name.endsWith('.wav') && !file.name.endsWith('.m4a') && !file.name.endsWith('.ogg')) {
      showToast('Invalid file format. Please upload an audio file (.mp3, .wav, .m4a, .ogg).', 'error');
      return;
    }
    setSelectedFile(file);
    setTranscriptResult(null);
    showToast(`Loaded ${file.name}`, 'info');
  };

  const startFileTranscription = () => {
    if (!selectedFile) return;
    setSttState('transcribing');
    
    // Simulate transcribing
    setTimeout(() => {
      setSttState('completed');
      setTranscriptResult({
        filename: selectedFile.name,
        duration: "14.5s",
        confidence: 0.994,
        language: "en-US",
        text: "Thank you for reaching out to Conversa Support. Your voice service query is being processed under license code 4059. Please let us know if there is anything else we can assist you with today.",
        speakers: [
          { name: "Speaker 1", time: "0:00", text: "Thank you for reaching out to Conversa Support. Your voice service query is being processed under license code 4059." },
          { name: "Speaker 2", time: "0:07", text: "Please let us know if there is anything else we can assist you with today." }
        ]
      });
      showToast('Audio file transcribed successfully!', 'success');
    }, 3000);
  };

  const loadDemoFile = (filename, duration, transcript, speakers) => {
    setSelectedFile({ name: filename });
    setTranscriptResult(null);
    setSttState('transcribing');
    
    setTimeout(() => {
      setSttState('completed');
      setTranscriptResult({
        filename,
        duration,
        confidence: 0.997,
        language: "en-US",
        text: transcript,
        speakers
      });
      showToast(`${filename} transcribed successfully!`, 'success');
    }, 2000);
  };

  const copyTranscriptToClipboard = () => {
    if (!transcriptResult) return;
    navigator.clipboard.writeText(transcriptResult.text);
    showToast('Transcript copied to clipboard!', 'success');
  };

  const handleDownloadTranscriptJSON = () => {
    if (!transcriptResult) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transcriptResult, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${transcriptResult.filename.split('.')[0]}_transcript.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Transcript downloaded as JSON.', 'success');
  };

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

          <div className="voice-hub-grid">
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
            <button onClick={() => setSubView('hub')} style={styles.backBtn} className="voice-back-btn">
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
                <button onClick={handleClear} style={styles.clearBtn} className="voice-clear-btn">
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
        /* SPEECH TO TEXT — TABBED INTERFACE */
        <div style={styles.container}>
          <div style={styles.subHeader}>
            <button onClick={() => setSubView('hub')} style={styles.backBtn} className="voice-back-btn">
              <ArrowLeft size={16} /> Back to Voice Tools
            </button>
            <h1 style={{...styles.hubTitle, marginTop: '20px'}}>Speech to Text</h1>
            <p style={styles.hubSub}>Transcribe speech audios into high-fidelity structured text transcripts.</p>
          </div>

          <div style={styles.sttLayout}>
            {/* Tab Switcher */}
            <div style={styles.sttTabBar}>
              <button
                onClick={() => { setSttMode('record'); setSttState('idle'); setTranscriptResult(null); }}
                style={{
                  ...styles.sttTab,
                  ...(sttMode === 'record' ? styles.sttTabActive : {})
                }}
              >
                <Mic size={15} />
                Record Audio
              </button>
              <button
                onClick={() => { setSttMode('upload'); setSttState('idle'); setTranscriptResult(null); }}
                style={{
                  ...styles.sttTab,
                  ...(sttMode === 'upload' ? styles.sttTabActive : {})
                }}
              >
                <Upload size={15} />
                Upload Audio File
              </button>
            </div>

            {/* Input Card */}
            <div className="glass-card" style={styles.sttCard}>
              {sttMode === 'record' ? (
                /* ---- RECORD MODE ---- */
                <div>
                  <h3 style={{...styles.cardSubHeader, marginBottom: '24px'}}>Live Microphone Recording</h3>
                  <div style={styles.micCenterZone}>
                    {sttState === 'recording' ? (
                      <div style={styles.recordingStateBox}>
                        <div className="badge badge-danger" style={{ animation: 'pulse 1s infinite alternate' }}>
                          🔴 LIVE RECORDING
                        </div>
                        <div style={styles.recordingTimer}>
                          {String(Math.floor(recordingTime / 60)).padStart(2, '0')}:{String(recordingTime % 60).padStart(2, '0')}
                        </div>
                        <div style={styles.soundwave}>
                          <div style={{...styles.waveBar, animationDelay: '0s'}}></div>
                          <div style={{...styles.waveBar, animationDelay: '0.15s', height: '20px'}}></div>
                          <div style={{...styles.waveBar, animationDelay: '0.3s', height: '26px'}}></div>
                          <div style={{...styles.waveBar, animationDelay: '0.45s', height: '14px'}}></div>
                          <div style={{...styles.waveBar, animationDelay: '0.6s', height: '22px'}}></div>
                          <div style={{...styles.waveBar, animationDelay: '0.75s', height: '18px'}}></div>
                          <div style={{...styles.waveBar, animationDelay: '0.9s', height: '30px'}}></div>
                        </div>
                        <div style={styles.btnGroup}>
                          <button onClick={cancelRecording} className="btn btn-outline" style={{ padding: '10px 20px' }}>
                            Cancel
                          </button>
                          <button onClick={stopRecording} className="btn btn-primary" style={{ padding: '10px 20px', background: '#ef4444', borderColor: '#ef4444' }}>
                            Stop & Transcribe
                          </button>
                        </div>
                      </div>
                    ) : sttState === 'transcribing' ? (
                      <div style={styles.transcribingWrapper}>
                        <Loader2 size={28} className="animate-spin" color="var(--primary)" />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '500' }}>
                          Transcribing speech (neural analysis)...
                        </span>
                      </div>
                    ) : (
                      <div style={styles.recordPlaceholder}>
                        <button onClick={startRecording} style={styles.micRecordBtn}>
                          <Mic size={28} color="#ffffff" />
                        </button>
                        <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1rem', marginTop: '16px' }}>
                          Click to Start Recording
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px', textAlign: 'center', maxWidth: '280px' }}>
                          Uses your browser microphone to capture audio. Recording will start immediately.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* ---- UPLOAD MODE ---- */
                <div>
                  <h3 style={{...styles.cardSubHeader, marginBottom: '24px'}}>Upload Audio File</h3>

                  {/* Drop Zone */}
                  <div
                    style={{
                      ...styles.dropZone,
                      borderColor: selectedFile ? 'var(--primary)' : 'var(--border-color)',
                      background: selectedFile ? 'rgba(139, 92, 246, 0.04)' : 'transparent'
                    }}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      accept="audio/*"
                    />
                    <Upload size={36} color={selectedFile ? 'var(--primary)' : 'var(--text-muted)'} style={{ marginBottom: '14px' }} />
                    {selectedFile ? (
                      <div>
                        <p style={{ color: 'var(--primary-light)', fontWeight: '600', fontSize: '0.95rem' }}>{selectedFile.name}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '6px' }}>Click or drag to replace file</p>
                      </div>
                    ) : (
                      <div>
                        <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.95rem' }}>Drag & drop your audio file here</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '6px' }}>or click to browse · Supports WAV, MP3, M4A, OGG (Max 25MB)</p>
                      </div>
                    )}
                  </div>

                  {/* Transcribe Button */}
                  {selectedFile && sttState !== 'transcribing' && (
                    <button onClick={startFileTranscription} className="btn btn-primary" style={{ width: '100%', marginTop: '16px', padding: '12px' }}>
                      <Sparkles size={16} /> Transcribe File
                    </button>
                  )}

                  {sttState === 'transcribing' && (
                    <div style={{...styles.transcribingWrapper, marginTop: '16px'}}>
                      <Loader2 size={24} className="animate-spin" color="var(--primary)" />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                        Transcribing audio file (neural analysis)...
                      </span>
                    </div>
                  )}

                  {/* Demo Files */}
                  <div style={{...styles.demoSection, marginTop: '24px'}}>
                    <p style={styles.demoTitle}>Try a demo audio file:</p>
                    <div style={styles.demoRow}>
                      <button
                        onClick={() => loadDemoFile(
                          'customer_support_call.mp3',
                          '8.2s',
                          'Yes, I would like to verify if my API key is active. It returns an unauthorized code when starting requests.',
                          [
                            { name: "Customer", time: "0:00", text: "Yes, I would like to verify if my API key is active." },
                            { name: "Customer", time: "0:04", text: "It returns an unauthorized code when starting requests." }
                          ]
                        )}
                        className="btn btn-outline"
                        style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                        disabled={sttState === 'transcribing'}
                      >
                        <Play size={12} style={{ marginRight: '4px' }} /> Support Call
                      </button>
                      <button
                        onClick={() => loadDemoFile(
                          'product_meeting_notes.wav',
                          '12.4s',
                          'We need to launch the speech recognition SDK modules next Tuesday. Check the documentation and finalize config options.',
                          [
                            { name: "Product Lead", time: "0:00", text: "We need to launch the speech recognition SDK modules next Tuesday." },
                            { name: "Developer", time: "0:06", text: "Check the documentation and finalize config options." }
                          ]
                        )}
                        className="btn btn-outline"
                        style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                        disabled={sttState === 'transcribing'}
                      >
                        <Play size={12} style={{ marginRight: '4px' }} /> Meeting Notes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Card */}
            {transcriptResult && (
              <div className="glass-card animate-fade-in" style={{...styles.sttCard}}>
                <div style={styles.resultsHeader}>
                  <h3 style={styles.cardSubHeader}>Transcription Result</h3>
                  <div style={styles.resultsActions}>
                    <button onClick={copyTranscriptToClipboard} className="voice-action-icon-btn" style={styles.actionIconBtn} title="Copy Transcript">
                      <Copy size={16} />
                    </button>
                    <button onClick={handleDownloadTranscriptJSON} className="voice-action-icon-btn" style={styles.actionIconBtn} title="Download JSON">
                      <File size={16} />
                    </button>
                  </div>
                </div>

                {/* Metadata */}
                <div style={styles.resultsMeta}>
                  <div style={styles.metaBadge}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Duration:</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.8rem' }}>{transcriptResult.duration}</span>
                  </div>
                  <div style={styles.metaBadge}>
                    <span style={{ color: 'var(--success)', fontWeight: '600', fontSize: '0.8rem' }}>{(transcriptResult.confidence * 100).toFixed(1)}% Confidence</span>
                  </div>
                  <div style={styles.metaBadge}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Language:</span>
                    <span style={{ color: 'var(--primary-light)', fontWeight: '600', fontSize: '0.8rem' }}>{transcriptResult.language}</span>
                  </div>
                </div>

                {/* Transcript Dialogues */}
                <div style={styles.transcriptBox}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Dialogue breakdown
                  </h4>
                  <div style={styles.dialogueList}>
                    {transcriptResult.speakers.map((spk, idx) => (
                      <div key={idx} style={styles.dialogueRow}>
                        <div style={styles.speakerCol}>
                          <span style={styles.speakerName}>{spk.name}</span>
                          <span style={styles.speakerTime}>{spk.time}</span>
                        </div>
                        <div style={styles.speakerText}>
                          {spk.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
  },
  ttsCard: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '32px',
  },
  cardSubHeader: {
    fontSize: '1.1rem',
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
  },
  
  // STT Custom styles
  sttLayout: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sttTabBar: {
    display: 'flex',
    gap: '4px',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    padding: '4px',
  },
  sttTab: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition)',
  },
  sttTabActive: {
    background: 'rgba(139, 92, 246, 0.15)',
    color: 'var(--text-primary)',
    boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.3)',
  },
  micCenterZone: {
    minHeight: '280px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  sttCard: {
    padding: '32px',
  },
  dropZone: {
    border: '2px dashed var(--border-color)',
    borderRadius: '12px',
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'var(--transition)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micZone: {
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.01)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  recordPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micRecordBtn: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--secondary) 0%, #be185d 100%)',
    border: 'none',
    boxShadow: '0 4px 15px var(--secondary-glow)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition)',
  },
  recordingStateBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
  },
  recordingTimer: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    fontFamily: 'monospace',
  },
  btnGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '8px',
  },
  sttFooterActions: {
    borderTop: '1px solid var(--border-color)',
    paddingTop: '20px',
    marginTop: '20px',
  },
  transcribingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px',
    background: 'rgba(139, 92, 246, 0.03)',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    marginBottom: '20px',
  },
  demoSection: {
    background: 'rgba(255, 255, 255, 0.01)',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
  },
  demoTitle: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginBottom: '10px',
    fontWeight: '500',
  },
  demoRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  resultsActions: {
    display: 'flex',
    gap: '8px',
  },
  actionIconBtn: {
    background: 'transparent',
    border: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition)',
  },
  resultsMeta: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '24px',
  },
  metaBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(255, 255, 255, 0.02)',
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px solid var(--border-color)',
  },
  transcriptBox: {
    background: '#040308',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '20px',
  },
  dialogueList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  dialogueRow: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr',
    gap: '12px',
    alignItems: 'start',
  },
  speakerCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  speakerName: {
    fontSize: '0.82rem',
    fontWeight: '600',
    color: 'var(--primary-light)',
  },
  speakerTime: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    fontFamily: 'monospace',
    marginTop: '2px',
  },
  speakerText: {
    fontSize: '0.88rem',
    color: 'var(--text-primary)',
    lineHeight: '1.5',
  }
};

// CSS injection for wave animation
if (typeof document !== 'undefined') {
  const stylesStr = `
    @keyframes wave {
      0% { height: 6px; transform: scaleY(1); }
      100% { height: 28px; transform: scaleY(1.3); }
    }
    @keyframes pulse {
      0% { opacity: 0.6; }
      100% { opacity: 1; }
    }
    .animate-spin {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = stylesStr;
  document.head.appendChild(styleSheet);
}
