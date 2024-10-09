import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [exercises, setExercises] = useState([]);
    const [exerciseName, setExerciseName] = useState('');

    // Fetch all tasks from the backend
    const fetchExercises = async () => {
        const response = await axios.get('http://localhost:5000/api/exercises');
        setExercises(response.data);
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    // Add a new task
    const addExercise = async () => {
        const response = await axios.post('http://localhost:5000/api/exercises', { name: exerciseName });
        setExercises([...exercises, response.data]);
        setExerciseName('');
    };

    // Toggle task completion
    const toggleExerciseCompletion = async (exercise) => {
        const updatedExercise = { ...exercise, completed: !exercise.completed };
        const response = await axios.put(`http://localhost:5000/api/exercises/${exercise._id}`, updatedExercise);
        setExercises(exercises.map(e => e._id === exercise._id ? response.data : e));
    };

    // Delete a task
    const deleteExercise = async (id) => {
        await axios.delete(`http://localhost:5000/api/exercises/${id}`);
        setExercises(exercises.filter(exercise => exercise._id !== id));
    };

    return (
        <div className="app">
            <h1>Workout Tracker</h1>
            <div className="exercise-input">
                <input 
                    type="text" 
                    value={exerciseName} 
                    onChange={(e) => setExerciseName(e.target.value)} 
                    placeholder="Add a new exercise..."
                />
                <button onClick={addExercise}>Add Exercise</button>
            </div>
            <ul className="exercise-list">
                {exercises.map(exercise => (
                    <li key={exercise._id} className={exercise.completed ? 'completed' : ''}>
                        <span onClick={() => toggleExerciseCompletion(exercise)}>
                            {exercise.name}
                        </span>
                        <button onClick={() => deleteExercise(exercise._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;

