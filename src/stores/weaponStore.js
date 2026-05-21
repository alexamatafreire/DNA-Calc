import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWeaponStore = create()(
    persist(
        (set) => ({
            melee: "Eternal Farewell",
            meleeSmelt: 0,
            ranged: "Eternal Farewell",
            rangedSmelt: 0,
            meleeBuffs: [],
            rangedBuffs: [],
            setMelee: (weapon) => set({melee: weapon}),
            setMeleeSmelt: (num) => set({meleeSmelt: num}),
            setRanged: (weapon) => set({ranged: weapon}),
            setRangedSmelt: (num) => set({rangedSmelt: num}),
            setMeleeBuffs: (buffs) => set({meleeBuffs: buffs}),
            setRangedBuffs: (buffs) => set({rangedBuffs: buffs})
        }),
        {
            name: 'dnacalc-weapon-select-storage'
        }
    )
)