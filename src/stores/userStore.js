import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create()(
    persist(
        (set) => ({
            username: "none",
            favoriteList: [],
            setUsername: (name) => set({username: name}),
            setFavoriteList: (favs) => set({favoriteList: favs})
        }),
        {
            name: 'dnacalc-user-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)