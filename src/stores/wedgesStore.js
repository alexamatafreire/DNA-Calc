import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWedgeStore = create()(
    persist(
        (set) => ({
            mainCharWedges: {1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:""},
            mainCharMeleeWedges: {1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""},
            mainCharRangedWedges: {1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""},
            teammate1Wedges: {1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:""},
            teammate1WeaponWedges: {1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""},
            teammate2Wedges: {1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:"",9:""},
            teammate2WeaponWedges: {1:"",2:"",3:"",4:"",5:"",6:"",7:"",8:""},
            updateMainCharWedges: (slot, wedge) => set((state) => ({mainCharWedges: {...state.mainCharWedges, [slot]: wedge}})),
            updateMainCharMeleeWedges: (slot, wedge) => set((state) => ({mainCharMeleeWedges: {...state.mainCharMeleeWedges, [slot]: wedge}})),
            updateMainCharRangedWedges: (slot, wedge) => set((state) => ({mainCharRangedWedges: {...state.mainCharRangedWedges, [slot]: wedge}})),
            updateTeammate1Wedges: (slot, wedge) => set((state) => ({teammate1Wedges: {...state.teammate1Wedges, [slot]: wedge}})),
            updateTeammate1WeaponWedges: (slot, wedge) => set((state) => ({teammate1WeaponWedges: {...state.teammate1WeaponWedges, [slot]: wedge}})),
            updateTeammate2Wedges: (slot, wedge) => set((state) => ({teammate2Wedges: {...state.teammate2Wedges, [slot]: wedge}})),
            updateTeammate2WeaponWedges: (slot, wedge) => set((state) => ({teammate2WeaponWedges: {...state.teammate2WeaponWedges, [slot]: wedge}}))
        }),
        {
            name: 'dnacalc-wedge-storage'
        }
    )
)