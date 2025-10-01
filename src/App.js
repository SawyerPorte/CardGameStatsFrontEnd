import logo from './logo.svg';
import './App.css';
import './tailwind-output.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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
        highestScore: { SteamName: "NEED DATA", EndingScore: 0 }
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
                    highestScore: data.highestScore || { SteamName: "NEED DATA", EndingScore: 0 }
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

    return (
        <div className="p-6 bg-gray-50 min-h-screen w-full">
            <h1 className="text-4xl font-bold mb-8 text-center w-full">
                Global Stats Dashboard
            </h1>

            <div className='grid md:grid-cols-4 auto-rows-[300px] gap-4 my-10'>
                {statCards.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-neutral-100 border-2 rounded-xl p-2"
                    >
                        <h2 className="text-xl font-bold">{stat.title}</h2>
                        <p className="text-lg">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}