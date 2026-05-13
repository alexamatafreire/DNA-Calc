import { create } from 'zustand';

export const useWedgeStore = create((set) => ({
    mainCharWedges: {1:undefined,2:undefined,3:undefined,4:undefined,5:undefined,6:undefined,7:undefined,8:undefined,9:undefined},
    mainCharMeleeWedges: {1:undefined,2:undefined,3:undefined,4:undefined,5:undefined,6:undefined,7:undefined,8:undefined},
    mainCharRangedWedges: {1:undefined,2:undefined,3:undefined,4:undefined,5:undefined,6:undefined,7:undefined,8:undefined},
    teammate1Wedges: {1:undefined,2:undefined,3:undefined,4:undefined,5:undefined,6:undefined,7:undefined,8:undefined,9:undefined},
    teammate1WeaponWedges: {1:undefined,2:undefined,3:undefined,4:undefined,5:undefined,6:undefined,7:undefined,8:undefined},
    teammate2Wedges: {1:undefined,2:undefined,3:undefined,4:undefined,5:undefined,6:undefined,7:undefined,8:undefined,9:undefined},
    teammate2WeaponWedges: {1:undefined,2:undefined,3:undefined,4:undefined,5:undefined,6:undefined,7:undefined,8:undefined},
    updateMainCharWedges: (slot, wedge) => set((state) => ({mainCharWedges: {...state.mainCharWedges, [slot]: wedge}})),
    updateMainCharMeleeWedges: (slot, wedge) => set((state) => ({mainCharMeleeWedges: {...state.mainCharMeleeWedges, [slot]: wedge}})),
    updateMainCharRangedWedges: (slot, wedge) => set((state) => ({mainCharRangedWedges: {...state.mainCharRangedWedges, [slot]: wedge}})),
    updateTeammate1Wedges: (slot, wedge) => set((state) => ({teammate1Wedges: {...state.teammate1Wedges, [slot]: wedge}})),
    updateTeammate1WeaponWedges: (slot, wedge) => set((state) => ({teammate1WeaponWedges: {...state.teammate1WeaponWedges, [slot]: wedge}})),
    updateTeammate2Wedges: (slot, wedge) => set((state) => ({teammate2Wedges: {...state.teammate2Wedges, [slot]: wedge}})),
    updateTeammate2WeaponWedges: (slot, wedge) => set((state) => ({teammate2WeaponWedges: {...state.teammate2WeaponWedges, [slot]: wedge}}))
}))