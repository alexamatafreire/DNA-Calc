import { useCharacterStore } from "../stores/characterStore";
import { useWedgeStore } from "../stores/wedgesStore";
import { useWeaponStore } from '../stores/weaponStore';

export function calcularStats(wedgesList, personajes, armas) {
    let statsTotal = {};
    const statsWedges = calcularStatsWedges(wedgesList);
    juntarArrays(statsTotal, statsWedges);
    const statsBuffs = calcularStatsBuffs(personajes);
    juntarArrays(statsTotal, statsBuffs);
    const statsBuffsMelee = calcularStatsBuffsMelee(armas);
    juntarArrays(statsTotal, statsBuffsMelee);
    const statsBuffsRanged = calcularStatsBuffsRanged(armas);
    juntarArrays(statsTotal, statsBuffsRanged);
    Object.keys(statsTotal).forEach(key => {
        statsTotal[key] = sumarArray(statsTotal[key]);
    });
    return statsTotal;
}

function calcularStatsWedges(wedgesList) {
    const wedgesMain = useWedgeStore((state) => (state.mainCharWedges));
    let stats = {};
    if (Object.keys(wedgesList).length > 0) {
        Object.values(wedgesMain).forEach(wedge => {
            if (wedge != "") {
                Object.keys(wedgesList[wedge]["buffs"]).forEach(key => {
                    (stats[key] ??= []).push(wedgesList[wedge]["buffs"][key]);
                });
            }
        });
    }
    return stats;
}

function calcularStatsBuffs(personajes) {
    const listaBuffs = useCharacterStore((state) => (state.listaBuffs));
    let stats = {};
    if (personajes["Lady Nifle"] != undefined) {listaBuffs.forEach(buffID => {
        const personaje = buffID.split("_")[0];
        const index = parseInt(buffID.split("_")[1]);
        Object.keys(personajes[personaje]["buffs"][index]["effects"]).forEach(key => {
            (stats[key] ??= []).push(personajes[personaje]["buffs"][index]["effects"][key]);
        });
    });}
    return stats;
}

function calcularStatsBuffsMelee(armas) {
    const listaBuffs = useWeaponStore((state) => (state.meleeBuffs));
    const smelt = useWeaponStore((state) => state.meleeSmelt);
    let stats = {};
    if (armas["Eternal Farewell"] != undefined) {listaBuffs.forEach(buffID => {
        const arma = buffID.split("_")[0];
        const index = parseInt(buffID.split("_")[1]);
        Object.keys(armas[arma]["buffs"][index]["effects"]).forEach(key => {
            (stats[key] ??= []).push(armas[arma]["buffs"][index]["effects"][key]*(1+(smelt/5)));
        });
    });}
    return stats;
}

function calcularStatsBuffsRanged(armas) {
    const listaBuffs = useWeaponStore((state) => (state.rangedBuffs));
    const smelt = useWeaponStore((state) => state.rangedSmelt);
    let stats = {};
    if (armas["Eternal Farewell"] != undefined) {listaBuffs.forEach(buffID => {
        const arma = buffID.split("_")[0];
        const index = parseInt(buffID.split("_")[1]);
        Object.keys(armas[arma]["buffs"][index]["effects"]).forEach(key => {
            (stats[key] ??= []).push(armas[arma]["buffs"][index]["effects"][key]*(1+(smelt/5)));
        });
    });}
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