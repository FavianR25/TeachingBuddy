import { Router } from 'express';
import { generateContent } from '../services/geminiService.js';

const router = Router();

const PROGRAMMING_LANGUAGES = [
  'Python', 'C++', 'JavaScript', 'Java', 'HTML & CSS',
  'Scratch', 'Roblox Lua', 'MIT App Inventor'
];

router.post('/generate', async (req, res) => {
  try {
    const {
      subject, customSubject, concept,
      studentAge, learningLevel, additionalInstructions
    } = req.body;

    if (!subject || !concept || !studentAge || !learningLevel) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    const actualSubject = subject === 'Other / Custom Subject' ? (customSubject || 'General') : subject;
    const isProgramming = PROGRAMMING_LANGUAGES.includes(subject);

    const codeSection = isProgramming
      ? `4. CODE EXAMPLE
   - Provide a clear, working code example in ${actualSubject} that demonstrates the concept
   - The code MUST be written in ${actualSubject} ONLY — never use another programming language
   - Include a short explanation of what the code does
   - Keep the code beginner-friendly and well-commented`
      : `4. CODE EXAMPLE
   - This subject (${actualSubject}) does not require programming code
   - Write: "Not applicable for this subject."`;

    const prompt = `You are an expert teacher who excels at explaining difficult concepts simply. Explain the following concept for the specified audience:

Subject: ${actualSubject}
Concept or Topic: ${concept}
Student Age: ${studentAge} years old
Learning Level: ${learningLevel}
Additional Instructions: ${additionalInstructions || 'None'}

Generate a comprehensive concept explanation with ALL of the following sections:

1. SIMPLE EXPLANATION
   - Explain using beginner-friendly language for a ${studentAge}-year-old at ${learningLevel} level
   - Avoid unnecessarily complicated terminology
   - 3-5 sentences

2. REAL-LIFE ANALOGY
   - A relatable analogy a ${studentAge}-year-old would understand
   - Connect to everyday experiences

3. PRACTICAL EXAMPLE
   - A concrete, specific example relevant to ${actualSubject}
   - Walk through step by step

${codeSection}

5. PRACTICE CHALLENGE
   - One small, achievable exercise for ${learningLevel} level
   - Clear instructions the student can follow independently
   - Include a hint

Format with clear section headings.`;

    const result = await generateContent(prompt);
    res.json({ result });
  } catch (error) {
    console.error('Concept Explainer error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to generate explanation. Please try again.' });
  }
});

export default router;
