export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text)
}

export function formatDate(isoString) {
  const d = new Date(isoString)
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function truncate(text, length = 120) {
  if (!text) return ''
  return text.length > length ? text.slice(0, length) + '...' : text
}

export const TOOL_LABELS = {
  'lesson-planner': 'Lesson Planner',
  'concept-explainer': 'Concept Explainer',
  'activity-generator': 'Activity Generator',
  'quiz-worksheet': 'Quiz & Worksheet',
  'teacher-notes': 'Teacher Notes',
}

export const TOOL_ICONS = {
  'lesson-planner': '📋',
  'concept-explainer': '💡',
  'activity-generator': '🎯',
  'quiz-worksheet': '📝',
  'teacher-notes': '✍️',
}
