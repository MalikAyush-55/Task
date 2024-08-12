const express = require('express');
const router = express.Router();
const Question = require('./models/question');


router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newQuestion = new Question({ question, answer });
    await newQuestion.save();
    res.json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(id, { question, answer }, { new: true });
    res.json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Question.findByIdAndDelete(id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;