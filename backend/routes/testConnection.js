import { Router } from 'express';
import { testConnection } from '../services/geminiService.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await testConnection();
    res.json({
      status: 'connected',
      model: result.model,
      message: 'Gemini API is reachable and your API key is valid.',
      response: result.message,
    });
  } catch (error) {
    const msg = error.message || '';
    let hint = 'Check your GEMINI_API_KEY in backend/.env';

    if (msg.includes('401') || msg.includes('API_KEY_INVALID') || msg.includes('UNAUTHENTICATED')) {
      hint = 'Your API key is invalid or expired. Get a new key at https://aistudio.google.com/app/apikey';
    } else if (msg.includes('403') || msg.includes('PERMISSION_DENIED')) {
      hint = 'API key does not have permission. Ensure the Generative Language API is enabled in your Google Cloud project.';
    } else if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
      hint = 'Rate limit or quota exceeded. Wait a moment and try again.';
    } else if (msg.includes('GEMINI_API_KEY is not set')) {
      hint = 'No API key found. Add GEMINI_API_KEY=your_key to backend/.env';
    }

    res.status(503).json({
      status: 'error',
      message: 'Cannot connect to Gemini API.',
      error: msg,
      hint,
    });
  }
});

export default router;
