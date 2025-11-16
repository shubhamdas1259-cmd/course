const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const client = new OpenAIApi(configuration);

// A simple endpoint to create a course summary from description + lessons content
async function summarizeCourse(req, res) {
  const { title, description, lessons } = req.body;
  if (!description && !lessons) return res.status(400).json({ error: 'description or lessons required' });

  const prompt = `Create a concise, marketing-friendly 2-3 sentence summary and 3 bullet learning outcomes for this course.
TITLE: ${title || 'Untitled'}
DESCRIPTION: ${description || ''}
LESSONS: ${Array.isArray(lessons) ? lessons.map(l => l.title + ': ' + (l.content || '')).join('\n') : ''}
Return JSON with {summary, outcomes: ["...","...","..."]}.`;

  try {
    const completion = await client.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 250,
      temperature: 0.7
    });
    const text = completion.data.choices[0].text.trim();
    // Attempt to parse JSON, fallback to raw text
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch (e) {
      return res.json({ raw: text });
    }
  } catch (err) {
    return res.status(500).json({ error: 'AI call failed', detail: err.message });
  }
}

module.exports = { summarizeCourse };