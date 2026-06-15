import React, { useState } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  Coins, 
  Receipt, 
  Briefcase, 
  Building, 
  Code, 
  Lock, 
  Check, 
  Plus, 
  Minus, 
  MessageSquare, 
  Star,
  Users
} from 'lucide-react';

export default function LandingPage({ setCurrentView, showToast }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const startTrial = () => {
    setCurrentView('signup');
    showToast('Starting your 14-day trial account setup!', 'info');
    window.scrollTo(0, 0);
  };

  const viewApiDocs = () => {
    setCurrentView('documentation');
    window.scrollTo(0, 0);
  };

  const faqs = [
    {
      q: "What types of documents can FinanceAI process?",
      a: "FinanceAI can process bank statements, receipts, invoices, credit card statements, purchase orders, and other financial documents in PDF, PNG, JPEG, and TIFF formats. Our AI is trained on millions of documents and continuously improving."
    },
    {
      q: "How accurate is the data extraction?",
      a: "Our AI achieves 99.5% accuracy on standard financial documents. For complex or low-quality documents, we provide confidence scores for each extracted field, and our review interface makes it easy to verify and correct data if needed."
    },
    {
      q: "Is my financial data secure?",
      a: "Yes. We use bank-level encryption (AES-256) for data at rest and TLS 1.3 for data in transit. We are SOC 2 Type II certified and GDPR compliant. Your documents are automatically deleted after 30 days unless you choose to keep them longer."
    },
    {
      q: "How long does processing take?",
      a: "Most documents are processed in 2-5 seconds. Batch processing of hundreds of documents is handled asynchronously, with real-time webhooks notifying you when processing is complete."
    },
    {
      q: "Can I integrate FinanceAI with my accounting software?",
      a: "Yes! We offer a comprehensive REST API, native integrations with QuickBooks, Xero, Sage, and other major accounting platforms, plus Zapier support for connecting to thousands of other apps."
    },
    {
      q: "What support options are available?",
      a: "All plans include email support with 24-hour response time. Pro and Enterprise plans get priority support, dedicated account managers, and phone support. Our developer documentation and API guides are available 24/7."
    }
  ];

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.heroSection} className="animate-fade-in">
        <div style={styles.heroBadge}>
          <div style={styles.heroBadgeDot}></div>
          <span style={styles.heroBadgeText}>Trusted by 8,500+ Accounting Professionals</span>
        </div>

        <h1 className="hero-glow-title" style={styles.heroTitle}>
          AI-Powered Financial <br />
          Document Processing
        </h1>

        <p style={styles.heroSub}>
          Automatically extract data from bank statements, receipts, and invoices. Perfect for accountants and financial professionals who need to process financial documents efficiently.
        </p>

        <div style={styles.heroActions}>
          <button onClick={startTrial} className="btn btn-primary" style={styles.ctaBtn}>
            Start Free Trial <ArrowRight size={16} />
          </button>
          <button onClick={viewApiDocs} className="btn btn-outline" style={styles.docsBtn}>
            View API Docs
          </button>
        </div>

        <div style={styles.heroBenefits}>
          <div style={styles.benefitItem}>
            <CheckCircle size={14} color="var(--success)" />
            <span>No credit card required</span>
          </div>
          <div style={styles.benefitItem}>
            <CheckCircle size={14} color="var(--success)" />
            <span>14-day free trial</span>
          </div>
          <div style={styles.benefitItem}>
            <CheckCircle size={14} color="var(--success)" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={styles.section} id="features">
        <div style={styles.sectionHeader}>
          <span className="badge badge-purple">Powerful Features</span>
          <h2 style={styles.sectionTitle}>Powerful Document Processing</h2>
          <p style={styles.sectionDesc}>
            Extract structured data from any financial document with our advanced AI technology.
          </p>
        </div>

        <div style={styles.featuresGrid}>
          {/* Card 1 */}
          <div className="glass-card glass-card-hover" style={styles.featureCard}>
            <div style={{ ...styles.cardIconBox, background: 'rgba(139, 92, 246, 0.1)' }}>
              <Coins size={24} color="var(--primary)" />
            </div>
            <h3 style={styles.cardTitle}>Bank Statements</h3>
            <p style={styles.cardDesc}>
              Automatically extract transaction details, account balances, and payment information from bank statements.
            </p>
            <ul style={styles.cardBulletList}>
              <li><Check size={14} color="var(--success)" /> Transaction amounts</li>
              <li><Check size={14} color="var(--success)" /> Debit/Credit classification</li>
              <li><Check size={14} color="var(--success)" /> Account details</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-card glass-card-hover" style={styles.featureCard}>
            <div style={{ ...styles.cardIconBox, background: 'rgba(236, 72, 153, 0.1)' }}>
              <Receipt size={24} color="var(--secondary)" />
            </div>
            <h3 style={styles.cardTitle}>Receipts</h3>
            <p style={styles.cardDesc}>
              Extract merchant information, purchase amounts, dates, and itemized details from receipts.
            </p>
            <ul style={styles.cardBulletList}>
              <li><Check size={14} color="var(--success)" /> Merchant names</li>
              <li><Check size={14} color="var(--success)" /> Total amounts</li>
              <li><Check size={14} color="var(--success)" /> Purchase dates</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-card glass-card-hover" style={styles.featureCard}>
            <div style={{ ...styles.cardIconBox, background: 'rgba(59, 130, 246, 0.1)' }}>
              <FileText size={24} color="var(--info)" />
            </div>
            <h3 style={styles.cardTitle}>Invoices</h3>
            <p style={styles.cardDesc}>
              Parse supplier information, invoice numbers, amounts, and payment terms from invoices.
            </p>
            <ul style={styles.cardBulletList}>
              <li><Check size={14} color="var(--success)" /> Supplier details</li>
              <li><Check size={14} color="var(--success)" /> Invoice amounts</li>
              <li><Check size={14} color="var(--success)" /> Payment terms</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Built For Every Workflow */}
      <section style={{...styles.section, background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)'}}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Built for Every Financial Workflow</h2>
          <p style={styles.sectionDesc}>
            Whether you're an accountant, bookkeeper, or finance professional, FinanceAI streams your document processing.
          </p>
        </div>

        <div style={styles.workflowsGrid}>
          <div style={styles.workflowItem}>
            <div style={styles.workflowHeader}>
              <Briefcase size={18} color="var(--primary-light)" />
              <h4 style={styles.workflowTitle}>Accounting Firms</h4>
            </div>
            <p style={styles.workflowText}>Process client files at scale with advanced batch uploads and custom exports.</p>
          </div>
          <div style={styles.workflowItem}>
            <div style={styles.workflowHeader}>
              <Building size={18} color="var(--primary-light)" />
              <h4 style={styles.workflowTitle}>Small Businesses</h4>
            </div>
            <p style={styles.workflowText}>Save hours of bookkeeping using automated receipt matches and categorization.</p>
          </div>
          <div style={styles.workflowItem}>
            <div style={styles.workflowHeader}>
              <Lock size={18} color="var(--primary-light)" />
              <h4 style={styles.workflowTitle}>Enterprise Teams</h4>
            </div>
            <p style={styles.workflowText}>Secure document parsing backed by SSO, SOC 2 compliance, and direct logs access.</p>
          </div>
          <div style={styles.workflowItem}>
            <div style={styles.workflowHeader}>
              <Code size={18} color="var(--primary-light)" />
              <h4 style={styles.workflowTitle}>FinTech Applications</h4>
            </div>
            <p style={styles.workflowText}>Power your own software with our developer-friendly REST API and SDK wrappers.</p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Trusted by Thousands Worldwide</h2>
          <p style={styles.sectionDesc}>Numbers that speak for themselves.</p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNum}>15M+</div>
            <div style={styles.statLabel}>Documents Processed</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNum}>99.5%</div>
            <div style={styles.statLabel}>Accuracy Rate</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNum}>8,500+</div>
            <div style={styles.statLabel}>Active Users</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNum}>150+</div>
            <div style={styles.statLabel}>Countries Served</div>
          </div>
        </div>

        <div style={{ ...styles.statsGrid, marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>
          <div style={styles.secondaryStatCard}>
            <div style={styles.secondaryStatNum}>85%</div>
            <div style={styles.secondaryStatLabel}>Time Saved on Data Entry</div>
          </div>
          <div style={styles.secondaryStatCard}>
            <div style={styles.secondaryStatNum}>3 Sec</div>
            <div style={styles.secondaryStatLabel}>Average Processing Time</div>
          </div>
          <div style={styles.secondaryStatCard}>
            <div style={styles.secondaryStatNum}>24/7</div>
            <div style={styles.secondaryStatLabel}>API Availability</div>
          </div>
        </div>
      </section>

      {/* Why Choose Our API */}
      <section style={{ ...styles.section, borderTop: '1px solid var(--border-color)' }}>
        <div style={styles.sectionHeader}>
          <span className="badge badge-purple">Why Choose Our API?</span>
          <h2 style={styles.sectionTitle}>Built for High-Scale Applications</h2>
          <p style={styles.sectionDesc}>Fast, reliable API infrastructure designed for developers and enterprise scale.</p>
        </div>

        <div style={styles.whyGrid}>
          <div className="glass-card" style={styles.whyCard}>
            <h4 style={styles.whyTitle}>Lightning Fast</h4>
            <p style={styles.whyDesc}>Deploy state-of-the-art AI extraction that responds in milliseconds to power immediate dashboards.</p>
          </div>
          <div className="glass-card" style={styles.whyCard}>
            <h4 style={styles.whyTitle}>Secure & Compliant</h4>
            <p style={styles.whyDesc}>Full SOC 2 validation, end-to-end data encryption, and options to disable persistent logs storage.</p>
          </div>
          <div className="glass-card" style={styles.whyCard}>
            <h4 style={styles.whyTitle}>99.5% Accurate</h4>
            <p style={styles.whyDesc}>Intelligent contextual processing that correctly understands currencies, line-items, and merchant details.</p>
          </div>
        </div>
      </section>

      {/* Customer Stories / Testimonials */}
      <section style={{...styles.section, background: 'rgba(139, 92, 246, 0.02)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)'}}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Trusted by Accounting Professionals</h2>
          <p style={styles.sectionDesc}>See what our partners say about the speed and reliability of FinanceAI.</p>
        </div>

        <div style={styles.testimonialsGrid}>
          <div className="glass-card" style={styles.testimonialCard}>
            <div style={styles.testimonialStars}>
              <Star size={16} fill="var(--warning)" color="var(--warning)" />
              <Star size={16} fill="var(--warning)" color="var(--warning)" />
              <Star size={16} fill="var(--warning)" color="var(--warning)" />
              <Star size={16} fill="var(--warning)" color="var(--warning)" />
              <Star size={16} fill="var(--warning)" color="var(--warning)" />
            </div>
            <p style={styles.testimonialText}>
              "FinanceAI has revolutionized our document workflow. We've cut manual processing time down by 80%. The accuracy is unbelievable."
            </p>
            <div style={styles.testimonialUser}>
              <div style={styles.userInitial}>SM</div>
              <div>
                <div style={styles.userName}>Sarah Mitchell</div>
                <div style={styles.userRole}>Founder, Mitchell Advisory</div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={styles.testimonialCard}>
            <div style={styles.testimonialStars}>
              <Star size={16} fill="var(--warning)" color="var(--warning)" />
              <Star size={16} fill="var(--warning)" color="var(--warning)" />
              <Star size={16} fill="var(--warning)" color="var(--warning)" />
              <Star size={16} fill="var(--warning)" color="var(--warning)" />
              <Star size={16} fill="var(--warning)" color="var(--warning)" />
            </div>
            <p style={styles.testimonialText}>
              "The API integration was exceptionally smooth. Up and running in under a day. Support is top-notch and prompt."
            </p>
            <div style={styles.testimonialUser}>
              <div style={styles.userInitial}>DK</div>
              <div>
                <div style={styles.userName}>David Kim</div>
                <div style={styles.userRole}>CTO, PayFlow Ledger</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p style={styles.sectionDesc}>Everything you need to know about FinanceAI.</p>
        </div>

        <div style={styles.faqWrapper}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              style={{
                ...styles.faqItem,
                borderColor: activeFaq === idx ? 'var(--primary)' : 'var(--border-color)',
                background: activeFaq === idx ? 'rgba(139, 92, 246, 0.02)' : 'transparent'
              }}
              onClick={() => toggleFaq(idx)}
            >
              <div style={styles.faqQuestionRow}>
                <span style={styles.faqQuestion}>{faq.q}</span>
                {activeFaq === idx ? (
                  <Minus size={18} color="var(--primary)" />
                ) : (
                  <Plus size={18} color="var(--text-secondary)" />
                )}
              </div>
              {activeFaq === idx && (
                <div style={styles.faqAnswer} className="animate-fade-in">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA final banner */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaCard}>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Document Processing?</h2>
          <p style={styles.ctaDesc}>
            Join thousands of accountants who trust our AI to process their bank statements, receipts, and invoices.
          </p>
          <div style={styles.ctaActions}>
            <button onClick={startTrial} className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
              Start Your Free Trial
            </button>
            <button onClick={() => setCurrentView('contact')} className="btn btn-outline" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    width: '100%',
    paddingBottom: '80px',
  },
  heroSection: {
    maxWidth: '850px',
    margin: '0 auto',
    padding: '100px 24px 64px 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(139, 92, 246, 0.1)',
    border: '1px solid rgba(139, 92, 246, 0.25)',
    padding: '6px 14px',
    borderRadius: '40px',
    marginBottom: '28px',
  },
  heroBadgeDot: {
    width: '6px',
    height: '6px',
    background: 'var(--primary-light)',
    borderRadius: '50%',
    boxShadow: '0 0 6px var(--primary-light)',
  },
  heroBadgeText: {
    fontSize: '0.82rem',
    fontWeight: '600',
    color: 'var(--primary-light)',
  },
  heroTitle: {
    marginBottom: '24px',
  },
  heroSub: {
    fontSize: '1.15rem',
    lineHeight: '1.7',
    color: 'var(--text-secondary)',
    marginBottom: '40px',
    maxWidth: '700px',
  },
  heroActions: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '48px',
  },
  ctaBtn: {
    padding: '12px 28px',
    fontSize: '1rem',
  },
  docsBtn: {
    padding: '12px 28px',
    fontSize: '1rem',
  },
  heroBenefits: {
    display: 'flex',
    justifyContent: 'center',
    gap: '32px',
    flexWrap: 'wrap',
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  section: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '80px 24px',
  },
  sectionHeader: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto 56px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    color: 'var(--text-primary)',
  },
  sectionDesc: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  featureCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
  },
  cardIconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  cardDesc: {
    fontSize: '0.92rem',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
  },
  cardBulletList: {
    listStyle: 'none',
    padding: 0,
    margin: '8px 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
  },
  workflowsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '32px',
  },
  workflowItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  workflowHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  workflowTitle: {
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
  },
  workflowText: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '24px',
    textAlign: 'center',
  },
  statCard: {
    padding: '16px',
  },
  statNum: {
    fontSize: '3rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #ffffff 0%, var(--primary-light) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  secondaryStatCard: {
    padding: '12px',
  },
  secondaryStatNum: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '6px',
  },
  secondaryStatLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  whyCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  whyTitle: {
    fontSize: '1.15rem',
    color: 'var(--text-primary)',
  },
  whyDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
  },
  testimonialCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'space-between',
  },
  testimonialStars: {
    display: 'flex',
    gap: '4px',
  },
  testimonialText: {
    fontSize: '0.95rem',
    fontStyle: 'italic',
    lineHeight: '1.6',
    color: 'var(--text-primary)',
  },
  testimonialUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userInitial: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--primary-glow)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    color: 'var(--primary-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  userRole: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    marginTop: '2px',
  },
  faqWrapper: {
    maxWidth: '750px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  faqItem: {
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--border-radius)',
    padding: '20px 24px',
    cursor: 'pointer',
    transition: 'var(--transition)',
  },
  faqQuestionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: '1.05rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  faqAnswer: {
    marginTop: '14px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '14px',
  },
  ctaSection: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto 80px auto',
    padding: '0 24px',
  },
  ctaCard: {
    background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.03) 70%), rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    padding: '64px 24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  ctaTitle: {
    fontSize: '2rem',
    maxWidth: '650px',
    lineHeight: '1.3',
  },
  ctaDesc: {
    fontSize: '1.05rem',
    color: 'var(--text-secondary)',
    maxWidth: '550px',
  },
  ctaActions: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '12px',
  }
};
