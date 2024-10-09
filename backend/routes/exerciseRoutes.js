const express = require('express');
const Exercise = require('../models/Exercise');
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new task
router.post('/', async (req, res) => {
    const { name } = req.body;
    const newExercise = new Exercise({ name });
    try {
        const exercise = await newExercise.save();
        res.json(exercise);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update task (mark complete/incomplete)
router.put('/:id', async (req, res) => {
    try {
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(exercise);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
