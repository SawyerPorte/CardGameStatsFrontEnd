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

    // Load global stats
    useEffect(() => {
        axios.get('https://cardgamestatsapi-production.up.railway.app/api/values/global-stats')
            .then(res => setGlobalStats(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-6">Global Stats Dashboard</h1>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Cards */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Cards</h2>
                    {globalStats.cards.map(c => (
                        <div key={c.Name}>{c.Name}: {c.Count}</div>
                    ))}
                </div>

                {/* Relics */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Relics</h2>
                    {globalStats.relics.map(r => (
                        <div key={r.Name}>{r.Name}: {r.Count}</div>
                    ))}
                </div>

                {/* Charms */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Charms</h2>
                    {globalStats.charms.map(ch => (
                        <div key={ch.Name}>{ch.Name}: {ch.Count}</div>
                    ))}
                </div>

                {/* Hero Powers */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Hero Powers</h2>
                    {globalStats.heroPowers.map(h => (
                        <div key={h.Name}>{h.Name}: {h.Count}</div>
                    ))}
                </div>

                {/* Enemies */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Enemies</h2>
                    {globalStats.enemies.map(e => (
                        <div key={e.Name}>{e.Name}: {e.Count}</div>
                    ))}
                </div>

                {/* Classes */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Classes</h2>
                    {globalStats.classes.map(cls => (
                        <div key={cls.Name}>{cls.Name}: {cls.Count}</div>
                    ))}
                </div>
            </section>
        </div>
    );
}