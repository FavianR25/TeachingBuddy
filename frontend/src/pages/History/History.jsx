import { useState, useEffect } from 'react'
import { getHistory, deleteHistoryEntry, clearHistory } from '../../utils/history'
import { copyToClipboard, formatDate, TOOL_LABELS, TOOL_ICONS } from '../../utils/helpers'

const ALL_TOOLS = ['all', 'lesson-planner', 'concept-explainer', 'activity-generator', 'quiz-worksheet', 'teacher-notes']

export default function History() {
  const [history, setHistory] = useState([])
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const filtered = filter === 'all' ? history : history.filter((e) => e.tool === filter)

  const handleDelete = (id) => {
    if (!window.confirm('Delete this entry?')) return
    deleteHistoryEntry(id)
    setHistory(getHistory())
  }

  const handleClearAll = () => {
    if (!window.confirm('Clear ALL history? This cannot be undone.')) return
    clearHistory()
    setHistory([])
  }

  const handleCopy = async (content) => {
    try {
      await copyToClipboard(content)
      setToast(true)
      setTimeout(() => setToast(false), 2000)
    } catch {
      alert('Failed to copy.')
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon">🕐</div>
        <h1>History</h1>
        <p>Browse, copy, and manage your previously generated content.</p>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        {ALL_TOOLS.map((tool) => (
          <button
            key={tool}
            className={`filter-btn ${filter === tool ? 'active' : ''}`}
            onClick={() => setFilter(tool)}
          >
            {tool === 'all' ? `All (${history.length})` : `${TOOL_ICONS[tool]} ${TOOL_LABELS[tool]}`}
          </button>
        ))}
        {history.length > 0 && (
          <button
            className="btn btn-danger btn-sm"
            style={{ marginLeft: 'auto' }}
            onClick={handleClearAll}
          >
            🗑 Clear All
          </button>
        )}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="history-empty">
          <div className="history-empty-icon">📭</div>
          <h3>No history yet</h3>
          <p>
            {filter === 'all'
              ? 'Generate something with an AI tool and save it to see it here.'
              : `No saved entries for ${TOOL_LABELS[filter]}.`}
          </p>
        </div>
      )}

      {/* History list */}
      {filtered.map((entry) => (
        <div key={entry.id} className="history-item">
          <div className="history-item-header">
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="history-item-meta">
                <span className="history-badge">
                  {TOOL_ICONS[entry.tool]} {TOOL_LABELS[entry.tool]}
                </span>
                <span>{formatDate(entry.createdAt)}</span>
              </div>
              <div className="history-item-title">{entry.title}</div>
            </div>
            <div className="history-actions">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              >
                {expandedId === entry.id ? '▲ Hide' : '▼ View'}
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleCopy(entry.content)}
              >
                📋
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(entry.id)}
              >
                🗑
              </button>
            </div>
          </div>

          {expandedId !== entry.id && (
            <div className="history-preview">{entry.content}</div>
          )}

          {expandedId === entry.id && (
            <div className="result-box" style={{ marginTop: 10, maxHeight: 400 }}>
              {entry.content}
            </div>
          )}
        </div>
      ))}

      {toast && <div className="copy-toast">✅ Copied to clipboard!</div>}
    </div>
  )
}
