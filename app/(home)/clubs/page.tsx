'use client';
import {useState} from "react";
import useFetchSeason from "@/lib/hooks/useFetchSeason";
import useFetchClubs from "@/lib/hooks/useFetchClub";
import {useRouter, useSearchParams} from "next/navigation";
import CreateClub from "@/components/ui/CreateClub";


export default function Clubs() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSeason, setSelectedSeason] = useState("");
    const [createClubPopup, setCreateClubPopup] = useState(false);
    console.log('createClubPopup ', createClubPopup)
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}`;
    const {season_list} = useFetchSeason();
    const {club_list} = useFetchClubs();
    console.log("club_list ", club_list);


    const handleSeasonChange = (seasonId: any) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("season_id", seasonId);
        router.push(`/clubs?${params.toString()}`);
        setSelectedSeason(seasonId);
    };

    const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm.trim()) {
                params.set("club_name", searchTerm.trim());
            } else {
                params.delete("club_name");
            }
            router.push(`/clubs?${params.toString()}`);
        }
    };


    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section with Search */}
                <div className="bg-gradient-to-r from-[#121b30] via-[#121b40] to-[#121b30]">
                    <div className="container mx-auto px-4 py-12">
                        <h1 className="text-5xl font-bold text-white mb-8">Clubs</h1>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                onKeyDown={handleSearchEnter}
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
                                        handleSeasonChange(e.target.value.toString());
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
                                    setCreateClubPopup(true);
                                }}
                            >
                                <span>Create Club</span>
                            </button>
                        </div>
                    </div>

                    {/* Clubs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
                        {club_list.length > 0 ? (
                            club_list.map((club) => (
                                <div
                                    key={club.id}
                                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                                >
                                    {/*<div className={`p-6 border-t-4 ${club.color} rounded-t-lg`}>*/}
                                    <div className={`p-6 border-t-4 rounded-t-lg`}>

                                        <div className="flex flex-col items-center text-center">
                                            <img
                                                src={club?.image || `${baseUrl}/asset/place_holder/club.png`}
                                                alt={club?.name}
                                                className="w-24 h-24 mb-4 transition-transform group-hover:scale-110"
                                            />
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {club?.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8">
                                <p className="text-gray-500 text-lg">No clubs found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {
                createClubPopup && <CreateClub
                    show={createClubPopup}
                    onClose={() => setCreateClubPopup(false)}
                />
            }
        </>
    );
};