import logo from './logo.svg';
import './App.css';
import './tailwind-output.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = "https://cardgamestatsapi-production.up.railway.app/api/values";

export default function App() {
    const [globalStats, setGlobalStats] = useState({ heroPower: null, topCard: null });
    //const [searchName, setSearchName] = useState("");
    //const [playerStats, setPlayerStats] = useState(null);
    const [cardPickData, setCardPickData] = useState([]);
    //const [mostPickedCard, setMostPickedCard] = useState(null);
    //const [mostPickedHero, setMostPickedHero] = useState(null);

    // Load global stats
    useEffect(() => {
        axios.get('https://cardgamestatsapi-production.up.railway.app/api/values/card-picks')
            .then(res => {
                setGlobalStats(prev => ({ ...prev, topCard: res.data }));
            })
            .catch(err => console.error(err));

        // Top HeroPower
        axios.get('https://cardgamestatsapi-production.up.railway.app/api/values/popular-hero-power')
            .then(res => {
                setGlobalStats(prev => ({ ...prev, heroPower: res.data }));
            })
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
                <h1 className="text-4xl font-bold text-blue-600">Card Game Stats Dashboard</h1>
                <p className="text-gray-600 mt-2">View global trends or search by Steam name</p>
            </header>

            {/* Global Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                <div className="bg-white shadow rounded-xl p-6 text-center">
                    <h2 className="text-lg font-semibold">Most Popular Hero Power</h2>
                    {globalStats.heroPower ? (
                        <p className="mt-2 text-green-600 text-xl">
                            {globalStats.heroPower.HeroPower} ({globalStats.heroPower.Count} runs)
                        </p>
                    ) : (
                        <p className="text-gray-400 mt-2">Loading...</p>
                    )}
                </div>
                <div className="bg-white shadow rounded-xl p-6 text-center">
                    <h2 className="text-lg font-semibold">Most Picked Card</h2>
                    {globalStats.topCard ? (
                        <p className="mt-2 text-purple-600 text-xl">
                            {globalStats.topCard.Card} ({globalStats.topCard.Count} times)
                        </p>
                    ) : (
                        <p className="text-gray-400 mt-2">Loading...</p>
                    )}
                </div>
            </section>

            {/* Search Player Section */}
            {/*<section className="bg-white shadow rounded-xl p-6 mb-10 max-w-3xl mx-auto">*/}
            {/*    <h2 className="text-xl font-semibold mb-4">Search Player by Steam Name</h2>*/}
            {/*    <div className="flex gap-2">*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            value={searchName}*/}
            {/*            onChange={e => setSearchName(e.target.value)}*/}
            {/*            placeholder="Enter Steam Name"*/}
            {/*            className="flex-1 border rounded px-3 py-2"*/}
            {/*        />*/}
            {/*        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">*/}
            {/*            Search*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*    {playerStats && (*/}
            {/*        <div className="mt-4 space-y-2">*/}
            {/*            <p><strong>Win Rate:</strong> {(playerStats.winRate * 100).toFixed(1)}%</p>*/}
            {/*            <p><strong>Most Played Class:</strong> {playerStats.mostPlayedClass}</p>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</section>*/}

            {/* Card Picks Chart */}
            <section className="bg-white shadow rounded-xl p-6 max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Most Picked Cards</h2>
                <LineChart width={600} height={300} data={cardPickData}>
                    <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} />
                    <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </section>
        </div>
    );
}