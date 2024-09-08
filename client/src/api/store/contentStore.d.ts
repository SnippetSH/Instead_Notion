interface IContentState {
    title: string
    content: string
}

interface IContentActions {
    setTitle: (title: string) => void
    setContent: (content: string) => void
}

export type TContentState = IContentState & IContentActions