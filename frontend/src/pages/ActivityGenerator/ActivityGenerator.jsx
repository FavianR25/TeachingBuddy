import { useState } from 'react'
import { generateActivity } from '../../services/api'
import { saveToHistory } from '../../utils/history'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ResultBox from '../../components/ResultBox/ResultBox'

const initialForm = {
  activityType: '',
  subject: '',
  topic: '',
  studentAge: '',
  numberOfStudents: '',
  activityDuration: '',
  difficultyLevel: '',
  additionalInstructions: '',
}

export default function ActivityGenerator() {
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult('')
    setLoading(true)
    try {
      const res = await generateActivity(form)
      setResult(res.data.result)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate. Please try again.')
    }
    setLoading(false)
  }

  const handleSave = () => {
    saveToHistory({
      tool: 'activity-generator',
      title: `${form.activityType} — ${form.topic}`,
      content: result,
      meta: { activityType: form.activityType, subject: form.subject, topic: form.topic },
    })
    alert('✅ Saved to History!')
  }

  const handleClear = () => {
    setResult('')
    setForm(initialForm)
    setError('')
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon">🎯</div>
        <h1>AI Activity Generator</h1>
        <p>Generate creative, hands-on activities for coding, STEM, and classroom learning.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Activity Type <span className="required">*</span>
              </label>
              <select
                className="form-select"
                name="activityType"
                value={form.activityType}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option>Coding Activity</option>
                <option>STEM Experiment</option>
                <option>Classroom Game</option>
                <option>Group Challenge</option>
                <option>Creative Project</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                Subject / Platform <span className="required">*</span>
              </label>
              <input
                className="form-input"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Scratch, Python, STEM, Physics"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Topic <span className="required">*</span>
            </label>
            <input
              className="form-input"
              name="topic"
              value={form.topic}
              onChange={handleChange}
              placeholder="e.g. Functions and Loops, Simple Machines, Gravity"
              required
            />
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">
                Student Age <span className="required">*</span>
              </label>
              <input
                className="form-input"
                name="studentAge"
                value={form.studentAge}
                onChange={handleChange}
                placeholder="e.g. 10"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Number of Students</label>
              <input
                className="form-input"
                name="numberOfStudents"
                value={form.numberOfStudents}
                onChange={handleChange}
                placeholder="e.g. 20"
                type="number"
                min="1"
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Duration (minutes) <span className="required">*</span>
              </label>
              <input
                className="form-input"
                name="activityDuration"
                value={form.activityDuration}
                onChange={handleChange}
                placeholder="e.g. 45"
                type="number"
                min="5"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Difficulty Level</label>
            <select
              className="form-select"
              name="difficultyLevel"
              value={form.difficultyLevel}
              onChange={handleChange}
            >
              <option value="">Select difficulty</option>
              <option>Easy</option>
              <option>Intermediate</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Instructions</label>
            <textarea
              className="form-textarea"
              name="additionalInstructions"
              value={form.additionalInstructions}
              onChange={handleChange}
              placeholder="Special requirements, available materials, classroom setup, etc."
              rows={3}
            />
          </div>

          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <div className="action-bar">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? '⏳ Generating...' : '✨ Generate Activity'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              🗑 Reset
            </button>
          </div>
        </form>
      </div>

      {loading && <LoadingSpinner text="Designing your activity..." />}

      {result && (
        <ResultBox
          content={result}
          onSave={handleSave}
          onClear={() => setResult('')}
        />
      )}
    </div>
  )
}
