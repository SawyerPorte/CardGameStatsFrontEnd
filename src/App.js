import logo from './logo.svg';
import './App.css';
import './tailwind-output.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = "https://cardgamestatsapi-production.up.railway.app/api/values";

export default function App() {
    const [globalStats, setGlobalStats] = useState({
        cards: [],
        relics: [],
        charms: [],
        heroPowers: [],
        enemies: [],
        classes: []
    });
    //const [searchName, setSearchName] = useState("");
    //const [playerStats, setPlayerStats] = useState(null);
    //const [cardPickData, setCardPickData] = useState([]);
    //const [mostPickedCard, setMostPickedCard] = useState(null);
    //const [mostPickedHero, setMostPickedHero] = useState(null);

    // Load global stats
    useEffect(() => {
        axios.get('https://cardgamestatsapi-production.up.railway.app/api/values/global-stats')
            .then(res => setGlobalStats(res.data))
            .catch(err => console.error(err));
    }, []);

    //// Handle search
    //const handleSearch = () => {
    //    if (!searchName) return;
    //    axios.get(`${API_BASE}/player-stats/${searchName}`)
    //        .then(res => setPlayerStats(res.data))
    //        .catch(() => setPlayerStats(null));
    //};

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600">Global Stats Dashboard</h1>
                <p className="text-gray-600 mt-2">View global trends across all runs</p>
            </header>

            {/* Highlight Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
                <div className="bg-white shadow rounded-xl p-6 text-center">
                    <h2 className="text-lg font-semibold">Most Picked Card</h2>
                    <p className="mt-2 text-purple-600 text-xl">{globalStats.topCard?.Card} ({globalStats.topCard?.Count} times)</p>
                </div>
                <div className="bg-white shadow rounded-xl p-6 text-center">
                    <h2 className="text-lg font-semibold">Most Popular Class</h2>
                    <p className="mt-2 text-green-600 text-xl">{globalStats.topClass?.ClassName}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-6 text-center">
                    <h2 className="text-lg font-semibold">Highest Score</h2>
                    <p className="mt-2 text-red-600 text-xl">{globalStats.highestScore?.SteamName} ({globalStats.highestScore?.Score})</p>
                </div>
            </section>

            {/* Full Stats Table */}
            <section className="bg-white shadow rounded-xl p-6 max-w-6xl mx-auto overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Stat</th>
                            <th className="border px-4 py-2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">Table of Wins per Class</td>
                            <td className="border px-4 py-2">
                                {Object.entries(globalStats.winsByClass || {}).map(([cls, wins]) => (
                                    <div key={cls}>{cls}: {wins}</div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Average Deck Size</td>
                            <td className="border px-4 py-2">{globalStats.avgDeckSize}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Most Deadly Enemy</td>
                            <td className="border px-4 py-2">{globalStats.mostDeadlyEnemy}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Most Picked Relic</td>
                            <td className="border px-4 py-2">{globalStats.topRelic}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Most Used Charm</td>
                            <td className="border px-4 py-2">{globalStats.topCharm}</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Most Picked Hero Power</td>
                            <td className="border px-4 py-2">{globalStats.heroPower?.HeroPower} ({globalStats.heroPower?.Count})</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Average Run Time</td>
                            <td className="border px-4 py-2">{globalStats.avgRunTime}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}