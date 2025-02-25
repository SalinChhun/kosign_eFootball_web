"use client"

import {useState} from "react";
import { Search, RotateCcw } from "lucide-react";

interface Club {
    id: number;
    name: string;
    logo: string;
    color: string;
}

const mockClubs: Club[] = [
    { id: 1, name: "Arsenal", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-red-500" },
    { id: 2, name: "Aston Villa", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-blue-800" },
    { id: 3, name: "Bournemouth", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-red-700" },
    { id: 4, name: "Brentford", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-red-600" },
    { id: 5, name: "Brighton & Hove Albion", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-blue-500" },
    { id: 6, name: "Chelsea", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-blue-600" },
    { id: 7, name: "Crystal Palace", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-blue-700" },
    { id: 8, name: "Everton", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-blue-600" },
    { id: 9, name: "Fulham", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-gray-800" },
    { id: 10, name: "Liverpool", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-red-600" },
    { id: 11, name: "Manchester City", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-blue-500" },
    { id: 12, name: "Manchester United", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-red-600" },
    { id: 13, name: "Newcastle United", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-black" },
    { id: 14, name: "Nottingham Forest", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-red-700" },
    { id: 15, name: "Tottenham Hotspur", logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png", color: "border-blue-900" },
];

export default function Clubs() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSeason, setSelectedSeason] = useState("2024/25");

    const filteredClubs = mockClubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Search */}
            <div className="bg-gradient-to-r from-[#121b30] via-[#121b40] to-[#121b30] py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-white mb-8">Clubs</h1>
                    <div className="max-w-2xl relative">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Clubs"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="container mx-auto px-4 -mt-8">
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <div className="w-64">
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Filter by Season
                            </label>
                            <select
                                className="w-full border rounded-md p-2"
                                value={selectedSeason}
                                onChange={(e) => setSelectedSeason(e.target.value)}
                            >
                                <option value="2024/25">2024/25</option>
                                <option value="2023/24">2023/24</option>
                            </select>
                        </div>
                        <button
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedSeason("2024/25");
                            }}
                        >
                            <RotateCcw className="h-4 w-4" />
                            <span>Reset filters</span>
                        </button>
                    </div>
                </div>

                {/* Clubs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
                    {filteredClubs.map((club) => (
                        <div
                            key={club.id}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            <div className={`p-6 border-t-4 ${club.color} rounded-t-lg`}>
                                <div className="flex flex-col items-center text-center">
                                    <img
                                        src={club.logo}
                                        alt={club.name}
                                        className="w-24 h-24 mb-4 transition-transform group-hover:scale-110"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {club.name}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};