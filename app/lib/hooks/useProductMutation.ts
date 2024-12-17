import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {CreateProductRequest} from "@/app/lib/types/common";
import {productService} from "@/app/service/product.service";

const createProduct = (request: CreateProductRequest) => {
    return productService.createProduct(request)
}
const useCreateProduct = () => {

    const queryClient = useQueryClient()
    const mutation = useMutation((req: CreateProductRequest) => createProduct(req),{
        onError: (error: any) => {
            toast.error(error?.message)
            console.log("(error?.message)",error?.message)
        },
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Create new product successfully')
        }
    })

    return {
        mutation: mutation.mutate,
        isLoading: mutation.isLoading,
        data: mutation.data,
        isSuccess: mutation.isSuccess,
    }
}
export const useProductMutation = {
    useCreateProduct,
}

export default useProductMutation;