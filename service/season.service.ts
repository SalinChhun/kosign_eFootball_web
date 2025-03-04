import {http} from "@/utils/http";
import {SeasonResponse} from "@/lib/types/season";

const ServiceId = {
    SEASON: '/api/v1',
}

const createSeason = (seasonName: any) => {
    return http.post(ServiceId.SEASON + `/season?season_name=${seasonName}`);
}


const getAllSeason = async (): Promise<SeasonResponse[]> => {
    const result = await http.get(ServiceId.SEASON + `/seasons`);
    return result.data?.data;
}

const updateSeason = (seasonId: any, seasonName: any) => {
    return http.put(ServiceId.SEASON + `/season/${seasonId}?season_name=${seasonName}`);
}

const deleteSeason = (seasonId: any) => {
    return http.delete(ServiceId.SEASON + `/season/${seasonId}`);
}

export const seasonService = {
    createSeason,
    getAllSeason,
    updateSeason,
    deleteSeason
}