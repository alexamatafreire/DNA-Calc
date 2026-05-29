import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCharacterStore = create()(
    persist(
        (set) => ({
            mainChar: "Lady Nifle",
            mainCharLVL: 1,
            mainCharELVL: 1,
            mainCharQLVL: 1,
            mainCharPassiveLVL: 1,
            listaBuffs: [],
            buffStacks: {},
            teammate1: "Fina",
            teammate2: "Fushu",
            setMainChar: (char) => set({mainChar: char}),
            setMainCharLVL: (num) => set({mainCharLVL: num}),
            setMainCharELVL: (num) => set({mainCharELVL: num}),
            setMainCharQLVL: (num) => set({mainCharQLVL: num}),
            setMainCharPassiveLVL: (num) => set({mainCharPassiveLVL: num}),
            setListaBuffs: (buffs) => set({listaBuffs: buffs}),
            setBuffStacks: (buff, stacks) => set((state) => ({buffStacks: {...state.buffStacks, [buff]: stacks}})),
            setTeammate1: (char) => set({teammate1: char}),
            setTeammate2: (char) => set({teammate2: char})
        }),
        {
            name: 'dnacalc-char-select-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)