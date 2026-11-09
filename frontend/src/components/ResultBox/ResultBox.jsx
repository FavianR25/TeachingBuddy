import { useState } from 'react'
import { copyToClipboard } from '../../utils/helpers'

export default function ResultBox({ content, onSave, onClear, showAiNotice = true }) {
  const [copying, setCopying] = useState(false)
  const [toast, setToast] = useState(false)

  const handleCopy = async () => {
    setCopying(true)
    try {
      await copyToClipboard(content)
      setToast(true)
      setTimeout(() => setToast(false), 2000)
    } catch {
      alert('Failed to copy. Please select the text and copy manually.')
    }
    setCopying(false)
  }

  if (!content) return null

  return (
    <div className="result-section">
      <div className="result-header">
        <h3>✨ Generated Result</h3>
        <div className="result-actions">
          {onSave && (
            <button className="btn btn-success btn-sm" onClick={onSave}>
              💾 Save to History
            </button>
          )}
          <button className="btn btn-secondary btn-sm" onClick={handleCopy} disabled={copying}>
            {copying ? '⏳ Copying...' : '📋 Copy'}
          </button>
          {onClear && (
            <button className="btn btn-secondary btn-sm" onClick={onClear}>
              🗑 Clear
            </button>
          )}
        </div>
      </div>

      <div className="result-box">{content}</div>

      {showAiNotice && (
        <div className="ai-notice">
          <span className="ai-notice-icon">💡</span>
          <span>
            <strong>AI-Generated Content:</strong> Please review this material before using it with students.
            AI suggestions may contain errors — your professional judgment as a teacher is essential.
          </span>
        </div>
      )}

      {toast && <div className="copy-toast">✅ Copied to clipboard!</div>}
    </div>
  )
}
