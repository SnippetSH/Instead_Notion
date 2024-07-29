interface UserType {
    name: string,
    key: string,
    permission: 'guest' | 'user' | 'admin' | 'unlogin'
}

interface UserActionType {
    setUser: ({name, key, permission}: UserType) => void,
    clearUser: () => void
}

export type { UserType, UserActionType };