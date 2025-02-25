"use client"
import {Standings} from "@/components/Standings";

export default function Table() {


    const mockStandings = [
        {
            position: 1,
            team: "Liverpool",
            played: 27,
            gd: 38,
            points: 64,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 2,
            team: "Arsenal",
            played: 26,
            gd: 28,
            points: 53,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 3,
            team: "Nott'm Forest",
            played: 26,
            gd: 11,
            points: 47,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 4,
            team: "Man City",
            played: 26,
            gd: 15,
            points: 44,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 5,
            team: "Newcastle",
            played: 26,
            gd: 10,
            points: 44,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 6,
            team: "Bournemouth",
            played: 26,
            gd: 14,
            points: 43,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 7,
            team: "Chelsea",
            played: 26,
            gd: 12,
            points: 43,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 8,
            team: "Aston Villa",
            played: 27,
            gd: -2,
            points: 42,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 9,
            team: "Brighton",
            played: 26,
            gd: 4,
            points: 40,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 10,
            team: "Fulham",
            played: 26,
            gd: 3,
            points: 39,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 11,
            team: "Brentford",
            played: 26,
            gd: 5,
            points: 37,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 12,
            team: "Spurs",
            played: 26,
            gd: 15,
            points: 33,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 13,
            team: "Crystal Palace",
            played: 26,
            gd: -1,
            points: 33,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 14,
            team: "Everton",
            played: 26,
            gd: -4,
            points: 31,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        },
        {
            position: 15,
            team: "Man Utd",
            played: 26,
            gd: -7,
            points: 30,
            logo: "/lovable-uploads/e1915e74-7933-4bec-90bc-b3984edf4950.png"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-[#121b30] via-[#121b40] to-[#121b30]">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-5xl font-bold text-white mb-8">Tables</h1>
                    <div className="flex gap-2">
                        <button className="bg-white text-purple-900 px-4 py-2 rounded-md text-sm font-medium">
                            First
                        </button>
                        <button
                            className="bg-transparent text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium">
                            PL2
                        </button>
                        <button
                            className="bg-transparent text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium">
                            U18
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Filter by
                                Competition</label>
                            <select className="w-full border rounded-md p-2">
                                <option>Premier League</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Filter by Season</label>
                            <select className="w-full border rounded-md p-2">
                                <option>2024/25</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Filter by Matchweek</label>
                            <select className="w-full border rounded-md p-2">
                                <option>All Matchweeks</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Filter by Home or
                                Away</label>
                            <select className="w-full border rounded-md p-2">
                                <option>All Matches</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Standings teams={mockStandings}/>
                </div>
            </div>
        </div>
    );
};
