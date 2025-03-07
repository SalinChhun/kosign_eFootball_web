'use client';
import {useState} from "react";
import useFetchSeason from "@/lib/hooks/useFetchSeason";
import useFetchClubs from "@/lib/hooks/useFetchClub";
import {useRouter, useSearchParams} from "next/navigation";
import CreateClub from "@/components/ui/CreateClub";
import {useSession} from "next-auth/react";
import UpdateClubForm from "@/components/ui/UpdateClubForm";
import {useUploadImageStore} from "@/lib/store/store";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {clubService} from "@/service/clubs.service";
import ClubListSkeleton from "@/components/shared/ClubListSkeleton";


export default function Clubs() {

    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSeason, setSelectedSeason] = useState("");
    const [createClubPopup, setCreateClubPopup] = useState(false);
    const [updateClubPopup, setUpdateClubPopup] = useState(false);
    const [updateClubData, setUpdateClubData] = useState({});
    const {setImageUrl} = useUploadImageStore(state => state);
    console.log('createClubPopup ', createClubPopup)
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}`;
    const {season_list} = useFetchSeason();
    const {club_list, isLoading} = useFetchClubs();
    console.log("isLoading ", isLoading);
    const session = useSession();
    console.log("session ", session?.data?.user?.role);
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

    const handleSearchClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm.trim()) {
            params.set("club_name", searchTerm.trim());
        } else {
            params.delete("club_name");
        }
        router.push(`/clubs?${params.toString()}`);
    }

    const deleteClubMutation = useMutation((req: string) => clubService.deleteClub(req), {
        onError: (error: any) => {
            toast.error(error?.message)
        },
        onSuccess: (data: any) => {
            queryClient.invalidateQueries(['clubs']);
            toast.success("Delete Club Successfully");
        }
    })

    const handleDeleteClub = (clubId: any) => {
        const confirmDelete = confirm("Are you sure you want to delete this club?");
        if (confirmDelete) {
            deleteClubMutation.mutate(clubId);
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section with Search */}
                <div className="bg-gradient-to-r from-[#121b30] via-[#121b40] to-[#121b30]">
                    <div className="container mx-auto px-4 py-12">
                        <h1 className="text-5xl font-bold text-white mb-8">Clubs</h1>
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                onKeyDown={handleSearchEnter}
                                placeholder="Search Clubs"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-6 pr-12 text-lg text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                            />
                            <button
                                className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
                                onClick={handleSearchClick}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </button>
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
                            {
                                session?.data?.user?.role?.toLowerCase() === 'admin' &&
                                <button
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                    onClick={() => {
                                        setCreateClubPopup(true);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 4v16m8-8H4"/>
                                    </svg>
                                    <span className="font-medium">Create Club</span>
                                </button>
                            }
                        </div>
                    </div>

                    {/* Clubs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
                        {
                            club_list.map((club) => (
                                <div
                                    key={club.id}
                                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative"
                                >
                                    {/* Admin actions */}
                                    {session?.data?.user?.role?.toLowerCase() === 'admin' && (
                                        <div className="absolute top-2 right-2 flex space-x-2 z-10">
                                            {/* Update Icon */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault()
                                                    setUpdateClubPopup(true);
                                                    setUpdateClubData(club);
                                                    setImageUrl(club?.image);
                                                }}
                                                className="bg-blue-100 p-1.5 rounded-full hover:bg-blue-200 transition-colors"
                                                title="Edit club"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                </svg>
                                            </button>

                                            {/* Delete Icon */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClub(club.id);
                                                }}
                                                className="bg-red-100 p-1.5 rounded-full hover:bg-red-200 transition-colors"
                                                title="Delete club"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    {/*card*/}
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
                        }
                        {
                            isLoading && <ClubListSkeleton/>
                        }
                        {
                            club_list.length === 0 && !isLoading && (
                                <div className="col-span-full text-center py-8">
                                    <p className="text-gray-500 text-lg">No clubs found</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                createClubPopup && <CreateClub
                    show={createClubPopup}
                    onClose={() => setCreateClubPopup(false)}
                />
            }
            {
                updateClubPopup && <UpdateClubForm
                    show={updateClubPopup}
                    onClose={() => setUpdateClubPopup(false)}
                    updateData={updateClubData}
                />
            }
        </>
    );
};