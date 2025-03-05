'use client';
import {useEffect, useRef, useState} from "react";
import useFetchSeason from "@/lib/hooks/useFetchSeason";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {seasonService} from "@/service/season.service";
import toast from "react-hot-toast";
import {Modal} from "react-bootstrap";
import {UpdateSeasonRequest} from "@/lib/types/season";
import ImageUpload from "@/components/shared/ImageUpload";
import {useUploadImageStore} from "@/lib/store/store";
import {ClubRequest} from "@/lib/types/club";
import {clubService} from "@/service/clubs.service";

function CreateClub({show, onClose}: { show: boolean; onClose?: () => void }) {

    const queryClient = useQueryClient();
    const {season_list} = useFetchSeason();

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateSeasonId, setUpdateSeasonId] = useState("");
    const [newSeason, setNewSeason] = useState("");
    const [newClubName, setNewClubName] = useState("");
    const {imageUrl} = useUploadImageStore(state => state);
    const [isCreateClubLoading, setIsCreateClubLoading] = useState(false);
    const [isSeasonLoading, setIsSeasonLoading] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addingSeason, setAddingSeason] = useState(false);
    const [localSeasons, setLocalSeasons] = useState<any[]>([]);
    const [selectedSeasons, setSelectedSeasons] = useState<any[]>([]);


    const initializedRef = useRef(false);
    const [hoveredSeason, setHoveredSeason] = useState<string | null>(null);
    useEffect(() => {
        if (season_list && season_list.length > 0 && !initializedRef.current) {
            setLocalSeasons(season_list);
            initializedRef.current = true;
        }
    }, [season_list]);

    if (!show) return null;


    const toggleSeason = (seasonId: string) => {
        setSelectedSeasons((prev) =>
            prev.includes(seasonId) ? prev.filter((id) => id !== seasonId) : [...prev, seasonId]
        );
    };

    // TODO: func
    const handleAddNewSeason = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!newSeason.trim()) {
            toast.error("Season name cannot be empty");
            return;
        }
        if (isUpdate) {
            setIsSeasonLoading(true);
            updateSeasonMutation.mutate({season_id: updateSeasonId, season_name: newSeason});
        } else {
            setIsSeasonLoading(true);
            createSeasonMutation.mutate(newSeason);
        }
    };

    const handleUpdateSeason = (seasonId: string, seasonName: string) => {
        setUpdateSeasonId(seasonId);
        setIsUpdate(true);
        setAddingSeason(true);
        setNewSeason(seasonName);
    };


    const handleDeleteSeason = (seasonId: any) => {
        if (window.confirm("Are you sure you want to delete this season?")) {
            deleteSeasonMutation.mutate(seasonId);
        }
    };

    const handleCreateClub = () => {
        if (selectedSeasons.length === 0) {
            toast.error("Please select at least one season");
        } else {
            setIsCreateClubLoading(true);
            const requestBody: ClubRequest = {
                club_name: newClubName,
                club_logo: imageUrl,
                season_ids: selectedSeasons,
            };
            createClubMutation.mutate(requestBody);
        }
    }


    // TODO: mutation
    const createSeasonMutation = useMutation((req: string) => seasonService.createSeason(req), {
        onError: (error: any) => {
            toast.error(error?.message)
            setIsSeasonLoading(false);
        },
        onSuccess: (data: any) => {
            setAddingSeason(false);
            setNewSeason("");
            queryClient.invalidateQueries(['seasons'])
            setIsSeasonLoading(false);
            toast.success("Create Season Successfully");
        }
    })

    const updateSeasonMutation = useMutation((req: UpdateSeasonRequest) => seasonService.updateSeason(req.season_id, req.season_name), {
        onError: (error: any) => {
            toast.error(error?.message)
            setIsSeasonLoading(false);
        },
        onSuccess: (data: any) => {
            setIsUpdate(false);
            setAddingSeason(false);
            setNewSeason("");
            queryClient.invalidateQueries(['seasons'])
            setIsSeasonLoading(false);
            toast.success("Update Season Successfully");
        }
    })


    const deleteSeasonMutation = useMutation((req: string) => seasonService.deleteSeason(req), {
        onError: (error: any) => {
            toast.error(error?.message)
        },
        onSuccess: (data: any) => {
            queryClient.invalidateQueries(['seasons'])
            toast.success("Delete Season Successfully");
        }
    })

    const createClubMutation = useMutation((req: ClubRequest) => clubService.createClub(req), {
        onError: (error: any) => {
            toast.error(error?.message)
            setIsCreateClubLoading(false);
        },
        onSuccess: (data: any) => {
            queryClient.invalidateQueries(['clubs'])
            setIsCreateClubLoading(false);
            onClose?.();
            toast.success("Create Club Successfully");
        }
    })


    return (
        <>
            <Modal
                show={show}
                dialogClassName="modal-dialog modal-dialog-centered ks_mxwth1120px"
                contentClassName={"ks_mod_comp"}
            >
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">Create Club</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                ×
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <form>

                                {/* Image Upload */}
                                <ImageUpload/>

                                {/* Club Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Club Name</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Enter club name"
                                        onChange={(e) => setNewClubName(e.target.value)}
                                    />
                                </div>

                                {/* Select Season */}
                                <div className="mb-4 relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select
                                        Season</label>
                                    <div className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
                                         onClick={() => setDropdownOpen(!dropdownOpen)}>
                                        {
                                            selectedSeasons.length === 0 ? "Select seasons" :
                                                selectedSeasons.length > 3 ?
                                                    `${localSeasons.find(s => s.id === selectedSeasons[0])?.name}, 
                                         ${localSeasons.find(s => s.id === selectedSeasons[1])?.name}, 
                                         ${localSeasons.find(s => s.id === selectedSeasons[2])?.name} 
                                         +${selectedSeasons.length - 3} more`
                                                    : selectedSeasons.map(id => localSeasons.find(s => s.id === id)?.name).join(", ")
                                        }
                                    </div>

                                    {dropdownOpen && (
                                        <div
                                            className={`absolute w-full mb-2 bottom-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-60 overflow-y-auto`}>
                                            {season_list?.map((season: any) => {
                                                return (
                                                    <div
                                                        key={season.id}
                                                        className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                                                        onMouseEnter={() => setHoveredSeason(season.id)}
                                                        onMouseLeave={() => setHoveredSeason(null)}
                                                    >
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input type="checkbox"
                                                                   checked={selectedSeasons.includes(season.id)}
                                                                   onChange={() => toggleSeason(season.id)}/>
                                                            {season.name}
                                                        </label>

                                                        {hoveredSeason === season.id && (
                                                            <div className="flex items-center gap-2">
                                                                {/* Edit Button */}
                                                                <button
                                                                    type="button"
                                                                    className="text-blue-500 hover:text-blue-700"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleUpdateSeason(season.id, season.name);
                                                                    }}
                                                                >
                                                                    📝
                                                                </button>

                                                                {/* Delete Button */}
                                                                <button
                                                                    type="button"
                                                                    className="text-red-500 hover:text-red-700"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleDeleteSeason(season.id);
                                                                    }}
                                                                >
                                                                    ❌
                                                                </button>
                                                            </div>
                                                        )}


                                                    </div>
                                                )
                                            })}

                                            {/* Add New Season Input */}
                                            {addingSeason ? (
                                                <div className="flex items-center gap-2 p-2 border-t">
                                                    <input
                                                        type="text"
                                                        value={newSeason}
                                                        onChange={(e) => setNewSeason(e.target.value)}
                                                        placeholder="Enter new season"
                                                        className="w-full border px-2 py-1 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="bg-[#121b40] hover:bg-[#283C8CFF] rounded-md p-[7px] ks-txt-white"
                                                        disabled={isSeasonLoading}
                                                        onClick={handleAddNewSeason}
                                                    >
                                                        <span className="text-white">✔</span>
                                                    </button>
                                                    <button
                                                        className="bg-[#501414FF] hover:text-green-700 rounded-md p-[7px]"
                                                        onClick={() => setAddingSeason(false)}
                                                    >
                                                        <span className="text-red-900">❌</span>
                                                    </button>
                                                </div>
                                            ) : (
                                                <button onClick={() => setAddingSeason(true)}
                                                        className="w-full text-left px-3 py-2 text-blue-600 hover:bg-gray-100">+
                                                    Add New
                                                </button>
                                            )}
                                        </div>
                                    )}

                                </div>
                            </form>
                        </div>

                        {/* Footer */
                        }
                        <div className="flex justify-end gap-2 p-4 border-t">
                            <button onClick={onClose}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none">Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-[#121b40] text-white rounded-md hover:bg-[#283C8CFF] focus:outline-none"
                                disabled={isCreateClubLoading}
                                onClick={handleCreateClub}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default CreateClub;
