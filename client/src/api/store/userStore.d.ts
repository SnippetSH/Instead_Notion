interface TUserState {
    name: string;
    KKEUJEOK: string;
    session: string;
    isSignedIn: boolean;
}

interface TUserActions {
    setUser: (user: TUserState) => void;
}

export type { TUserState, TUserActions }
