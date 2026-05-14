import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCharacterStore = create()(
    persist(
        (set) => ({
            mainChar: "Lady Nifle",
            mainCharLVL: 1,
            mainCharELVL: 1,
            mainCharQLVL: 1,
            mainCharPassiveLVL: 1,
            listaBuffs: [],
            teammate1: "Su Yi",
            teammate2: "Lisbell",
            setMainChar: (char) => set({mainChar: char}),
            setMainCharLVL: (num) => set({mainCharLVL: num}),
            setMainCharELVL: (num) => set({mainCharELVL: num}),
            setMainCharQLVL: (num) => set({mainCharQLVL: num}),
            setMainCharPassiveLVL: (num) => set({mainCharPassiveLVL: num}),
            setListaBuffs: (buffs) => set({listaBuffs: buffs}),
            setTeammate1: (char) => set({teammate1: char}),
            setTeammate2: (char) => set({teammate2: char})
        }),
        {
            name: 'char-select-storage'
        }
    )
)