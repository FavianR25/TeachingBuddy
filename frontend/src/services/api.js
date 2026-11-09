import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 60000,
})

export const generateLessonPlan = (data) =>
  api.post('/lesson-planner/generate', data)

export const generateConceptExplanation = (data) =>
  api.post('/concept-explainer/generate', data)

export const generateActivity = (data) =>
  api.post('/activity-generator/generate', data)

export const generateQuizWorksheet = (data) =>
  api.post('/quiz-worksheet/generate', data)

export const generateTeacherNoteStructured = (data) =>
  api.post('/teacher-notes/generate-structured', data)

export const improveTeacherWriting = (data) =>
  api.post('/teacher-notes/improve-writing', data)

export default api
