import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    exercise: '',
    sets: '',
    reps: '',
  });
  const [editingWorkoutId, setEditingWorkoutId] = useState(null);

  // Fetch workouts on component mount
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const response = await axios.get('http://localhost:5000/workouts');
    setWorkouts(response.data);
  };

  const handleInputChange = (e) => {
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
  };

  const addWorkout = async () => {
    if (editingWorkoutId) {
      // Update existing workout
      await axios.put(`http://localhost:5000/workouts/${editingWorkoutId}`, newWorkout);
    } else {
      // Create new workout
      await axios.post('http://localhost:5000/workouts', newWorkout);
    }

    setNewWorkout({ exercise: '', sets: '', reps: '' });
    setEditingWorkoutId(null);
    fetchWorkouts();
  };

  const editWorkout = (workout) => {
    setNewWorkout({ exercise: workout.exercise, sets: workout.sets, reps: workout.reps });
    setEditingWorkoutId(workout._id);
  };

  const deleteWorkout = async (id) => {
    await axios.delete(`http://localhost:5000/workouts/${id}`);
    fetchWorkouts();
  };

  return (
    <div className="container">
      <h1>Workout Tracker</h1>

      <input
        name="exercise"
        value={newWorkout.exercise}
        onChange={handleInputChange}
        placeholder="Exercise"
      />
      <input
        name="sets"
        value={newWorkout.sets}
        onChange={handleInputChange}
        placeholder="Sets"
        type="number"
      />
      <input
        name="reps"
        value={newWorkout.reps}
        onChange={handleInputChange}
        placeholder="Reps"
        type="number"
      />
      <button onClick={addWorkout}>
        {editingWorkoutId ? 'Update Workout' : 'Add Workout'}
      </button>

      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <div>
              <strong>{workout.exercise}</strong> - {workout.sets} sets x {workout.reps} reps ({new Date(workout.date).toLocaleDateString()})
            </div>
            <div>
              <button className="edit-btn" onClick={() => editWorkout(workout)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteWorkout(workout._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

