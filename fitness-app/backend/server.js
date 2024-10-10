require('dotenv').config();  // For environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Atlas connection 
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Workout Schema and Model
const workoutSchema = new mongoose.Schema({
  exercise: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Workout = mongoose.model('Workout', workoutSchema);

// Routes
app.get('/workouts', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

app.post('/workouts', async (req, res) => {
  const newWorkout = new Workout(req.body);
  await newWorkout.save();
  res.json(newWorkout);
});

app.put('/workouts/:id', async (req, res) => {
  const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedWorkout);
});

app.delete('/workouts/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.json({ message: 'Workout deleted' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
