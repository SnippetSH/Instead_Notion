import { create } from "zustand";
import type { UserType, UserActionType } from "@/4_shared/type/type_UserStore";

const UserStore = create<UserType & UserActionType>((set) => ({
    name: '',
    key: '',
    permission: 'unlogin',
    setUser: ({name, key, permission}) => set(() => ({name: name, key: key, permission: permission})),
    clearUser: () => set(() => ({name: '', key: '', permission: 'unlogin'}))
}))

export { UserStore };