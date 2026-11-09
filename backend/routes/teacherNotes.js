import { Router } from 'express';
import { generateContent } from '../services/geminiService.js';

const router = Router();

// MODE A — Structured Teacher Notes
router.post('/generate-structured', async (req, res) => {
  try {
    const {
      reportType, milestoneType, studentName, pronoun,
      platform, topicProject, activitiesProgress, additionalInfo
    } = req.body;

    if (!reportType || !platform || !topicProject || !activitiesProgress) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    const He = pronoun === 'She' ? 'She' : pronoun === 'They' ? 'They' : 'He';
    const His = pronoun === 'She' ? 'Her' : pronoun === 'They' ? 'Their' : 'His';
    const name = studentName || 'the student';

    let prompt = '';

    if (reportType === 'Regular Coding Class (Individual Student)') {
      prompt = `Write a concise, professional teacher note for a parent about a student's coding class.

Student Name: ${name}
Pronoun: ${He}/${His}
Platform: ${platform}
Topic: ${topicProject}
Activities / Progress: ${activitiesProgress}
Additional Info: ${additionalInfo || 'None'}

Follow this template:
"Materi: ${platform} – ${topicProject}

Today, ${name} continued learning [topic/material]. ${He} practiced [specific activities from input] and learned how to [skills or outcomes]. ${He} did a great job today!"

Rules:
- Keep to 2-3 sentences + closing sentence
- Use ${He}/${His} pronouns
- Preserve all technical terms from the input
- NEVER invent activities not in the input
- Output the note only — no extra commentary`;

    } else if (reportType === 'Regular STEM Class (Individual Student)') {
      prompt = `Write a concise, professional teacher note for a parent about a student's STEM class.

Student Name: ${name}
Pronoun: ${He}/${His}
STEM Topic: ${topicProject}
Activities / Progress: ${activitiesProgress}
Additional Info: ${additionalInfo || 'None'}

Follow this template:
"Materi: STEM – ${topicProject}

Today, ${name} learned about [STEM concept] through [activity]. ${He} explored how [scientific concept] and practiced [hands-on activity from input]. ${He} did a great job today!"

Rules:
- Keep to 2-3 sentences + closing sentence
- Use ${He}/${His} pronouns
- Preserve all STEM terms
- NEVER invent activities not in the input
- Output the note only`;

    } else if (reportType === 'Full Coding Class (Group)') {
      prompt = `Write a concise, professional teacher note for parents about a group coding class.

Platform: ${platform}
Topic: ${topicProject}
Activities / Progress: ${activitiesProgress}
Additional Info: ${additionalInfo || 'None'}

Follow this template:
"Materi: ${platform} – ${topicProject}

Today, students learned about [topic] using [platform]. They practiced [activities from input] and explored how to [outcomes]. They did a great job today!"

Rules:
- Write for the whole group using "students" and "they"
- Keep to 2-3 sentences + closing
- Preserve all coding terms
- NEVER invent activities not in the input
- Output the note only`;

    } else if (reportType === 'Full STEM Class (Group)') {
      prompt = `Write a concise, professional teacher note for parents about a group STEM class.

STEM Topic: ${topicProject}
Activities / Progress: ${activitiesProgress}
Additional Info: ${additionalInfo || 'None'}

Follow this template:
"Materi: STEM – ${topicProject}

Today, students learned about [concept] through a hands-on activity. They explored [what they observed from input] and discovered how [outcome]. They did a great job today!"

Rules:
- Write for the whole group using "students" and "they"
- Keep to 2-3 sentences + closing
- Preserve all STEM terms
- NEVER invent activities not in the input
- Output the note only`;

    } else if (reportType === 'Milestone Certificate') {
      if (!milestoneType) {
        return res.status(400).json({ error: 'Please select a Milestone Type.' });
      }

      if (milestoneType === 'Milestone Project') {
        prompt = `Write a milestone certificate description.

Platform: ${platform}
Project: ${topicProject}
Project Details: ${activitiesProgress}
Additional Info: ${additionalInfo || 'None'}

Template:
"To create [project name/type] using ${platform}, where [main objective and features from the input]."

Rules: 1-2 sentences. Output only the certificate text.`;

      } else if (milestoneType === 'Debugging Project') {
        prompt = `Write a debugging milestone certificate description.

Platform: ${platform}
Project: ${topicProject}
Features to debug: ${activitiesProgress}

Template:
"To test and fix errors in the project to ensure that [main features from input] work correctly."

Rules: 1-2 sentences. Output only the certificate text.`;

      } else if (milestoneType === 'Teacher Note') {
        prompt = `Write a milestone congratulatory teacher note.

Student Name: ${name}
Pronoun: ${He}/${His}
Platform: ${platform}
Project: ${topicProject}
Achievements: ${activitiesProgress}
Additional Info: ${additionalInfo || 'None'}

Template:
"Congratulations on completing your ${platform} milestone, ${name}! In this project, ${name} created [project description and features from input]. ${He} demonstrated [skills/creativity/problem-solving] throughout the development process. Great job, ${name}!"

Rules:
- 3-4 sentences
- Use ${He}/${His} pronouns
- Reference actual project details from input
- NEVER invent achievements not in input
- Output the note only`;

      } else {
        return res.status(400).json({ error: 'Invalid milestone type.' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid report type.' });
    }

    const result = await generateContent(prompt);
    res.json({ result });
  } catch (error) {
    console.error('Teacher Notes (Structured) error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to generate teacher note. Please try again.' });
  }
});

// MODE B — Improve My Writing
router.post('/improve-writing', async (req, res) => {
  try {
    const { originalText, pronoun, studentName } = req.body;

    if (!originalText || originalText.trim().length < 5) {
      return res.status(400).json({ error: 'Please enter your original notes to improve.' });
    }

    const pronounInfo = pronoun
      ? `Use this pronoun for the student: ${pronoun}`
      : 'Infer the pronoun from the text, or use they/them if unclear.';

    const nameInfo = studentName
      ? `Student name: ${studentName}`
      : 'Use the name in the text if present.';

    const prompt = `You are a professional teacher note editor. Improve the following rough teacher notes into professional, natural English suitable for parents.

Original notes:
"${originalText.trim()}"

${nameInfo}
${pronounInfo}

Rules:
1. Correct all grammar, spelling, punctuation, and capitalization errors
2. Improve sentence structure and readability
3. Sound natural and professional — warm but not overly formal
4. NEVER invent activities, achievements, or learning outcomes not in the original
5. NEVER add information not present in the original
6. Preserve ALL technical terms, programming concepts, and STEM concepts exactly
7. Use the student's name (not "you" or "your child")
8. Write in past tense
9. Keep concise: 2-3 main sentences + closing sentence like "He/She/They did a great job today!"
10. Use the specified pronoun consistently

Output ONLY the improved note. No explanations, no comments about changes — just the final clean text.`;

    const result = await generateContent(prompt);
    res.json({ result });
  } catch (error) {
    console.error('Teacher Notes (Improve) error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to improve writing. Please try again.' });
  }
});

export default router;
