import { Router } from 'express';
import { generateContent } from '../services/geminiService.js';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const {
      subject, topic, studentAge, learningLevel,
      lessonDuration, learningObjectives, additionalInstructions
    } = req.body;

    if (!subject || !topic || !studentAge || !learningLevel || !lessonDuration) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    const prompt = `You are an expert educational curriculum designer. Create a detailed, practical, and structured lesson plan based on the following information:

Subject / Learning Area: ${subject}
Topic: ${topic}
Student Age: ${studentAge}
Student Learning Level: ${learningLevel}
Lesson Duration: ${lessonDuration} minutes
Learning Objectives: ${learningObjectives || 'Not specified'}
Additional Instructions: ${additionalInstructions || 'None'}

Generate a complete lesson plan with the following sections. Use clear headings for each section:

1. LESSON OVERVIEW
   - Brief summary of the lesson (2-3 sentences)

2. LEARNING OBJECTIVES
   - List 3-5 specific, measurable learning objectives using action verbs

3. REQUIRED MATERIALS
   - List all materials, tools, or resources needed

4. LESSON INTRODUCTION (${Math.round(Number(lessonDuration) * 0.15)} minutes)
   - How to introduce and engage students with the topic
   - Hook or warm-up activity

5. MAIN LEARNING ACTIVITIES (${Math.round(Number(lessonDuration) * 0.45)} minutes)
   - Step-by-step main teaching activities
   - Explanations and demonstrations

6. PRACTICE / HANDS-ON ACTIVITIES (${Math.round(Number(lessonDuration) * 0.25)} minutes)
   - Practical exercises students will do
   - How to guide student practice

7. ASSESSMENT
   - How to assess student understanding
   - Questions or mini-tasks to check comprehension

8. LESSON CONCLUSION (${Math.round(Number(lessonDuration) * 0.15)} minutes)
   - How to wrap up the lesson
   - Recap key points

Important requirements:
- Adapt difficulty to ${studentAge}-year-old students at ${learningLevel} level
- Make activities practical and realistic for the classroom
- Ensure activities match the subject "${subject}" and topic "${topic}"
- Total lesson fits within ${lessonDuration} minutes

Format with clear section headings and bullet points.`;

    const result = await generateContent(prompt);
    res.json({ result });
  } catch (error) {
    console.error('Lesson Planner error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to generate lesson plan. Please try again.' });
  }
});

export default router;
