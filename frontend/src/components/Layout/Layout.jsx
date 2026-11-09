import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

const routeMeta = {
  '/':                    { title: 'Dashboard',             subtitle: 'Overview of all your AI teaching tools' },
  '/lesson-planner':      { title: 'AI Lesson Planner',     subtitle: 'Generate structured lesson plans in seconds' },
  '/concept-explainer':   { title: 'AI Concept Explainer',  subtitle: 'Break down difficult concepts simply' },
  '/activity-generator':  { title: 'AI Activity Generator', subtitle: 'Create engaging classroom activities' },
  '/quiz-worksheet':      { title: 'AI Quiz & Worksheet',   subtitle: 'Build quizzes and worksheets with answer keys' },
  '/teacher-notes':       { title: 'AI Teacher Notes',      subtitle: 'Write professional student progress reports' },
  '/history':             { title: 'History',               subtitle: 'Browse your previously generated content' },
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const meta = routeMeta[location.pathname] || { title: 'TeachBuddy AI', subtitle: '' }

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile hamburger */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <header className="app-topbar">
          <div className="topbar-left">
            <div className="topbar-title">{meta.title}</div>
            <div className="topbar-subtitle">{meta.subtitle}</div>
          </div>
          <div className="topbar-badge">
            ✨ Powered by Gemini AI
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
