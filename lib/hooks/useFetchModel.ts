import {useQuery} from "@tanstack/react-query";
import {modelService} from "@/service/model.service";
import useFetchProducts from "@/lib/hooks/useFetchProducts";

const useFetchModel = () =>{

    const {data,  isLoading, isError} = useQuery({
        queryKey: ["models"],
        queryFn: () => modelService.getModelList()
    });

    return {
        isLoading,
        isError,
        model_list: data ?? [],
        // pagination: data,
    }

}

export default useFetchModel;