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
            <h1 className="text-4xl font-bold mb-6 text-center">
                Global Stats Dashboard
            </h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                                Stat
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4">Most Popular Class</td>
                            <td className="px-6 py-4">{globalStats.topClass.Name}</td>
                        </tr>

                        <tr>
                            <td className="px-6 py-4">Wins by Class</td>
                            <td className="px-6 py-4">
                                {Object.keys(globalStats.winsByClass).length > 0
                                    ? Object.entries(globalStats.winsByClass).map(
                                        ([cls, count]) => (
                                            <div key={cls}>
                                                {cls}: {count}
                                            </div>
                                        )
                                    )
                                    : "NEED DATA"}
                            </td>
                        </tr>

                        <tr>
                            <td className="px-6 py-4">Average Deck Size</td>
                            <td className="px-6 py-4">{globalStats.avgDeckSize}</td>
                        </tr>

                        <tr>
                            <td className="px-6 py-4">Most Deadly Enemy</td>
                            <td className="px-6 py-4">{globalStats.mostDeadlyEnemy}</td>
                        </tr>

                        <tr>
                            <td className="px-6 py-4">Most Picked Relic</td>
                            <td className="px-6 py-4">{globalStats.topRelic}</td>
                        </tr>

                        <tr>
                            <td className="px-6 py-4">Most Used Charm</td>
                            <td className="px-6 py-4">{globalStats.topCharm}</td>
                        </tr>

                        <tr>
                            <td className="px-6 py-4">Most Picked Card</td>
                            <td className="px-6 py-4">
                                {globalStats.topCard.Name} ({globalStats.topCard.Count})
                            </td>
                        </tr>

                        <tr>
                            <td className="px-6 py-4">Most Picked Hero Power</td>
                            <td className="px-6 py-4">
                                {globalStats.heroPower.Name} ({globalStats.heroPower.Count})
                            </td>
                        </tr>

                        <tr>
                            <td className="px-6 py-4">Average Run Time</td>
                            <td className="px-6 py-4">{globalStats.avgRunTime}</td>
                        </tr>

                        <tr>
                            <td className="px-6 py-4">Highest Score</td>
                            <td className="px-6 py-4">
                                {globalStats.highestScore.SteamName} ({globalStats.highestScore.Score})
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}