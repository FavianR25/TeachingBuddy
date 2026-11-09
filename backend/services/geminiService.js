import { GoogleGenAI } from '@google/genai';

let _client = null;

// Model available for AQ. (new 2026 auth keys) and AIza (legacy) keys
const MODEL = 'gemini-3.5-flash';

function getClient() {
  if (!_client) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set. Please add it to backend/.env');
    }
    _client = new GoogleGenAI({ apiKey });
  }
  return _client;
}

/**
 * Sends a prompt to the Gemini API using the official @google/genai SDK.
 * Supports both legacy AIza keys and new AQ. authentication keys (2026).
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generateContent(prompt) {
  const ai = getClient();

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error('Empty response received from Gemini API.');
  }

  return text;
}

/**
 * Quick ping to verify the API key and connection work.
 * @returns {Promise<{ok: boolean, model: string, message: string}>}
 */
export async function testConnection() {
  const ai = getClient();

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: 'Reply with exactly: OK',
    config: { maxOutputTokens: 10, temperature: 0 },
  });

  return {
    ok: true,
    model: MODEL,
    message: response.text?.trim() || 'Connected',
  };
}
