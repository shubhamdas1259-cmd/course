const express = require('express');
const prisma = require('../prismaClient');
const auth = require('../middleware/auth');
const router = express.Router();

// List courses
router.get('/', async (req, res) => {
  const courses = await prisma.course.findMany({
    include: { author: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(courses);
});

// Create course (authenticated)
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const course = await prisma.course.create({
    data: { title, description, authorId: req.user.id }
  });
  res.json(course);
});

// Get course with lessons
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const course = await prisma.course.findUnique({
    where: { id },
    include: { lessons: { orderBy: { position: 'asc' } }, author: true }
  });
  if (!course) return res.status(404).json({ error: 'Not found' });
  res.json(course);
});

module.exports = router;