import {http} from "@/utils/http";
import {UserResponse} from "@/app/lib/types/common";

const ServiceId = {
    USERS: '/api/v1/users',
}

const getUserList = async (): Promise<UserResponse> => {
    const result = await http.get(ServiceId.USERS + `/getAllUser`);
    return result.data?.data;
}

export const userService = {
    getUserList,
}