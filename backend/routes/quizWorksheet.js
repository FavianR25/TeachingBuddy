import { Router } from 'express';
import { generateContent } from '../services/geminiService.js';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const {
      subject, topic, studentAge, learningLevel,
      questionType, numberOfQuestions, difficultyLevel, additionalInstructions
    } = req.body;

    if (!subject || !topic || !studentAge || !learningLevel || !questionType || !numberOfQuestions) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    const prompt = `You are an expert educational assessment designer. Create a complete quiz and worksheet:

Subject: ${subject}
Topic: ${topic}
Student Age: ${studentAge} years old
Learning Level: ${learningLevel}
Question Type: ${questionType}
Number of Questions: ${numberOfQuestions}
Difficulty Level: ${difficultyLevel || 'Medium'}
Additional Instructions: ${additionalInstructions || 'None'}

Generate a complete quiz with the following structure:

═══════════════════════════════════════
STUDENT WORKSHEET
═══════════════════════════════════════

1. WORKSHEET TITLE

2. STUDENT INSTRUCTIONS
   - Clear, simple instructions for students

3. QUESTIONS
   - Generate exactly ${numberOfQuestions} questions
   - Type: ${questionType}
   ${questionType === 'Multiple Choice' ? '- Provide 4 options (A, B, C, D) per question' : ''}
   ${questionType === 'True or False' ? '- State each question so students mark True or False' : ''}
   ${questionType === 'Fill in the Blanks' ? '- Use ___ for blanks in sentences' : ''}
   ${questionType === 'Mixed Questions' ? '- Mix multiple choice, true/false, and short answer questions' : ''}

═══════════════════════════════════════
ANSWER KEY (TEACHER COPY)
═══════════════════════════════════════

4. ANSWER KEY
   - Correct answer for every question, numbered to match

5. ANSWER EXPLANATIONS
   - 1-2 sentence explanation for each answer

Requirements:
- ALL questions directly relevant to "${topic}" in "${subject}"
- Age-appropriate for ${studentAge}-year-old students
- Difficulty: ${difficultyLevel || 'Medium'}
- No ambiguous questions
- No repeated questions

Clearly separate the Student Worksheet from the Answer Key.`;

    const result = await generateContent(prompt);
    res.json({ result });
  } catch (error) {
    console.error('Quiz Worksheet error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to generate quiz. Please try again.' });
  }
});

export default router;
