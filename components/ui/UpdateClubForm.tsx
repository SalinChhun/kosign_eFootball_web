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
import {UpdateClubRequest} from "@/lib/types/club";
import {clubService} from "@/service/clubs.service";
import {Spinner} from "react-bootstrap";

function UpdateClubForm({show, onClose, updateData}: { show: boolean; onClose?: () => void, updateData?: any }) {

    const queryClient = useQueryClient();
    const {season_list} = useFetchSeason();

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateSeasonId, setUpdateSeasonId] = useState("");
    const [newSeason, setNewSeason] = useState("");
    const [newClubName, setNewClubName] = useState(updateData?.name || "");
    const {imageUrl, setImageUrl} = useUploadImageStore(state => state);
    const [isCreateClubLoading, setIsCreateClubLoading] = useState(false);
    const [isSeasonLoading, setIsSeasonLoading] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addingSeason, setAddingSeason] = useState(false);
    const [hoveredSeason, setHoveredSeason] = useState<string | null>(null);
    const [selectedSeasons, setSelectedSeasons] = useState<any[]>(
        updateData?.seasons?.map((season: { season_id: number }) => season.season_id) || []
    );


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

    const handleUpdateClub = () => {
        if (selectedSeasons.length === 0) {
            toast.error("Please select at least one season");
        } else {
            setIsCreateClubLoading(true);
            const requestBody: UpdateClubRequest = {
                club_id: updateData?.id,
                club_name: newClubName,
                club_logo: imageUrl,
                season_ids: selectedSeasons,
            };
            updateClubMutation.mutate(requestBody);
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

    const updateClubMutation = useMutation((req: UpdateClubRequest) => clubService.updateClub(req), {
        onError: (error: any) => {
            toast.error(error?.message)
            setIsCreateClubLoading(false);
        },
        onSuccess: (data: any) => {
            queryClient.invalidateQueries(['clubs'])
            setIsCreateClubLoading(false);
            setImageUrl(null);
            onClose?.();
            toast.success("Updated Club Successfully");
        }
    })

    if (!show) return null;


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
                            <h3 className="text-lg font-semibold">Update Club</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="32" height="32" rx="16" fill="#C2C5DC" fillOpacity="0.9"/>
                                    <path d="M11.022 20.9726C10.6538 20.6107 10.6665 19.9696 11.0093 19.6269L14.6401 15.996L11.0093 12.3778C10.6665 12.0287 10.6538 11.3939 11.022 11.0258C11.3901 10.6513 12.0312 10.664 12.374 11.0131L15.9985 14.6376L19.623 11.0131C19.9785 10.6576 20.6006 10.6576 20.9688 11.0258C21.3433 11.3939 21.3433 12.016 20.9814 12.3778L17.3633 15.996L20.9814 19.6205C21.3433 19.9823 21.3369 20.598 20.9688 20.9726C20.6069 21.3407 19.9785 21.3407 19.623 20.9853L15.9985 17.3607L12.374 20.9853C12.0312 21.3344 11.3965 21.3407 11.022 20.9726Z" fill="#0A0019"/>
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <form>

                                {/* Image Upload */}
                                <ImageUpload image={updateData?.image}/>

                                {/* Club Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Club Name</label>
                                    <input
                                        value={newClubName}
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
                                                    `${season_list.find(s => s.id === selectedSeasons[0])?.name}, 
                                         ${season_list.find(s => s.id === selectedSeasons[1])?.name}, 
                                         ${season_list.find(s => s.id === selectedSeasons[2])?.name} 
                                         +${selectedSeasons.length - 3} more`
                                                    : selectedSeasons.map(id => season_list.find(s => s.id === id)?.name).join(", ")
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
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24"
                                                                         stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                                    </svg>
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
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         className="h-4 w-4 text-red-600"
                                                                         fill="none" viewBox="0 0 24 24"
                                                                         stroke="currentColor">
                                                                        <path strokeLinecap="round"
                                                                              strokeLinejoin="round" strokeWidth={2}
                                                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                                    </svg>
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
                                                        <span className="text-white">
                                                            {
                                                                isSeasonLoading ?
                                                                    <Spinner animation="border" style={{width: 18, height: 18, marginRight: 5}} role="status">
                                                                    </Spinner> : "✔"
                                                            }
                                                        </span>
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
                                onClick={handleUpdateClub}
                            >
                                {
                                    isCreateClubLoading ?
                                    <Spinner animation="border" style={{width: 18, height: 18, marginRight: 5}} role="status">
                                    </Spinner> : "Save"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default UpdateClubForm;
