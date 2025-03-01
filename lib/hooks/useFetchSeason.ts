import {useQuery} from "@tanstack/react-query";
import {seasonService} from "@/service/season.service";

const useFetchColor = () =>{

    const {data,  isLoading, isError} = useQuery({
        queryKey: ["seasons"],
        queryFn: () => seasonService.getAllSeason()
    });

    return {
        isLoading,
        isError,
        season_list: data ?? []
    }

}

export default useFetchColor;