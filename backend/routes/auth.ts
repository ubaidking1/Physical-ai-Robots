import express from 'express';
const router = express.Router();

router.post('/signin', (req, res) => {
  res.json({
    token: 'demo-token',
    user: { email: req.body.email },
  });
});

router.post('/signup', (req, res) => {
  res.json({ success: true });
});

export default router;
