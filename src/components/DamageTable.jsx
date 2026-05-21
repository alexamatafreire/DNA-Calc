import React, { useState, useEffect } from 'react'
import './DamageTable.css'
import InfoTooltip from './InfoTooltip';
import { useCharacterStore } from '../stores/characterStore';
import { calcularStats } from '../utils/calcularstats';

const nivelMult = [1, 1.0422, 1.086, 1.1305, 1.1774, 1.3988, 1.4474, 1.5012, 1.5589, 1.6157, 1.8331, 1.8921, 1.9527, 2.0162, 2.0813, 2.3128, 2.3809, 2.4505, 2.5186, 2.5897, 2.8339, 2.9053, 2.9795, 3.0538, 3.1288, 3.3098, 3.5538, 3.6327, 3.7117, 3.7921, 4.1028, 4.1842, 4.2765, 4.3725, 4.4705, 4.8047, 4.9053, 5.0059, 5.1021, 5.1933, 5.5294, 5.621, 5.7141, 5.8079, 5.9032, 6.2508, 6.348, 6.4451, 6.5437, 6.6416, 6.8191, 7.1079, 7.2107, 7.3127, 7.4155, 7.7876, 7.8938, 7.9999, 8.1061, 8.5685, 8.6863, 8.803, 8.9214, 9.0424, 9.7101, 9.7488, 9.8684, 9.9916, 10.1107, 10.2122, 11.236, 11.3504, 11.459, 11.5667, 11.9809, 12.093, 12.2051, 12.3222, 12.4372, 12.5522];
let listaBuffs;

const DamageTable = ({wedgesList, personajes, armas}) => {
    const personaje = personajes[useCharacterStore((state) => state.mainChar)];
    const nivelMain = useCharacterStore((state) => state.mainCharLVL);
    const nivelEMain = useCharacterStore((state) => state.mainCharELVL);
    const nivelQMain = useCharacterStore((state) => state.mainCharQLVL);
    const nivelPasivaMain = useCharacterStore((state) => state.mainCharPassiveLVL);
    const mejoras = calcularStats(wedgesList, personajes, armas);
    listaBuffs = useCharacterStore((state) => state.listaBuffs);
    const statsPersonaje = {
        "ATK": ((personaje?.ATK * nivelMult[nivelMain-1] * (1+(mejoras["ATK"] ?? 0))) + (mejoras["Flat ATK"] ?? 0)) * (1+(mejoras["Elemental ATK"] ?? 0)),
        "HP": personaje?.HP * nivelMult[nivelMain-1] * (1+(mejoras["HP"] ?? 0)),
        "Sanity" : personaje?.Sanity * (1+(mejoras["Sanity"] ?? 0)),
        "Skill Intensity": mejoras["Skill Intensity"],
        "Skill DMG": mejoras["Skill DMG"],
        "Morale": mejoras["Morale"],
        "Skill Range": mejoras["Skill Range"],
        "Skill Efficiency": 1+mejoras["Skill Efficiency"],
        "Current HP": 1
    }
    const niveles = {"e" : nivelEMain, "q" : nivelQMain, "pasiva" : nivelPasivaMain};
    return (
        <div className='damage-table'>
            <div className='head-habilidades'>
                <div>Stats</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Stat</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ATK</td>
                        <td>{!isNaN(statsPersonaje["ATK"]) && Math.round(statsPersonaje["ATK"]*100)/100}</td>
                    </tr>
                    <tr>
                        <td>HP</td>
                        <td>{!isNaN(statsPersonaje["HP"]) && Math.round(statsPersonaje["HP"]??0)}</td>
                    </tr>
                    <tr>
                        <td>Sanity</td>
                        <td>{!isNaN(statsPersonaje["Sanity"]) && Math.round(statsPersonaje["Sanity"]??0)}</td>
                    </tr>
                    <tr>
                        <td>Skill Intensity</td>
                        <td>{Math.round((statsPersonaje["Skill Intensity"]?? 0)*100+100)}%</td>
                    </tr>
                </tbody>
            </table>
            {personaje && Object.entries(personaje.habilidades).map(([key, habilidad]) => (
                <React.Fragment key={`tablaHabilidades-${key}`}>
                <div className='head-habilidades'>
                    <div>{habilidad.tipo} | {habilidad.nombre}</div>
                    <InfoTooltip id='info' title={(habilidad.descripcion).map((linea, index) => 
                        <p key={`descripcion${key}-${index}`} className={index % 2 == 0 ? 'subtitulo-habilidad' : ''}>{linea}</p>
                    )}></InfoTooltip>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Base</th>
                            <th>DMG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habilidad ? habilidad.estadisticas.map((est, index) => (
                            <React.Fragment key={index}>
                                {est.nombre != "misc" ? <tr className='divisor-habilidad'><td colSpan={3}><p>{est.nombre}</p></td></tr> : ""}
                                {est.lineas.map((linea, index) => (
                                    <React.Fragment key={`lineasE-${index}`}>
                                        <tr>
                                            <td className='nombre-stat'>
                                                <p>{linea.nombre}</p>
                                            </td>
                                            <td className='base-stat'>
                                                <p>{procesarPatron(linea, niveles[key]? niveles[key] : 1, statsPersonaje)}</p>
                                            </td>
                                            <td className='dano-stat'>
                                                <p>{calculosDañoHeal(linea, statsPersonaje, niveles[key]? niveles[key] : 1)}</p>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        )) : <tr>
                            <td>
                                <p>Cargando / Error</p>
                            </td>
                        </tr>}
                    </tbody>
                </table>
                </React.Fragment>
            ))}
        </div>
    )
}

function procesarPatron(linea, nivel, stats, daño=false){
    // Procesa los patrones personalizados de cada linea de habilidad. Cuando encuentra un %, usa la letra como tipo y el numero como indice del array de stats.
    let partes = linea.patron.split(" ");
    let resultado = "";
    partes.forEach(parte => {
        let añadir = "";
        if (parte[0] == "%") {
            let mult = 1;
            linea.escala.forEach(element => {
                mult = mult * (Math.pow(stats[element[0]]? 1 + stats[element[0]] : 1, element[1]));
            });
            añadir = numeroTipo(calcularPorcentajeNivel(linea.valor[parte[2]-1], nivel)* mult, parte[1]);
        } else {
            añadir = parte;
        }
        resultado = `${resultado}${añadir} `;
    });
    return resultado.trimEnd();
}

function numeroTipo(num, tipo) {
    switch(tipo) {
        case "n": //normal
            return num;
        case "p": //porcentaje
            return `${Math.round(num*10000)/100}%`;
        case "m": //metros
            return `${Math.round(num)}m`;
        case "s": //segundos
            return `${num}s`;
        case "r": //redondear
            return `${Math.round(num)}`;
        default:
            return num;
    }
}

function calcularPorcentajeNivel(a, nivel) {
    // Comprueba si "a" es un array, y si lo es calcula el valor de cada nivel basandose en el valor del nivel 1 y 10
    if (a.length) {
        let incremento = (a[1]-a[0])/9;
        return Math.round((a[0]+(incremento*(nivel-1)))*10000)/10000;
    } else {
        return a;
    }
}

function getStat(dict, key) {
    // Forma segura de recuperar un valor de un diccionario, especificamente para los stats.
    return dict[key]? dict[key] : 0;
}

function sumarArray(arr) {
    return arr ? arr.reduce((acc, current) => {
        return acc + current
    },0) : 0;
}

// function sumarStats(stats) {
//     // Suma los stats de varias fuentes, que pueden ser numeros o arrays de numeros
//     let valor = 0;
//     Object.values(stats).forEach(element => {
//         if (element[0]) {
//             valor += sumarArray(element);
//         } else {
//             valor += element;
//         }
//     });
//     return valor;
// }

function calculosDañoHeal(linea, stats, nivel) {
    if (!linea.calcs) {return ""}
    let valor = 0;
    linea.calcs.forEach(parte => {
        let x = calcularPorcentajeNivel(parte.value, nivel);
        let sum = 0;
        parte.scale.forEach(element => {
            if(linea.daño && (element == "ATK" || element == "HP" || element == "DEF")) {
                x *= 1+sum;
                x = calcularDañoPorcentaje(x, element, stats);
            } else {
                sum += getStat(stats, element);
            }
        });
        valor += x * (parte.mult? parte.mult : 1);
    });
    return Math.round(valor);
}

function calcularDañoPorcentaje(porcentaje, statEscala, stats) {
    // Usa la formula de calculo de daño propia del juego
    let baseDMG = (porcentaje*(1+getStat(stats, "Skill DMG")))*getStat(stats, statEscala);
    let enemyDEFMult = (300+getStat(stats, "Level Diff"))/(300+getStat(stats, "Level Diff")+getStat(stats, "Enemy DEF"));
    let enemyRESMult = (1+getStat(stats, "PEN"))*(1+getStat(stats, "RES Shred"))*(1+getStat(stats, "Elem Advantage"));
    let resolveMult = 1+(getStat(stats, "Resolve")*2*((1-getStat(stats, "Current HP"))*2+1)*(1-getStat(stats, "Current HP")));
    let moraleMult = 1+(getStat(stats, "Morale")*getStat(stats, "Current HP"));

    let dañoTotal = baseDMG * enemyDEFMult * enemyRESMult * resolveMult * moraleMult * (1+getStat(stats, "DMG Boost")) * (1+getStat(stats, "DMG Bonus")) * (1+getStat(stats, "Final DMG Mult"));
    return Math.round(dañoTotal);
}

export default DamageTable