import { Router } from 'express';
import { generateContent } from '../services/geminiService.js';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const {
      activityType, subject, topic, studentAge,
      numberOfStudents, activityDuration, difficultyLevel, additionalInstructions
    } = req.body;

    if (!activityType || !subject || !topic || !studentAge || !activityDuration) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    const prompt = `You are a creative educational activity designer. Design an engaging, practical classroom activity:

Activity Type: ${activityType}
Subject / Platform: ${subject}
Topic: ${topic}
Student Age: ${studentAge} years old
Number of Students: ${numberOfStudents || 'Not specified'}
Activity Duration: ${activityDuration} minutes
Difficulty Level: ${difficultyLevel || 'Intermediate'}
Additional Instructions: ${additionalInstructions || 'None'}

Generate a complete, ready-to-use activity with ALL of the following sections:

1. ACTIVITY TITLE
   - A creative and descriptive title

2. ACTIVITY OVERVIEW
   - Brief description of what this activity is about (2-3 sentences)

3. LEARNING OBJECTIVES
   - 3-4 specific things students will learn or be able to do

4. REQUIRED MATERIALS
   - Complete list of everything needed with quantities

5. STEP-BY-STEP INSTRUCTIONS
   - Numbered steps the teacher can follow directly
   - Include timing suggestions for each step

6. EXPECTED STUDENT RESULTS
   - What students should produce or demonstrate by the end

7. OPTIONAL CHALLENGE / EXTENSION
   - One additional challenge for students who finish early

Requirements:
- Activity MUST be safe and suitable for ${studentAge}-year-old students
- Must realistically fit within ${activityDuration} minutes
- Match the type: ${activityType}

Format with clear section headings and numbered steps.`;

    const result = await generateContent(prompt);
    res.json({ result });
  } catch (error) {
    console.error('Activity Generator error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to generate activity. Please try again.' });
  }
});

export default router;
