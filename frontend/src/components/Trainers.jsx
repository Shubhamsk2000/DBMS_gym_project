// src/components/Trainers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Trainers = () => {
    const [trainers, setTrainers] = useState([]);
    const [newTrainer, setNewTrainer] = useState({ name: '', specialization: '', email: '', phone: '' });

    // Fetch all trainers
    const fetchTrainers = async () => {
        const res = await axios.get('http://localhost:5000/api/trainers');
        setTrainers(res.data);
    };

    useEffect(() => {
        fetchTrainers();
    }, []);

    // Add new trainer
    const addTrainer = async () => {
        await axios.post('http://localhost:5000/api/trainers', newTrainer);
        fetchTrainers(); // Reload trainers after adding
    };

    // Delete trainer
    const deleteTrainer = async (id) => {
        await axios.delete(`http://localhost:5000/api/trainers/${id}`);
        fetchTrainers(); // Reload trainers after deleting
    };

    return (
        <div className="container">
            <h2>Trainers</h2>

            {/* Add New Trainer */}
            <div className="card">
                <input placeholder="Name" onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })} />
                <input placeholder="Specialization" onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })} />
                <input placeholder="Email" onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })} />
                <input placeholder="Phone" onChange={(e) => setNewTrainer({ ...newTrainer, phone: e.target.value })} />
                <button onClick={addTrainer}>Add Trainer</button>
            </div>

            {/* Display Trainers */}
            <ul>
                {trainers.map(trainer => (
                    <li key={trainer.trainer_id}>
                        {trainer.name} - {trainer.specialization}
                        <button className="delete-button" onClick={() => deleteTrainer(trainer.trainer_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Trainers;
