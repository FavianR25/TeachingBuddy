import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', icon: '🏠', label: 'Dashboard', end: true },
  { to: '/history', icon: '🕐', label: 'History' },
]

const toolItems = [
  { to: '/lesson-planner', icon: '📋', label: 'Lesson Planner' },
  { to: '/concept-explainer', icon: '💡', label: 'Concept Explainer' },
  { to: '/activity-generator', icon: '🎯', label: 'Activity Generator' },
  { to: '/quiz-worksheet', icon: '📝', label: 'Quiz & Worksheet' },
  { to: '/teacher-notes', icon: '✍️', label: 'Teacher Notes' },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <nav className={`app-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-logo">
          <div className="brand-icon">🎓</div>
          <div className="brand-text">
            <span className="brand-name">TeachBuddy AI</span>
            <span className="brand-tagline">Smart Teaching Companion</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        <div className="nav-section-label" style={{ marginTop: 8 }}>AI Tools</div>
        {toolItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        TeachBuddy AI &copy; {new Date().getFullYear()}
      </div>
    </nav>
  )
}
