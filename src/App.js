import logo from './logo.svg';
import './App.css';
import './tailwind-output.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = "https://cardgamestatsapi-production.up.railway.app/api/values";

function App() {
    const [data, setData] = useState([]);
    const [heroPower, setHeroPower] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [playerStats, setPlayerStats] = useState(null);

    // Load global card pick stats
    useEffect(() => {
        axios.get(`${API_BASE}/card-picks`)
            .then(res => {
                const chartData = res.data.map(item => ({
                    name: item.cardName,
                    value: item.timesPicked
                }));
                setData(chartData);
            });
    }, []);

    // Load most popular hero power
    useEffect(() => {
        axios.get(`${API_BASE}/popular-hero-power`)
            .then(res => setHeroPower(res.data));
    }, []);

    const handleSearch = () => {
        axios.get(`${API_BASE}/player-stats/${searchName}`)
            .then(res => setPlayerStats(res.data))
            .catch(() => setPlayerStats(null));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Card Game Dashboard</h1>

            {/* Global Hero Power Stat */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-full max-w-xl text-center">
                <h2 className="text-xl font-semibold">Most Popular Hero Power</h2>
                {heroPower ? (
                    <p className="text-lg mt-2 text-green-600">{heroPower.heroPower} ({heroPower.count} runs)</p>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>

            {/* Search Player */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 w-full max-w-xl">
                <h2 className="text-xl font-semibold mb-2">Search Player by Steam Name</h2>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={searchName}
                        onChange={e => setSearchName(e.target.value)}
                        placeholder="Enter Steam Name"
                        className="flex-1 border rounded px-3 py-2"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Search
                    </button>
                </div>
                {playerStats && (
                    <div className="mt-4">
                        <p><strong>Win Rate:</strong> {(playerStats.winRate * 100).toFixed(1)}%</p>
                        <p><strong>Most Played Class:</strong> {playerStats.mostPlayedClass}</p>
                    </div>
                )}
            </div>

            {/* Card Picks Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">Most Picked Cards</h2>
                <LineChart width={500} height={300} data={data}>
                    <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} />
                    <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </div>
        </div>
    );
}

export default App;
