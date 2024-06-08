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


router.get('/', async (req, res) => {
    res.json({ message: "gpt server" });
  });
  

module.exports = router;
