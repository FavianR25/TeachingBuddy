import { useState } from 'react'
import { generateLessonPlan } from '../../services/api'
import { saveToHistory } from '../../utils/history'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ResultBox from '../../components/ResultBox/ResultBox'

const initialForm = {
  subject: '',
  topic: '',
  studentAge: '',
  learningLevel: '',
  lessonDuration: '',
  learningObjectives: '',
  additionalInstructions: '',
}

export default function LessonPlanner() {
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
      const res = await generateLessonPlan(form)
      setResult(res.data.result)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate. Please try again.')
    }
    setLoading(false)
  }

  const handleSave = () => {
    saveToHistory({
      tool: 'lesson-planner',
      title: `${form.subject} — ${form.topic}`,
      content: result,
      meta: { subject: form.subject, topic: form.topic },
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
        <div className="page-header-icon">📋</div>
        <h1>AI Lesson Planner</h1>
        <p>Generate a structured, practical lesson plan tailored to your students.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Subject / Learning Area <span className="required">*</span>
              </label>
              <input
                className="form-input"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Python, Mathematics, Science"
                required
              />
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
                placeholder="e.g. Introduction to Variables"
                required
              />
            </div>
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
            <div className="form-group">
              <label className="form-label">
                Lesson Duration (minutes) <span className="required">*</span>
              </label>
              <input
                className="form-input"
                name="lessonDuration"
                value={form.lessonDuration}
                onChange={handleChange}
                placeholder="e.g. 60"
                type="number"
                min="10"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Learning Objectives</label>
            <textarea
              className="form-textarea"
              name="learningObjectives"
              value={form.learningObjectives}
              onChange={handleChange}
              placeholder="e.g. Students will understand what variables are and be able to declare and use them in Python."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Additional Instructions</label>
            <textarea
              className="form-textarea"
              name="additionalInstructions"
              value={form.additionalInstructions}
              onChange={handleChange}
              placeholder="Any special requirements, teaching style, classroom size, or extra notes..."
              rows={3}
            />
          </div>

          {error && (
            <div className="alert alert-error">⚠️ {error}</div>
          )}

          <div className="action-bar">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? '⏳ Generating...' : '✨ Generate Lesson Plan'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              🗑 Reset
            </button>
          </div>
        </form>
      </div>

      {loading && <LoadingSpinner text="Creating your lesson plan..." />}

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
