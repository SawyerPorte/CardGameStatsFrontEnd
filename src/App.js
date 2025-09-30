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
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center">Global Stats Dashboard</h1>

            <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white shadow rounded-xl">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left">Stat</th>
                            <th className="px-6 py-3 text-left">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-6 py-3 font-semibold">Most Popular Class</td>
                            <td className="px-6 py-3">{globalStats.topClass?.Name || "NEED DATA"}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 font-semibold">Wins by Class</td>
                            <td className="px-6 py-3">
                                {Object.entries(globalStats.winsByClass || {}).length > 0
                                    ? Object.entries(globalStats.winsByClass)
                                        .map(([cls, wins]) => `${cls}: ${wins}`)
                                        .join(", ")
                                    : "NEED DATA"}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 font-semibold">Average Deck Size</td>
                            <td className="px-6 py-3">{globalStats.avgDeckSize || "NEED DATA"}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 font-semibold">Most Deadly Enemy</td>
                            <td className="px-6 py-3">{globalStats.mostDeadlyEnemy?.Name || "NEED DATA"}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 font-semibold">Most Picked Relic</td>
                            <td className="px-6 py-3">{globalStats.topRelic?.Name || "NEED DATA"}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 font-semibold">Most Used Charm</td>
                            <td className="px-6 py-3">{globalStats.topCharm?.Name || "NEED DATA"}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 font-semibold">Most Picked Card</td>
                            <td className="px-6 py-3">{globalStats.topCard?.Name || "NEED DATA"}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 font-semibold">Most Picked Hero Power</td>
                            <td className="px-6 py-3">{globalStats.topHeroPower?.Name || "NEED DATA"}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 font-semibold">Average Run Time</td>
                            <td className="px-6 py-3">{globalStats.avgRunTime || "NEED DATA"}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-3 font-semibold">Highest Score</td>
                            <td className="px-6 py-3">
                                {globalStats.highestScore?.SteamName || "NEED DATA"}: {globalStats.highestScore?.EndingScore || 0}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}