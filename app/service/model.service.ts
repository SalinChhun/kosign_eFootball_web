import {http} from "@/utils/http";
import {BaseResponse, ModelResponse} from "@/app/lib/types/common";

const ServiceId = {
    MODEL: '/api/v1/model',
}

const getModelList = async (): Promise<ModelResponse[]> => {
    const result = await http.get(ServiceId.MODEL + `/getAllModel`);
    return result.data?.data;
}

export const modelService = {
    getModelList,
}