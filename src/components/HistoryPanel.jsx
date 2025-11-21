import React from 'react'
import './HistoryPanel.css'

const HistoryPanel = ({ history, onClearHistory, onClose }) => {
  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>History</h3>
        <div className="history-actions">
          <button className="clear-history-btn" onClick={onClearHistory}>
            Clear
          </button>
          <button className="close-history-btn" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
      <div className="history-content">
        {history.length === 0 ? (
          <div className="history-empty">
            <p>No calculations yet</p>
            <p className="history-hint">Perform some calculations to see your history here</p>
          </div>
        ) : (
          <ul className="history-list">
            {history.map((item) => (
              <li key={item.id} className="history-item">
                <div className="history-expression">{item.expression}</div>
                <div className="history-result">= {item.result}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default HistoryPanel
