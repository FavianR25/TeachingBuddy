import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import LessonPlanner from './pages/LessonPlanner/LessonPlanner'
import ConceptExplainer from './pages/ConceptExplainer/ConceptExplainer'
import ActivityGenerator from './pages/ActivityGenerator/ActivityGenerator'
import QuizWorksheet from './pages/QuizWorksheet/QuizWorksheet'
import TeacherNotes from './pages/TeacherNotes/TeacherNotes'
import History from './pages/History/History'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="lesson-planner" element={<LessonPlanner />} />
          <Route path="concept-explainer" element={<ConceptExplainer />} />
          <Route path="activity-generator" element={<ActivityGenerator />} />
          <Route path="quiz-worksheet" element={<QuizWorksheet />} />
          <Route path="teacher-notes" element={<TeacherNotes />} />
          <Route path="history" element={<History />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
