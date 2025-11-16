const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Missing authorization header' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token', detail: err.message });
  }
}

module.exports = authMiddleware;