import { Link } from 'react-router-dom'
import { getHistory } from '../../utils/history'
import { formatDate, TOOL_LABELS, TOOL_ICONS } from '../../utils/helpers'

const tools = [
  {
    to: '/lesson-planner',
    icon: '📋',
    title: 'AI Lesson Planner',
    desc: 'Create structured, ready-to-use lesson plans tailored to your subject, topic, and student level.',
    tag: 'Planning',
    tagBg: '#F0FDFA',
    tagColor: '#0F9488',
  },
  {
    to: '/concept-explainer',
    icon: '💡',
    title: 'AI Concept Explainer',
    desc: 'Explain difficult concepts with simple language, real-life analogies, examples, and code samples.',
    tag: 'Teaching',
    tagBg: '#EFF6FF',
    tagColor: '#1D4ED8',
  },
  {
    to: '/activity-generator',
    icon: '🎯',
    title: 'AI Activity Generator',
    desc: 'Generate creative coding challenges, STEM experiments, classroom games, and group activities.',
    tag: 'Activities',
    tagBg: '#FFF7ED',
    tagColor: '#C2410C',
  },
  {
    to: '/quiz-worksheet',
    icon: '📝',
    title: 'AI Quiz & Worksheet',
    desc: 'Build quizzes and worksheets with multiple question formats and automatic answer keys.',
    tag: 'Assessment',
    tagBg: '#F0FDF4',
    tagColor: '#15803D',
  },
  {
    to: '/teacher-notes',
    icon: '✍️',
    title: 'AI Teacher Notes',
    desc: 'Write professional student progress reports or instantly improve your rough notes.',
    tag: 'Reporting',
    tagBg: '#FDF4FF',
    tagColor: '#7E22CE',
  },
]

export default function Dashboard() {
  const history = getHistory()
  const recentHistory = history.slice(0, 4)

  return (
    <div>
      {/* Hero Banner */}
      <div className="dashboard-hero">
        <div className="hero-badge">🎓 Powered by Google Gemini AI</div>
        <h1>Welcome to TeachBuddy AI</h1>
        <p>
          Your Smart Teaching Companion — save time on lesson planning, concept explanations,
          activities, quizzes, and student reports.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">5</span>
            <span className="hero-stat-label">AI Tools</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{history.length}</span>
            <span className="hero-stat-label">Generated</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">∞</span>
            <span className="hero-stat-label">Possibilities</span>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="stat-chips">
        <div className="stat-chip">
          <span className="stat-chip-icon">📋</span>
          <div>
            <div className="stat-chip-value">Lesson Plans</div>
            <div className="stat-chip-label">Structured &amp; Practical</div>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip-icon">💡</span>
          <div>
            <div className="stat-chip-value">Explanations</div>
            <div className="stat-chip-label">With Code Examples</div>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip-icon">📝</span>
          <div>
            <div className="stat-chip-value">Quizzes</div>
            <div className="stat-chip-label">Auto Answer Keys</div>
          </div>
        </div>
        <div className="stat-chip">
          <span className="stat-chip-icon">✍️</span>
          <div>
            <div className="stat-chip-value">Teacher Notes</div>
            <div className="stat-chip-label">Professional Reports</div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="section-title">🛠️ AI Teaching Tools</div>
      <div className="tools-grid">
        {tools.map((tool) => (
          <Link key={tool.to} to={tool.to} className="tool-card">
            <span className="tool-card-arrow">→</span>
            <div className="tool-card-icon">{tool.icon}</div>
            <div className="tool-card-title">{tool.title}</div>
            <div className="tool-card-desc">{tool.desc}</div>
            <span
              className="tool-card-tag"
              style={{ background: tool.tagBg, color: tool.tagColor }}
            >
              {tool.tag}
            </span>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      {recentHistory.length > 0 && (
        <div>
          <div className="recent-section-header">
            <div className="section-title" style={{ marginBottom: 0 }}>🕐 Recent Activity</div>
            <Link to="/history" className="btn btn-secondary btn-sm">View All →</Link>
          </div>
          {recentHistory.map((entry) => (
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
              </div>
              <div className="history-preview">{entry.content}</div>
            </div>
          ))}
        </div>
      )}

      {/* Empty CTA */}
      {recentHistory.length === 0 && (
        <div className="cta-card">
          <span className="cta-card-icon">🚀</span>
          <h3>Ready to get started?</h3>
          <p>Choose an AI tool above to generate your first teaching material.</p>
          <Link to="/lesson-planner" className="btn btn-primary">
            Create Lesson Plan →
          </Link>
        </div>
      )}

      {/* Responsible AI Notice */}
      <div className="ai-notice" style={{ marginTop: 28 }}>
        <span className="ai-notice-icon">⚠️</span>
        <div>
          <strong>Responsible AI Reminder:</strong> All AI-generated content is a suggestion.
          Teachers should review and adapt materials before use. Do not include real student personal
          data in AI prompts. AI-generated teacher notes should accurately reflect only what was
          provided — the AI never invents student achievements.
        </div>
      </div>
    </div>
  )
}
