import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  FileText, 
  Volume2, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Eye, 
  X,
  Code
} from 'lucide-react';

export default function History({ historyData, showToast }) {
  const [activeTab, setActiveTab] = useState('documents'); // 'overview' | 'documents' | 'voice'
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Stats calculators
  const totalRequests = historyData.length;
  const completedCount = historyData.filter(d => d.status === 'Completed').length;
  const pendingCount = historyData.filter(d => d.status === 'Pending').length;
  const failedCount = historyData.filter(d => d.status === 'Failed').length;

  const bankCount = historyData.filter(d => d.type === 'Bank Statement').length;
  const receiptCount = historyData.filter(d => d.type === 'Receipt').length;
  const invoiceCount = historyData.filter(d => d.type === 'Invoice').length;

  // Filters logic
  const filteredData = historyData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || 
                        (typeFilter === 'bank' && item.type === 'Bank Statement') ||
                        (typeFilter === 'receipt' && item.type === 'Receipt') ||
                        (typeFilter === 'invoice' && item.type === 'Invoice');
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDownload = (name) => {
    // Generate dummy JSON file download
    const dummyJSON = {
      filename: name,
      parsed_at: new Date().toISOString(),
      confidence_score: 0.995,
      extracted_data: {
        account_name: "Varish Tomar",
        extracted_fields: 24,
        status: "verified"
      }
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dummyJSON, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${name.split('.')[0]}_extracted.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(`Downloaded parsed data for ${name}`, 'success');
  };

  return (
    <div style={styles.page} className="animate-fade-in">
      <div style={styles.header}>
        <h1 style={styles.title}>Processing History</h1>
        <p style={styles.sub}>View and track all your document processing and voice conversion activities.</p>
      </div>

      {/* Tabs */}
      <div className="tab-list">
        <button 
          onClick={() => setActiveTab('overview')} 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('documents')} 
          className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
        >
          Documents
        </button>
        <button 
          onClick={() => setActiveTab('voice')} 
          className={`tab-btn ${activeTab === 'voice' ? 'active' : ''}`}
        >
          Voice Tools
        </button>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div style={styles.overviewTab} className="animate-fade-in">
          {/* Stats Summary cards */}
          <div style={styles.summaryGrid}>
            <div className="glass-card" style={styles.summaryCard}>
              <div style={styles.summaryNum}>{totalRequests}</div>
              <div style={styles.summaryLabel}>Total Requests</div>
            </div>
            <div className="glass-card" style={styles.summaryCard}>
              <div style={{...styles.summaryNum, color: 'var(--success)'}}>{completedCount}</div>
              <div style={styles.summaryLabel}>Documents Processed</div>
            </div>
            <div className="glass-card" style={styles.summaryCard}>
              <div style={{...styles.summaryNum, color: 'var(--primary-light)'}}>0</div>
              <div style={styles.summaryLabel}>Voice Conversions</div>
            </div>
          </div>

          <h3 style={{...styles.secTitle, marginTop: '40px'}}>Document Categories</h3>
          <div style={styles.categoriesGrid}>
            <div className="glass-card" style={styles.catCard}>
              <div style={styles.catVal}>{bankCount}</div>
              <div style={styles.catName}>Bank Statements</div>
            </div>
            <div className="glass-card" style={styles.catCard}>
              <div style={styles.catVal}>{receiptCount}</div>
              <div style={styles.catName}>Receipts</div>
            </div>
            <div className="glass-card" style={styles.catCard}>
              <div style={styles.catVal}>{invoiceCount}</div>
              <div style={styles.catName}>Invoices</div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Log Tab */}
      {activeTab === 'documents' && (
        <div className="animate-fade-in">
          {/* Filters Bar */}
          <div style={styles.filtersBar}>
            {/* Search Bar */}
            <div style={styles.searchWrapper}>
              <Search size={16} color="var(--text-muted)" style={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search by filename..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {/* Dropdown 1: Type */}
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Types</option>
              <option value="bank">Bank Statement</option>
              <option value="receipt">Receipt</option>
              <option value="invoice">Invoice</option>
            </select>

            {/* Dropdown 2: Status */}
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Table list */}
          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Filename</th>
                  <th>Type</th>
                  <th>Submitted</th>
                  <th>Processing Time</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td style={styles.filenameCell}>
                      <FileText size={16} color="var(--primary-light)" style={{ flexShrink: 0 }} />
                      <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{item.name}</span>
                    </td>
                    <td>{item.type}</td>
                    <td>{item.submitted}</td>
                    <td>
                      <div style={styles.timeCell}>
                        <Clock size={12} color="var(--text-muted)" />
                        <span>{item.time}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        item.status === 'Completed' ? 'badge-success' : 
                        item.status === 'Pending' ? 'badge-pending' : 'badge-danger'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={styles.actionsCell}>
                        <button onClick={() => setSelectedDoc(item)} style={styles.rowBtn} title="View Details">
                          <Eye size={14} />
                        </button>
                        <button 
                          onClick={() => handleDownload(item.name)} 
                          disabled={item.status !== 'Completed'}
                          style={{...styles.rowBtn, opacity: item.status === 'Completed' ? 1 : 0.4}} 
                          title="Download JSON"
                        >
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={6} style={styles.noDataCell}>
                      No document history records found matching current query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Voice Logs Tab */}
      {activeTab === 'voice' && (
        <div style={styles.voiceTab} className="animate-fade-in">
          <div style={styles.noDataCell} style={{ padding: '64px', textAlign: 'center', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <Volume2 size={32} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No Voice conversion records yet</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Convert text to speech inside the Services menu to write log activity.
            </p>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedDoc && (
        <div style={styles.modalOverlay}>
          <div className="glass-card" style={styles.modal} className="glass-card animate-fade-in">
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Document Details</h3>
              <button onClick={() => setSelectedDoc(null)} style={styles.modalCloseBtn}>
                <X size={18} />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.metaGrid}>
                <div>
                  <span style={styles.metaLabel}>Filename</span>
                  <div style={styles.metaVal}>{selectedDoc.name}</div>
                </div>
                <div>
                  <span style={styles.metaLabel}>Document Type</span>
                  <div style={styles.metaVal}>{selectedDoc.type}</div>
                </div>
                <div>
                  <span style={styles.metaLabel}>Submitted At</span>
                  <div style={styles.metaVal}>{selectedDoc.submitted}</div>
                </div>
                <div>
                  <span style={styles.metaLabel}>Processing Time</span>
                  <div style={styles.metaVal}>{selectedDoc.time}</div>
                </div>
              </div>

              <div style={styles.jsonSection}>
                <div style={styles.jsonHeader}>
                  <Code size={14} color="var(--primary-light)" />
                  <span>EXTRACTED JSON DATA</span>
                </div>
                <pre style={styles.jsonPre}>
{`{
  "document_id": "doc_${selectedDoc.id}",
  "status": "${selectedDoc.status.toLowerCase()}",
  "metadata": {
    "filename": "${selectedDoc.name}",
    "processing_seconds": ${parseFloat(selectedDoc.time)},
    "engine_version": "finance-ocr-v2.1"
  },
  "extracted_entities": {
    "account_holder": "Varish Tomar",
    "statements_period": "2026-05",
    "transactions_count": 24,
    "confidence_rating": 0.995
  }
}`}
                </pre>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button onClick={() => setSelectedDoc(null)} className="btn btn-outline" style={{ padding: '8px 16px' }}>
                Close
              </button>
              <button 
                onClick={() => { handleDownload(selectedDoc.name); setSelectedDoc(null); }} 
                disabled={selectedDoc.status !== 'Completed'}
                className="btn btn-primary" 
                style={{ padding: '8px 16px', opacity: selectedDoc.status === 'Completed' ? 1 : 0.4 }}
              >
                Download JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    padding: '40px 24px 80px 24px',
    width: '100%',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '2rem',
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  sub: {
    fontSize: '0.92rem',
    color: 'var(--text-secondary)',
  },
  overviewTab: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  summaryCard: {
    padding: '32px 24px',
    textAlign: 'center',
  },
  summaryNum: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
  summaryLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },
  secTitle: {
    fontSize: '1.25rem',
    color: 'var(--text-primary)',
    fontWeight: '700',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  catCard: {
    padding: '24px',
    textAlign: 'center',
  },
  catVal: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '4px',
  },
  catName: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  filtersBar: {
    display: 'flex',
    gap: '14px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flex: '1',
    minWidth: '240px',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 16px 10px 38px',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'var(--transition)',
    ':focus': {
      borderColor: 'var(--border-focus)',
      background: 'rgba(255, 255, 255, 0.04)',
    }
  },
  filterSelect: {
    padding: '10px 16px',
    background: '#0b0a16',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    outline: 'none',
    cursor: 'pointer',
    minWidth: '150px',
  },
  filenameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  timeCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  actionsCell: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'flex-end',
  },
  rowBtn: {
    background: 'transparent',
    border: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    padding: '6px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition)',
    ':hover': {
      color: 'var(--text-primary)',
      borderColor: 'var(--primary)',
      background: 'rgba(139, 92, 246, 0.05)',
    }
  },
  noDataCell: {
    padding: '32px',
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(4, 3, 8, 0.8)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
  },
  modal: {
    width: '100%',
    maxWidth: '500px',
    padding: '28px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  modalTitle: {
    fontSize: '1.2rem',
    color: 'var(--text-primary)',
  },
  modalCloseBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '4px',
    ':hover': {
      color: 'var(--text-primary)',
    }
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  metaGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  metaLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  metaVal: {
    fontSize: '0.92rem',
    color: 'var(--text-primary)',
    marginTop: '4px',
    fontWeight: '500',
  },
  jsonSection: {
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  jsonHeader: {
    background: 'rgba(255,255,255,0.01)',
    borderBottom: '1px solid var(--border-color)',
    padding: '8px 12px',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
  },
  jsonPre: {
    margin: 0,
    padding: '12px',
    background: '#040308',
    color: '#34d399',
    fontFamily: 'monospace',
    fontSize: '0.82rem',
    maxHeight: '180px',
    overflowY: 'auto',
    lineHeight: '1.4',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '24px',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '16px',
  }
};
