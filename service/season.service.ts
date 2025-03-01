import {http} from "@/utils/http";
import {SeasonResponse} from "@/lib/types/season";

const ServiceId = {
    SEASON: '/api/v1',
}

const getAllSeason = async (): Promise<SeasonResponse[]> => {
    const result = await http.get(ServiceId.SEASON + `/seasons`);
    return result.data?.data;
}

export const seasonService = {
    getAllSeason,
}