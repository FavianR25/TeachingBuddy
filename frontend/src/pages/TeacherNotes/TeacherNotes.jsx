import { useState } from 'react'
import { generateTeacherNoteStructured, improveTeacherWriting } from '../../services/api'
import { saveToHistory } from '../../utils/history'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import ResultBox from '../../components/ResultBox/ResultBox'

const REPORT_TYPES = [
  'Regular Coding Class (Individual Student)',
  'Regular STEM Class (Individual Student)',
  'Full Coding Class (Group)',
  'Full STEM Class (Group)',
  'Milestone Certificate',
]

const MILESTONE_TYPES = [
  'Milestone Project',
  'Debugging Project',
  'Teacher Note',
]

const isIndividual = (rt) =>
  rt === 'Regular Coding Class (Individual Student)' ||
  rt === 'Regular STEM Class (Individual Student)' ||
  (rt === 'Milestone Certificate')

const initialStructured = {
  reportType: '',
  milestoneType: '',
  studentName: '',
  pronoun: 'He',
  platform: '',
  topicProject: '',
  activitiesProgress: '',
  additionalInfo: '',
}

const initialImprove = {
  originalText: '',
  pronoun: '',
  studentName: '',
}

export default function TeacherNotes() {
  const [mode, setMode] = useState('structured') // 'structured' | 'improve'

  // Structured mode state
  const [structuredForm, setStructuredForm] = useState(initialStructured)

  // Improve mode state
  const [improveForm, setImproveForm] = useState(initialImprove)

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleStructuredChange = (e) => {
    setStructuredForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleImproveChange = (e) => {
    setImproveForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleStructuredSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult('')
    if (
      structuredForm.reportType === 'Milestone Certificate' &&
      !structuredForm.milestoneType
    ) {
      setError('Please select a Milestone Type.')
      return
    }
    setLoading(true)
    try {
      const res = await generateTeacherNoteStructured(structuredForm)
      setResult(res.data.result)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate. Please try again.')
    }
    setLoading(false)
  }

  const handleImproveSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult('')
    setLoading(true)
    try {
      const res = await improveTeacherWriting(improveForm)
      setResult(res.data.result)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to improve writing. Please try again.')
    }
    setLoading(false)
  }

  const handleSave = () => {
    const title =
      mode === 'structured'
        ? `${structuredForm.reportType}${structuredForm.studentName ? ' — ' + structuredForm.studentName : ''}`
        : `Improved Note${improveForm.studentName ? ' — ' + improveForm.studentName : ''}`
    saveToHistory({
      tool: 'teacher-notes',
      title,
      content: result,
      meta: { mode },
    })
    alert('✅ Saved to History!')
  }

  const handleClear = () => {
    setResult('')
    setError('')
    if (mode === 'structured') setStructuredForm(initialStructured)
    else setImproveForm(initialImprove)
  }

  const showNameField = isIndividual(structuredForm.reportType)

  return (
    <div>
      <div className="page-header">
        <div className="page-header-icon">✍️</div>
        <h1>AI Teacher Notes</h1>
        <p>Write professional student progress reports or improve your rough notes instantly.</p>
      </div>

      {/* Mode Switch */}
      <div className="mode-tabs">
        <button
          className={`mode-tab ${mode === 'structured' ? 'active' : ''}`}
          onClick={() => { setMode('structured'); setResult(''); setError('') }}
        >
          📋 Structured Mode
        </button>
        <button
          className={`mode-tab ${mode === 'improve' ? 'active' : ''}`}
          onClick={() => { setMode('improve'); setResult(''); setError('') }}
        >
          ✏️ Improve My Writing
        </button>
      </div>

      {/* ——— MODE A: Structured ——— */}
      {mode === 'structured' && (
        <div className="card">
          <div className="alert alert-info" style={{ marginBottom: 20 }}>
            💡 Fill in the fields below and the AI will generate a professional teacher note following the correct template.
          </div>
          <form onSubmit={handleStructuredSubmit}>
            <div className="form-group">
              <label className="form-label">
                Report Type <span className="required">*</span>
              </label>
              <select
                className="form-select"
                name="reportType"
                value={structuredForm.reportType}
                onChange={handleStructuredChange}
                required
              >
                <option value="">Select report type</option>
                {REPORT_TYPES.map((rt) => (
                  <option key={rt}>{rt}</option>
                ))}
              </select>
            </div>

            {/* Milestone subcategory */}
            {structuredForm.reportType === 'Milestone Certificate' && (
              <div className="form-group milestone-sub">
                <label className="form-label">
                  Milestone Type <span className="required">*</span>
                </label>
                <select
                  className="form-select"
                  name="milestoneType"
                  value={structuredForm.milestoneType}
                  onChange={handleStructuredChange}
                  required
                >
                  <option value="">Select milestone type</option>
                  {MILESTONE_TYPES.map((mt) => (
                    <option key={mt}>{mt}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Individual student fields */}
            {showNameField && (
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Student Name {structuredForm.reportType !== 'Full Coding Class (Group)' && structuredForm.reportType !== 'Full STEM Class (Group)' ? '' : '(optional)'}
                  </label>
                  <input
                    className="form-input"
                    name="studentName"
                    value={structuredForm.studentName}
                    onChange={handleStructuredChange}
                    placeholder="e.g. Leonardo"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Pronoun</label>
                  <select
                    className="form-select"
                    name="pronoun"
                    value={structuredForm.pronoun}
                    onChange={handleStructuredChange}
                  >
                    <option>He</option>
                    <option>She</option>
                    <option>They</option>
                  </select>
                </div>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Platform / Subject <span className="required">*</span>
                </label>
                <input
                  className="form-input"
                  name="platform"
                  value={structuredForm.platform}
                  onChange={handleStructuredChange}
                  placeholder="e.g. Scratch, Python, JavaScript, STEM"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Topic / Project <span className="required">*</span>
                </label>
                <input
                  className="form-input"
                  name="topicProject"
                  value={structuredForm.topicProject}
                  onChange={handleStructuredChange}
                  placeholder="e.g. Introduction to Loops, Paddle Boat"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Activities / Progress <span className="required">*</span>
              </label>
              <textarea
                className="form-textarea"
                name="activitiesProgress"
                value={structuredForm.activitiesProgress}
                onChange={handleStructuredChange}
                placeholder="Describe what the student(s) did, practiced, created, or learned during this session..."
                rows={4}
                required
              />
              <div className="form-hint">Describe activities in your own words — the AI will improve and format them.</div>
            </div>

            <div className="form-group">
              <label className="form-label">Additional Information</label>
              <textarea
                className="form-textarea"
                name="additionalInfo"
                value={structuredForm.additionalInfo}
                onChange={handleStructuredChange}
                placeholder="Any extra details, achievements, challenges, or notes..."
                rows={3}
              />
            </div>

            {error && <div className="alert alert-error">⚠️ {error}</div>}

            <div className="action-bar">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? '⏳ Generating...' : '✨ Generate Teacher Note'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleClear}>
                🗑 Reset
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ——— MODE B: Improve My Writing ——— */}
      {mode === 'improve' && (
        <div className="card">
          <div className="alert alert-info" style={{ marginBottom: 20 }}>
            ✏️ Paste your rough teacher notes below. The AI will correct grammar, improve the language, and make it professional — without changing the meaning.
          </div>
          <form onSubmit={handleImproveSubmit}>
            <div className="form-group">
              <label className="form-label">
                Your Original Notes <span className="required">*</span>
              </label>
              <textarea
                className="form-textarea"
                name="originalText"
                value={improveForm.originalText}
                onChange={handleImproveChange}
                placeholder={'e.g. "today leonardo learn javascript function and conditional. he try make program using if else and function."'}
                rows={6}
                required
              />
              <div className="form-hint">Write naturally — spelling mistakes, incomplete sentences, and informal language are fine.</div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Student Name (optional)</label>
                <input
                  className="form-input"
                  name="studentName"
                  value={improveForm.studentName}
                  onChange={handleImproveChange}
                  placeholder="e.g. Leonardo"
                />
                <div className="form-hint">Leave blank if the name is already in your notes.</div>
              </div>
              <div className="form-group">
                <label className="form-label">Pronoun (optional)</label>
                <select
                  className="form-select"
                  name="pronoun"
                  value={improveForm.pronoun}
                  onChange={handleImproveChange}
                >
                  <option value="">Auto-detect</option>
                  <option>He</option>
                  <option>She</option>
                  <option>They</option>
                </select>
              </div>
            </div>

            {error && <div className="alert alert-error">⚠️ {error}</div>}

            <div className="action-bar">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? '⏳ Improving...' : '✨ Improve My Writing'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleClear}>
                🗑 Reset
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && (
        <LoadingSpinner
          text={mode === 'improve' ? 'Improving your writing...' : 'Generating teacher note...'}
        />
      )}

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
