const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /register
router.post('/register', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST /login (very basic: just checks name exists)
router.post('/login', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE name=$1',
      [name]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;