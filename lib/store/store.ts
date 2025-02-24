import {create} from "zustand";

export const useLoginStore = create<{
    email: any,
    password: any,
    setEmail: (email: any) => void,
    setPassword: (email: any) => void
}>(set => ({
    email: '',
    password: '',
    setEmail: (email: any) => set((state): any => ({...state, email})),
    setPassword: (password: any) => set((state): any => ({...state, password})),
}));

export const useProductStore = create<{
    updateData: any,
    open: boolean,
    isUpdate: boolean,
    setOpen: (open: boolean) => void
    setIsUpdate: (isUpdate: boolean) => void
    setUpdateData: (updateData: any) => void
}>(set => ({
    updateData: {},
    open: false,
    isUpdate: false,
    setOpen: (open: boolean) => set((state): any => ({...state, open})),
    setIsUpdate: (isUpdate: boolean) => set((state): any => ({...state, isUpdate})),
    setUpdateData: (updateData: any) => set((state): any => ({...state, updateData})),
}))