import {useQuery} from "@tanstack/react-query";
import {userService} from "@/app/service/user.service";

const useFetchUser = () =>{

    const {data,  isLoading, isError} = useQuery({
        queryKey: ["user_list"],
        queryFn: () => userService.getUserList()
    });

    return {
        isLoading,
        isError,
        user_list: data?.users ?? [],
        // pagination: data,
    }

}

export default useFetchUser;
