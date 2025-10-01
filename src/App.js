import logo from './logo.svg';
import './App.css';
import './tailwind-output.css';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,BarChart,Bar
} from "recharts";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const API_BASE = "https://cardgamestatsapi-production.up.railway.app/api/values";

export default function App() {
    const [globalStats, setGlobalStats] = useState({
        classes: [],
        winsByClass: {},
        avgDeckSize: "NEED DATA",
        enemies: [],
        relics: [],
        charms: [],
        cards: [],
        heroPowers: [],
        avgRunTime: "NEED DATA",
        highestScore: { SteamName: "NEED DATA", EndingScore: 0 },
        byClass: [],
        byDifficulty: []
    });

    // Load global stats
    useEffect(() => {
        axios
            .get("https://cardgamestatsapi-production.up.railway.app/api/values/global-stats")
            .then((res) => {
                const data = res.data;

                setGlobalStats({
                    classes: data.classes || [],
                    winsByClass: data.winsByClass || {},
                    avgDeckSize: data.avgDeckSize || "NEED DATA",
                    enemies: data.enemies || [],
                    relics: data.relics || [],
                    charms: data.charms || [],
                    cards: data.cards || [],
                    heroPowers: data.heroPowers || [],
                    avgRunTime: data.avgRunTime || "NEED DATA",
                    highestScore: data.highestScore || { SteamName: "NEED DATA", EndingScore: 0 },
                    winRateByClass: data.winRateByClass || [],
                    winRateByDifficulty: data.winRateByDifficulty || []
                });
            })
            .catch((err) => console.error(err));
    }, []);

    const statCards = [
        {
            title: "Most Popular Classes",
            value:
                globalStats.classes.length > 0
                    ? globalStats.classes.map((cls, i) => (
                        <div key={i}>
                            {cls.Name} ({cls.Count})
                        </div>
                    ))
                    : "NEED DATA"
        },
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
        {
            title: "Most Deadly Enemies",
            value:
                globalStats.enemies.length > 0
                    ? globalStats.enemies.map((enemy, i) => (
                        <div key={i}>
                            {enemy.Name} ({enemy.Count})
                        </div>
                    ))
                    : "NEED DATA"
        },
        {
            title: "Most Picked Relics",
            value:
                globalStats.relics.length > 0
                    ? globalStats.relics.map((relic, i) => (
                        <div key={i}>
                            {relic.Name} ({relic.Count})
                        </div>
                    ))
                    : "NEED DATA"
        },
        {
            title: "Most Used Charms",
            value:
                globalStats.charms.length > 0
                    ? globalStats.charms.map((charm, i) => (
                        <div key={i}>
                            {charm.Name} ({charm.Count})
                        </div>
                    ))
                    : "NEED DATA"
        },
        {
            title: "Most Picked Cards",
            value:
                globalStats.cards.length > 0
                    ? globalStats.cards.map((card, i) => (
                        <div key={i}>
                            {card.Name} ({card.Count})
                        </div>
                    ))
                    : "NEED DATA"
        },
        {
            title: "Most Picked Hero Powers",
            value:
                globalStats.heroPowers.length > 0
                    ? globalStats.heroPowers.map((hp, i) => (
                        <div key={i}>
                            {hp.Name} ({hp.Count})
                        </div>
                    ))
                    : "NEED DATA"
        },
        { title: "Average Deck Size", value: globalStats.avgDeckSize || "NEED DATA" },
        { title: "Average Run Time", value: globalStats.avgRunTime || "NEED DATA" },
        {
            title: "Highest Score",
            value: globalStats.highestScore?.EndingScore
                ? `${globalStats.highestScore.EndingScore} (${globalStats.highestScore.SteamName})`
                : "NEED DATA"
        }
    ];

    const ClassWinRateChart = ({ data }) => {
        if (!data || data.length === 0) return <p>No data</p>;

        return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Class" />  {/* make sure your data has a `Class` field */}
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="WinRate" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    const DifficultyWinRateChart = ({ data }) => {
        if (!data || data.length === 0) return <p>No data</p>;

        return (
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Difficulty" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="WinRate" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        );
    };

    return (
        <div className="p-6 bg-gray-800 min-h-screen w-full">
            <h1 className="text-4xl font-bold mb-8 text-center w-full">
                Global Stats Dashboard
            </h1>

            <div className='grid md:grid-cols-5 auto-rows-[200px] gap-4 my-10'>
                {statCards.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-gray-300 border-2 rounded-xl p-2 text-white"
                    >
                        <h2 className="text-xl font-bold">{stat.title}</h2>
                        <p className="text-lg">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts grid */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-300 border-2 rounded-xl p-4 text-white">
                    <h2 className="text-xl font-bold mb-2">Win Rate by Class</h2>
                    <ClassWinRateChart data={globalStats.winRateByClass} />
                </div>

                <div className="bg-gray-300 border-2 rounded-xl p-4 text-white">
                    <h2 className="text-xl font-bold mb-2">Win Rate by Difficulty</h2>
                    <DifficultyWinRateChart data={globalStats.winRateByDifficulty} />
                </div>
            </div>
        </div>
    );

}