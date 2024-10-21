import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Members from './Members';
import Trainers from './Trainers';

const Dashboard = () => {
    const location = useLocation();
    const [link, setLink] = useState('');
    const navigate = useNavigate();

    // Update the link state based on the current pathname
    useEffect(() => {
        const currentPath = location.pathname.split('/').pop(); // get last part of URL
        setLink(currentPath);
    }, [location.pathname]);
    console.log(link)
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="flex flex-col w-64 text-black bg-gray-800">
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                </div>
                <nav className="flex-1 px-2 mt-4">
                    <ul >
                        <Link to="/dashboard/add-member">
                            <li className={`p-4 hover:bg-gray-700 cursor-pointer ${link === 'add-member' ? 'bg-gray-700' : ''}`}>
                                Add Member
                            </li>
                        </Link>
                        <Link to="/dashboard/add-trainer">
                            <li className={`p-4 hover:bg-gray-700 cursor-pointer ${link === 'add-trainer' ? 'bg-gray-700' : ''}`}>
                                Add Trainer
                            </li>
                        </Link>
                    </ul>
                </nav>
                <div className="p-4">
                    <button
                        className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => navigate('/')}
                    >
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
                <div>
                    {
                        link == 'add-member' ? <Members /> : <Trainers />
                    }
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
