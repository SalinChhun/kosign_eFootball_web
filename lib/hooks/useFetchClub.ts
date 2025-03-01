import {useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {clubService} from "@/service/clubs.service";

const useFetchClubs = () =>{
    const searchParams = useSearchParams();
    const seasonId = searchParams.get("season_id");
    const reqParams = {
        season_id: seasonId,
        club_name: searchParams.get("club_name") ?? "",
    }

    const {data,  isLoading, isError} = useQuery({
        queryKey: ["clubs"],
        queryFn: () => clubService.getAllClubs(reqParams)
    });

    return {
        isLoading,
        isError,
        club_list: data ?? [],
    }
}

export default useFetchClubs;