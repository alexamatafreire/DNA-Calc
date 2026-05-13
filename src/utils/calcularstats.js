import { useCharacterStore } from "../stores/characterStore";
import { useWedgeStore } from "../stores/wedgesStore";

export function calcularStats(wedgesList) {
    let statsTotal = {};
    const statsWedges = calcularStatsWedges(wedgesList);
    juntarArrays(statsTotal, statsWedges);
    Object.keys(statsTotal).forEach(key => {
        statsTotal[key] = sumarArray(statsTotal[key]);
    });
    return statsTotal;
}

function calcularStatsWedges(wedgesList) {
    const wedgesMain = useWedgeStore((state) => (state.mainCharWedges));
    let stats = {};
    Object.values(wedgesMain).forEach(wedge => {
        if (wedge != undefined) {
            Object.keys(wedgesList[wedge]["buffs"]).forEach(key => {
                (stats[key] ??= []).push(wedgesList[wedge]["buffs"][key]);
            });
        }
    });
    return stats;
}

function sumarArray(arr) {
    return arr[0] ? arr.reduce((acc, current) => {
        return acc + current
    },0) : arr;
}

function juntarArrays(arr1, arr2) {
    Object.keys(arr2).forEach(key => {
        (arr1[key] ??= []).push(...arr2[key]);
    });
}