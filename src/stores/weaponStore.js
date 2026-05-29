import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useWeaponStore = create()(
    persist(
        (set) => ({
            melee: "Eternal Farewell",
            meleeSmelt: 0,
            ranged: "Embla Inflorescence",
            rangedSmelt: 0,
            meleeBuffs: [],
            meleeBuffStacks: {},
            rangedBuffs: [],
            rangedBuffStacks: {},
            setMelee: (weapon) => set({melee: weapon}),
            setMeleeSmelt: (num) => set({meleeSmelt: num}),
            setRanged: (weapon) => set({ranged: weapon}),
            setRangedSmelt: (num) => set({rangedSmelt: num}),
            setMeleeBuffs: (buffs) => set({meleeBuffs: buffs}),
            setMeleeBuffStacks: (buff, stacks) => set((state) => ({meleeBuffStacks: {...state.meleeBuffStacks, [buff]: stacks}})),
            setRangedBuffs: (buffs) => set({rangedBuffs: buffs}),
            setRangedBuffStacks: (buff, stacks) => set((state) => ({rangedBuffStacks: {...state.rangedBuffStacks, [buff]: stacks}})),
        }),
        {
            name: 'dnacalc-weapon-select-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)