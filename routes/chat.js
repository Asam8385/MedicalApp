const express = require('express');
const { getChatResponse } = require('../models/generativeModel');
const router = express.Router();

router.post('/', async (req, res) => {
  const userInput = req.body.input;

  try {
    const response = await getChatResponse(userInput);
    res.json({ reply: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
