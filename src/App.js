import logo from './logo.svg';
import './App.css';
import './tailwind-output.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = "https://cardgamestatsapi-production.up.railway.app/api/values";

export default function App() {
    const [globalStats, setGlobalStats] = useState({
        topClass: { Name: "NEED DATA" },
        winsByClass: {},
        avgDeckSize: "NEED DATA",
        mostDeadlyEnemy: "NEED DATA",
        topRelic: "NEED DATA",
        topCharm: "NEED DATA",
        topCard: { Name: "NEED DATA", Count: 0 },
        heroPower: { Name: "NEED DATA", Count: 0 },
        avgRunTime: "NEED DATA",
        highestScore: { SteamName: "NEED DATA", Score: 0 }
    });

    // Load global stats
    useEffect(() => {
        axios
            .get(
                "https://cardgamestatsapi-production.up.railway.app/api/values/global-stats"
            )
            .then((res) => {
                const data = res.data;

                setGlobalStats({
                    topClass:
                        data.classes?.length > 0
                            ? { Name: data.classes[0].Name }
                            : { Name: "NEED DATA" },
                    winsByClass: data.winsByClass || {},
                    avgDeckSize: data.avgDeckSize || "NEED DATA",
                    mostDeadlyEnemy:
                        data.enemies?.length > 0 ? data.enemies[0].Name : "NEED DATA",
                    topRelic:
                        data.relics?.length > 0 ? data.relics[0].Name : "NEED DATA",
                    topCharm:
                        data.charms?.length > 0 ? data.charms[0].Name : "NEED DATA",
                    topCard:
                        data.cards?.length > 0
                            ? { Name: data.cards[0].Name, Count: data.cards[0].Count }
                            : { Name: "NEED DATA", Count: 0 },
                    heroPower:
                        data.heroPowers?.length > 0
                            ? { Name: data.heroPowers[0].Name, Count: data.heroPowers[0].Count }
                            : { Name: "NEED DATA", Count: 0 },
                    avgRunTime: data.avgRunTime || "NEED DATA",
                    highestScore:
                        data.highestScore || { SteamName: "NEED DATA", Score: 0 }
                });
            })
            .catch((err) => console.error(err));
    }, []);

    return (
    <>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Global Stats Dashboard
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Most Popular Class */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Most Popular Class</h2>
                        <p className="text-gray-700">
                            {globalStats.topClass?.Name || "NEED DATA"}
                        </p>
                    </div>

                    {/* Wins by Class */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Wins by Class</h2>
                        {Object.keys(globalStats.winsByClass || {}).length > 0 ? (
                            Object.entries(globalStats.winsByClass).map(([cls, count]) => (
                                <p key={cls} className="text-gray-700">
                                    {cls}: {count}
                                </p>
                            ))
                        ) : (
                            <p className="text-gray-500">NEED DATA</p>
                        )}
                    </div>

                    {/* Average Deck Size */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Average Deck Size</h2>
                        <p className="text-gray-700">
                            {globalStats.avgDeckSize || "NEED DATA"}
                        </p>
                    </div>

                    {/* Most Deadly Enemy */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Most Deadly Enemy</h2>
                        <p className="text-gray-700">
                            {globalStats.mostDeadlyEnemy || "NEED DATA"}
                        </p>
                    </div>

                    {/* Most Picked Relic */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Most Picked Relic</h2>
                        <p className="text-gray-700">
                            {globalStats.topRelic || "NEED DATA"}
                        </p>
                    </div>

                    {/* Most Used Charm */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Most Used Charm</h2>
                        <p className="text-gray-700">
                            {globalStats.topCharm || "NEED DATA"}
                        </p>
                    </div>

                    {/* Most Picked Card */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Most Picked Card</h2>
                        <p className="text-gray-700">
                            {globalStats.topCard?.Name
                                ? `${globalStats.topCard.Name} (${globalStats.topCard.Count})`
                                : "NEED DATA"}
                        </p>
                    </div>

                    {/* Most Picked Hero Power */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Most Picked Hero Power</h2>
                        <p className="text-gray-700">
                            {globalStats.heroPower?.Name
                                ? `${globalStats.heroPower.Name} (${globalStats.heroPower.Count})`
                                : "NEED DATA"}
                        </p>
                    </div>

                    {/* Average Run Time */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Average Run Time</h2>
                        <p className="text-gray-700">
                            {globalStats.avgRunTime || "NEED DATA"}
                        </p>
                    </div>

                    {/* Highest Score */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-2">Highest Score</h2>
                        <p className="text-gray-700">
                            {globalStats.highestScore?.Score
                                ? `${globalStats.highestScore.Score} (${globalStats.highestScore.SteamName})`
                                : "NEED DATA"}
                        </p>
                    </div>
                </div>
            </div>
    </>


            
            


    );
}