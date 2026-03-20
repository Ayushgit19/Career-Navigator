import { generateFromGemini } from "../services/geminiServices.js";
import { extractTextFromFile } from "../utils/fileParser.js";

export async function careerChat(req, res) {
  try {
    const { messages, role, experience, focus } = req.body;

    const chatText = messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `
You are an AI Career Mentor.

User profile:
Role: ${role}
Experience: ${experience}
Focus: ${focus}

Conversation:
${chatText}

IMPORTANT RULES:
- Answer in clean markdown
- Use headings
- Use bullet points
- Keep answers structured
- Do NOT write long paragraphs
- Use sections like:
  ## Advice
  ## Steps
  ## Tips
  ## Example

Reply as mentor.
`;

    const reply = await generateFromGemini(prompt);

    res.json({ reply });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Resume analysis
export async function resumeAnalysis(req, res) {
  try {
    let resumeText = req.body.resumeText;
    console.log("resumeText:", resumeText);       // 👈
    console.log("file:", req.file);

    // if file uploaded
    if (req.file) {
      resumeText = await extractTextFromFile(req.file);
    }

    console.log("Parsed the resume")

    const prompt = `
Analyze this resume:

${resumeText}

Give ATS suggestions, improvements, and missing skills.
`;

    const text = await generateFromGemini(prompt);

    res.json({ response: text });
  } catch (err) {
    console.error("resumeAnalysis error:", err);
    res.status(500).json({ error: err.message });
  }
}

// interview prep
export async function interviewPrep(req, res) {
  try {
    const { role, company, size } = req.body;

    const prompt = `
Role: ${role}
Company: ${company}
Size: ${size}

Generate interview questions.
`;

    const text = await generateFromGemini(prompt);

    res.json({ response: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// skill gap
export async function skillGap(req, res) {
  try {
    const { role, skills } = req.body;
    console.log("Received:", { role, skills }); // 👈 add this
    console.log("API Key:", process.env.GEMINI_API_KEY); // 👈 add this

    const prompt = `
Target role: ${role}
Current skills: ${skills}
Give skill gap analysis.
`;

    const text = await generateFromGemini(prompt);
    res.json({ response: text });
  } catch (err) {
    console.error("skillGap error:", err); // 👈 add this
    res.status(500).json({ error: err.message });
  }
}