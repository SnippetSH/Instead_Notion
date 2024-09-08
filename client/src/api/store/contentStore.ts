import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"
import { TContentState } from "./contentStore.d"
import { createSelectors } from "../createSelectors"

const useContentStore = createSelectors(
    create<TContentState>()(
        subscribeWithSelector(
            persist(
                (set) => ({
                    content: '',
                    title: '',
                    setContent: (content: string) => set({ content }),
                    setTitle: (title: string) => set(() => {
                        const newTitle = `<h1 classname="text-4xl font-bold">${title}</h1>`
                        return { title: newTitle }
                    }),
                }),
                {
                    name: 'content',
                }
            )
        )
    )
)

export { useContentStore }