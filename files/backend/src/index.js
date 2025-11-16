require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const { summarizeCourse } = require('./controllers/aiController');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.post('/api/ai/summarize', summarizeCourse);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});