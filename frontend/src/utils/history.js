const HISTORY_KEY = 'teachbuddy_history'

export function getHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveToHistory({ tool, title, content, meta }) {
  try {
    const history = getHistory()
    const entry = {
      id: Date.now().toString(),
      tool,
      title,
      content,
      meta: meta || {},
      createdAt: new Date().toISOString(),
    }
    const updated = [entry, ...history].slice(0, 100) // max 100 entries
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
    return entry
  } catch {
    return null
  }
}

export function deleteHistoryEntry(id) {
  const history = getHistory()
  const updated = history.filter((e) => e.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
}

export function getHistoryCount() {
  return getHistory().length
}
