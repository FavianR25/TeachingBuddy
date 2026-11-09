import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import lessonPlannerRouter from './routes/lessonPlanner.js';
import conceptExplainerRouter from './routes/conceptExplainer.js';
import activityGeneratorRouter from './routes/activityGenerator.js';
import quizWorksheetRouter from './routes/quizWorksheet.js';
import teacherNotesRouter from './routes/teacherNotes.js';
import testConnectionRouter from './routes/testConnection.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TeachBuddy AI Backend is running' });
});

// Connection test (verifies Gemini API key works)
app.use('/api/test-connection', testConnectionRouter);

// AI Tool Routes
app.use('/api/lesson-planner', lessonPlannerRouter);
app.use('/api/concept-explainer', conceptExplainerRouter);
app.use('/api/activity-generator', activityGeneratorRouter);
app.use('/api/quiz-worksheet', quizWorksheetRouter);
app.use('/api/teacher-notes', teacherNotesRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`TeachBuddy AI Backend running on http://localhost:${PORT}`);
  console.log(`API Key configured: ${process.env.GEMINI_API_KEY ? 'Yes (' + process.env.GEMINI_API_KEY.slice(0, 6) + '...)' : 'NO - please set GEMINI_API_KEY in .env'}`);
});
