"use client"

import { ArrowRight, RotateCcw, Calendar } from "lucide-react";
import {useState} from "react";

interface MatchResult {
    id: number;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    stadium: string;
    date: string;
    homeTeamLogo: string;
    awayTeamLogo: string;
}

const mockResults: MatchResult[] = [
    {
        id: 1,
        homeTeam: "Aston Villa",
        awayTeam: "Chelsea",
        homeScore: 2,
        awayScore: 1,
        stadium: "Villa Park, Birmingham",
        date: "Sunday 23 February 2025",
        homeTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png",
        awayTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
    },
    {
        id: 2,
        homeTeam: "Newcastle",
        awayTeam: "Nott'm Forest",
        homeScore: 4,
        awayScore: 3,
        stadium: "St. James' Park, Newcastle",
        date: "Sunday 23 February 2025",
        homeTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png",
        awayTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
    },
    {
        id: 3,
        homeTeam: "Man City",
        awayTeam: "Liverpool",
        homeScore: 0,
        awayScore: 2,
        stadium: "Etihad Stadium, Manchester",
        date: "Sunday 23 February 2025",
        homeTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png",
        awayTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
    },
    {
        id: 4,
        homeTeam: "Aston Villa",
        awayTeam: "Chelsea",
        homeScore: 2,
        awayScore: 1,
        stadium: "Villa Park, Birmingham",
        date: "Sunday 23 February 2025",
        homeTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png",
        awayTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
    },
    {
        id: 5,
        homeTeam: "Newcastle",
        awayTeam: "Nott'm Forest",
        homeScore: 4,
        awayScore: 3,
        stadium: "St. James' Park, Newcastle",
        date: "Sunday 24 February 2025",
        homeTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png",
        awayTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
    },
    {
        id: 6,
        homeTeam: "Man City",
        awayTeam: "Liverpool",
        homeScore: 0,
        awayScore: 2,
        stadium: "Etihad Stadium, Manchester",
        date: "Sunday 25 February 2025",
        homeTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png",
        awayTeamLogo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
    }
];

export default function Fixture() {

    const [selectedCompetition, setSelectedCompetition] = useState("Premier League");
    const [selectedSeason, setSelectedSeason] = useState("2024/25");
    const [selectedClub, setSelectedClub] = useState("All Clubs");

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-[#121b30] via-[#121b40] to-[#121b30]">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-5xl font-bold text-white mb-8">Results</h1>
                    <div className="flex gap-2">
                        <button className="bg-white text-purple-900 px-4 py-2 rounded-md text-sm font-medium">
                            First Team
                        </button>
                        <button className="bg-transparent text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium">
                            PL2
                        </button>
                        <button className="bg-transparent text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium">
                            U18
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Filter by Competition</label>
                            <select
                                className="w-full border rounded-md p-2"
                                value={selectedCompetition}
                                onChange={(e) => setSelectedCompetition(e.target.value)}
                            >
                                <option>Premier League</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Filter by Season</label>
                            <select
                                className="w-full border rounded-md p-2"
                                value={selectedSeason}
                                onChange={(e) => setSelectedSeason(e.target.value)}
                            >
                                <option>2024/25</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Filter by Club</label>
                            <select
                                className="w-full border rounded-md p-2"
                                value={selectedClub}
                                onChange={(e) => setSelectedClub(e.target.value)}
                            >
                                <option>All Clubs</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                <RotateCcw className="h-4 w-4" />
                                <span>Reset filters</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Add fixtures to calendar
                        </button>
                        <span className="text-sm text-gray-500">All times shown are your local time</span>
                    </div>

                    {/* Results by Date */}
                    {Object.entries(
                        mockResults.reduce((acc, match) => {
                            if (!acc[match.date]) {
                                acc[match.date] = [];
                            }
                            acc[match.date].push(match);
                            return acc;
                        }, {} as Record<string, MatchResult[]>)
                    ).map(([date, matches]) => (
                        <div key={date} className="mb-8">
                            <h3 className="text-xl font-bold text-[#121b30] mb-4">{date}</h3>
                            <div className="space-y-4">
                                {matches.map((match) => (
                                    <div key={match.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                        <div className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="flex items-center gap-2 w-[200px]">
                                                        <img src={match.homeTeamLogo} alt={match.homeTeam} className="w-8 h-8" />
                                                        <span className="font-medium">{match.homeTeam}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl font-bold">{match.homeScore}</span>
                                                        <span className="text-gray-400">-</span>
                                                        <span className="text-2xl font-bold">{match.awayScore}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 w-[200px]">
                                                        <img src={match.awayTeamLogo} alt={match.awayTeam} className="w-8 h-8" />
                                                        <span className="font-medium">{match.awayTeam}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <span className="text-sm text-gray-500">{match.stadium}</span>
                                                    <ArrowRight className="h-4 w-4 text-gray-400 ml-2" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};