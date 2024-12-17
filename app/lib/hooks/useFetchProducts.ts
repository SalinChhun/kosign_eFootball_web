import {useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {productService} from "@/app/service/product.service";

const useFetchProducts = () =>{
    const searchParams = useSearchParams();
    const reqParams = {
        page_size: searchParams.get("page_size") ?? 10,
        page_number: searchParams.get("page_number") ?? 0,
        search_value: searchParams.get("search_value") ?? "",
        sort_columns: searchParams.get("sort_columns") ?? "",
    }

    const {data,  isLoading, isError} = useQuery({
        queryKey: ["products"],
        queryFn: () => productService.getProductList(reqParams)
    });

    return {
        isLoading,
        isError,
        product_list: data?.products ?? [],
        pagination: data?.pagination,
    }
}

export default useFetchProducts;