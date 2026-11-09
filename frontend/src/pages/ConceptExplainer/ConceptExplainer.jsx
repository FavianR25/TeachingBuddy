import { useState } from 'react'
import { generateConceptExplanation } from '../../services/api'
import { saveToHistory } from '../../utils/history'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ResultBox from '../../components/ResultBox/ResultBox'

const SUBJECTS = [
  'Python', 'C++', 'JavaScript', 'Java', 'HTML & CSS',
  'Scratch', 'Roblox Lua', 'MIT App Inventor',
  'STEM & Science', 'Mathematics', 'Other / Custom Subject',
]

const initialForm = {
  subject: '',
  customSubject: '',
  concept: '',
  studentAge: '',
  learningLevel: '',
  additionalInstructions: '',
}

export default function ConceptExplainer() {
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
    if (form.subject === 'Other / Custom Subject' && !form.customSubject.trim()) {
      setError('Please enter your custom subject.')
      return
    }
    setLoading(true)
    try {
      const res = await generateConceptExplanation(form)
      setResult(res.data.result)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate. Please try again.')
    }
    setLoading(false)
  }

  const handleSave = () => {
    const subjectLabel = form.subject === 'Other / Custom Subject' ? form.customSubject : form.subject
    saveToHistory({
      tool: 'concept-explainer',
      title: `${subjectLabel} — ${form.concept}`,
      content: result,
      meta: { subject: subjectLabel, concept: form.concept },
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
        <div className="page-header-icon">💡</div>
        <h1>AI Concept Explainer</h1>
        <p>Turn complex concepts into simple, engaging explanations with examples and analogies.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Subject / Learning Area <span className="required">*</span>
              </label>
              <select
                className="form-select"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select subject</option>
                {SUBJECTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            {form.subject === 'Other / Custom Subject' && (
              <div className="form-group">
                <label className="form-label">
                  Custom Subject <span className="required">*</span>
                </label>
                <input
                  className="form-input"
                  name="customSubject"
                  value={form.customSubject}
                  onChange={handleChange}
                  placeholder="e.g. Geography, Music, History"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Concept or Topic <span className="required">*</span>
            </label>
            <input
              className="form-input"
              name="concept"
              value={form.concept}
              onChange={handleChange}
              placeholder="e.g. For Loops, Variables, Photosynthesis, Fractions"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Student Age <span className="required">*</span>
              </label>
              <input
                className="form-input"
                name="studentAge"
                value={form.studentAge}
                onChange={handleChange}
                placeholder="e.g. 12"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Learning Level <span className="required">*</span>
              </label>
              <select
                className="form-select"
                name="learningLevel"
                value={form.learningLevel}
                onChange={handleChange}
                required
              >
                <option value="">Select level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Instructions</label>
            <textarea
              className="form-textarea"
              name="additionalInstructions"
              value={form.additionalInstructions}
              onChange={handleChange}
              placeholder="Any special focus, learning goals, or extra notes..."
              rows={3}
            />
          </div>

          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <div className="action-bar">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? '⏳ Generating...' : '✨ Explain Concept'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              🗑 Reset
            </button>
          </div>
        </form>
      </div>

      {loading && <LoadingSpinner text="Building your explanation..." />}

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
