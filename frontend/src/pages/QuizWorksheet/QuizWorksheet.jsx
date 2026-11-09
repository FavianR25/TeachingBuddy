import { useState } from 'react'
import { generateQuizWorksheet } from '../../services/api'
import { saveToHistory } from '../../utils/history'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ResultBox from '../../components/ResultBox/ResultBox'

const initialForm = {
  subject: '',
  topic: '',
  studentAge: '',
  learningLevel: '',
  questionType: '',
  numberOfQuestions: '',
  difficultyLevel: '',
  additionalInstructions: '',
}

export default function QuizWorksheet() {
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
      const res = await generateQuizWorksheet(form)
      setResult(res.data.result)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate. Please try again.')
    }
    setLoading(false)
  }

  const handleSave = () => {
    saveToHistory({
      tool: 'quiz-worksheet',
      title: `${form.subject} — ${form.topic} (${form.questionType})`,
      content: result,
      meta: { subject: form.subject, topic: form.topic, questionType: form.questionType },
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
        <div className="page-header-icon">📝</div>
        <h1>AI Quiz &amp; Worksheet Generator</h1>
        <p>Create complete quizzes and worksheets with questions and answer keys.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Subject <span className="required">*</span>
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
                placeholder="e.g. Variables and Data Types"
                required
              />
            </div>
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
                placeholder="e.g. 13"
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

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Question Type <span className="required">*</span>
              </label>
              <select
                className="form-select"
                name="questionType"
                value={form.questionType}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option>Multiple Choice</option>
                <option>True or False</option>
                <option>Short Answer</option>
                <option>Fill in the Blanks</option>
                <option>Mixed Questions</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                Number of Questions <span className="required">*</span>
              </label>
              <input
                className="form-input"
                name="numberOfQuestions"
                value={form.numberOfQuestions}
                onChange={handleChange}
                placeholder="e.g. 10"
                type="number"
                min="1"
                max="50"
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
              <option>Medium</option>
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
              placeholder="e.g. Focus on practical coding scenarios, include real-world examples..."
              rows={3}
            />
          </div>

          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <div className="action-bar">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? '⏳ Generating...' : '✨ Generate Quiz & Worksheet'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              🗑 Reset
            </button>
          </div>
        </form>
      </div>

      {loading && <LoadingSpinner text="Creating your quiz and worksheet..." />}

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
