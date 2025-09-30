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

    const statCards = [
        { title: "Most Popular Class", value: globalStats.topClass?.Name || "NEED DATA" },
        {
            title: "Wins by Class",
            value:
                Object.keys(globalStats.winsByClass).length > 0
                    ? Object.entries(globalStats.winsByClass).map(([cls, count]) => (
                        <div key={cls}>
                            {cls}: {count}
                        </div>
                    ))
                    : "NEED DATA",
        },
        { title: "Average Deck Size", value: globalStats.avgDeckSize || "NEED DATA" },
        { title: "Most Deadly Enemy", value: globalStats.mostDeadlyEnemy || "NEED DATA" },
        { title: "Most Picked Relic", value: globalStats.topRelic || "NEED DATA" },
        { title: "Most Used Charm", value: globalStats.topCharm || "NEED DATA" },
        {
            title: "Most Picked Card",
            value:
                globalStats.topCard?.Name
                    ? `${globalStats.topCard.Name} (${globalStats.topCard.Count})`
                    : "NEED DATA",
        },
        {
            title: "Most Picked Hero Power",
            value:
                globalStats.heroPower?.Name
                    ? `${globalStats.heroPower.Name} (${globalStats.heroPower.Count})`
                    : "NEED DATA",
        },
        { title: "Average Run Time", value: globalStats.avgRunTime || "NEED DATA" },
        {
            title: "Highest Score",
            value:
                globalStats.highestScore?.Score
                    ? `${globalStats.highestScore.Score} (${globalStats.highestScore.SteamName})`
                    : "NEED DATA",
        },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-4xl font-bold mb-8 text-center w-full">
                Global Stats Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
                {statCards.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-white shadow rounded-xl p-6 flex flex-col justify-center items-center text-center"
                    >
                        <h2 className="text-lg font-semibold mb-2">{stat.title}</h2>
                        <p>{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}