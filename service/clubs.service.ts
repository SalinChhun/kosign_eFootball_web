import {http} from "@/utils/http";
import {ClubRequest, ClubResponse} from "@/lib/types/club";

const ServiceId = {
    CLUB: '/api/v1',
}

const createClub = (requestBody: ClubRequest) => {
    return http.post(ServiceId.CLUB + '/club',requestBody);
}

const getAllClubs = async (params: any): Promise<ClubResponse[]> => {
    const result = await http.get(ServiceId.CLUB + `/clubs`, {params});
    return result.data?.data;
}

export const clubService = {
    getAllClubs,
    createClub
}