import {useQuery} from "@tanstack/react-query";
import {modelService} from "@/service/model.service";
import {colorService} from "@/service/color.service";

const useFetchColor = () =>{

    const {data,  isLoading, isError} = useQuery({
        queryKey: ["colors"],
        queryFn: () => colorService.getColorList()
    });

    return {
        isLoading,
        isError,
        color_list: data ?? [],
        // pagination: data,
    }

}

export default useFetchColor;