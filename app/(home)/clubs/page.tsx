"use client"

import {useState} from "react";
import {RotateCcw} from "lucide-react";
import useFetchSeason from "@/lib/hooks/useFetchSeason";
import useFetchClubs from "@/lib/hooks/useFetchClub";
import {usePathname, useRouter, useSearchParams} from "next/navigation";


export default function Clubs() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSeason, setSelectedSeason] = useState(searchParams.get("season_id") || "");

    const {season_list} = useFetchSeason();
    const {club_list} = useFetchClubs();
    console.log("club_list ", club_list);

    const filteredClubs = Array.isArray(club_list)
        ? club_list.filter(club =>
            club.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Search */}
            <div className="bg-gradient-to-r from-[#121b30] via-[#121b40] to-[#121b30]">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-5xl font-bold text-white mb-8">Clubs</h1>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search Clubs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white text-purple-900 px-6 py-1 font-medium rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
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
                                onChange={(e) => {
                                    router.push(`${pathname}?season_id=${e.target.value.toString()}`)
                                    setSelectedSeason(e.target.value)
                                }}
                            >
                                <option value="">All</option>
                                {season_list?.map((season: any) => (
                                    <option key={season?.id} value={season?.id}>{season?.name}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedSeason("2024/25");
                            }}
                        >
                            <RotateCcw className="h-4 w-4"/>
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
                            {/*<div className={`p-6 border-t-4 ${club.color} rounded-t-lg`}>*/}
                            <div className={`p-6 border-t-4 rounded-t-lg`}>

                                <div className="flex flex-col items-center text-center">
                                    <img
                                        src={club?.image}
                                        alt={club?.name}
                                        className="w-24 h-24 mb-4 transition-transform group-hover:scale-110"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {club?.name}
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