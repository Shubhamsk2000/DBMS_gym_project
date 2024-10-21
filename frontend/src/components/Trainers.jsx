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
        setNewTrainer({ name: '', specialization: '', email: '', phone: '' }); // Reset input fields
    };

    // Delete trainer
    const deleteTrainer = async (id) => {
        await axios.delete(`http://localhost:5000/api/trainers/${id}`);
        fetchTrainers(); // Reload trainers after deleting
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className='my-4 font-bold text-3xl text-center text-gray-800'>Trainers</h2>

            {/* Add New Trainer */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Add New Trainer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className="border border-gray-300 rounded-md p-2"
                        placeholder="Name"
                        value={newTrainer.name}
                        onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                    />
                    <input
                        className="border border-gray-300 rounded-md p-2"
                        placeholder="Specialization"
                        value={newTrainer.specialization}
                        onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })}
                    />
                    <input
                        className="border border-gray-300 rounded-md p-2"
                        placeholder="Email"
                        value={newTrainer.email}
                        onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
                    />
                    <input
                        className="border border-gray-300 rounded-md p-2"
                        placeholder="Phone"
                        value={newTrainer.phone}
                        onChange={(e) => setNewTrainer({ ...newTrainer, phone: e.target.value })}
                    />
                </div>
                <button
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    onClick={addTrainer}
                >
                    Add Trainer
                </button>
            </div>

            {/* Display Trainers */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Current Trainers</h3>
                <ul className="space-y-4">
                    {trainers.map(trainer => (
                        <li key={trainer.trainer_id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
                            <div>
                                <span className="font-bold text-gray-800">{trainer.name}</span> - <span className="text-gray-600">{trainer.specialization}</span>
                            </div>
                            <button
                                className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                                onClick={() => deleteTrainer(trainer.trainer_id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Trainers;
