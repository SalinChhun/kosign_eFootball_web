import {http} from "@/utils/http";
import {ClubResponse} from "@/lib/types/club";

const ServiceId = {
    CLUB: '/api/v1',
}

// const createProduct = (requestBody: any) => {
//     return http.post(ServiceId.PRODUCT + '/createNewProduct',requestBody);
// }

const getAllClubs = async (params: any): Promise<ClubResponse[]> => {
    const result = await http.get(ServiceId.CLUB + `/clubs`, {params});
    return result.data?.data;
}

export const clubService = {
    getAllClubs,
    // createProduct
}