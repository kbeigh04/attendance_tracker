const express = require('express');
const pool = require('../db');
const router = express.Router();

// Get all attendance
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM attendance ORDER BY date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark attendance
router.post('/', async (req, res) => {
  const { user_id, date, status, notes } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO attendance (user_id, date, status, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, date, status, notes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
