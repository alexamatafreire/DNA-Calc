import React from 'react'
import { useState } from 'react';
import DemonWedges from '../DemonWedges';
import { useWedgeStore } from '../../stores/wedgesStore';
import { useCharacterStore } from '../../stores/characterStore';

const PersonajePrincipal = ({ wedgesList, personajes}) => {
  const slots = useWedgeStore((state) => state.mainCharWedges);
  const setSlots = useWedgeStore((state) => state.updateMainCharWedges);
  const personajeSeleccionadoMain = useCharacterStore((state) => state.mainChar);
  const setPersonajeSeleccionadoMain = useCharacterStore((state) => state.setMainChar);
  const nivelMain = useCharacterStore((state) => state.mainCharLVL);
  const setNivelMain = useCharacterStore((state) => state.setMainCharLVL);
  const nivelEMain = useCharacterStore((state) => state.mainCharELVL);
  const setNivelEMain = useCharacterStore((state) => state.setMainCharELVL);
  const nivelQMain = useCharacterStore((state) => state.mainCharQLVL);
  const setNivelQMain = useCharacterStore((state) => state.setMainCharQLVL);
  const nivelPasivaMain = useCharacterStore((state) => state.mainCharPassiveLVL);
  const setNivelPasivaMain = useCharacterStore((state) => state.setMainCharPassiveLVL);
  const listaBuffs = useCharacterStore((state) => state.listaBuffs);
  const setListaBuffs = useCharacterStore((state) => state.setListaBuffs);
  const buffStacks = useCharacterStore((state) => state.buffStacks);
  const setBuffStacks = useCharacterStore((state) => state.setBuffStacks);
  const [favoritos, setFavoritos] = useState([]);

  const handleBuffs = (e) => {
    setListaBuffs(e.target.checked ? [...listaBuffs, e.target.name] : listaBuffs.filter((buff) => buff !== e.target.name));
  }

  const handleFavoritos = (e) => {
    setFavoritos(!favoritos.includes(personajeSeleccionadoMain) ? [...favoritos, personajeSeleccionadoMain] : favoritos.filter((personaje) => personaje !== personajeSeleccionadoMain));
  }
  
  return (
    <div className='izquierda'>
      <style>
        {`.level-slider::-webkit-slider-thumb {
          border: 3px solid ${personajes[personajeSeleccionadoMain]?.color};
          box-shadow: -1000px 0 0 995px ${personajes[personajeSeleccionadoMain]?.color};
        }
        .imagen-personaje {
          border: 2px solid ${personajes[personajeSeleccionadoMain]?.color};
        }`}
      </style>
      <h4>Character</h4>
      <div className="character-wrapper">
        <img src={`/fotos_personajes/${personajeSeleccionadoMain}.png`} className='rounded-circle imagen-personaje' width={100} height={100} alt="" />
        <div className="character-selector-level">
          <div className='character-selector-fav'>
            <select className="form-select border-2" name="personajeSelec" value={personajeSeleccionadoMain} onChange={e => setPersonajeSeleccionadoMain(e.target.value)}>
              <optgroup label='Favorites'>
                {favoritos.sort().map((nombre) => (
                  <option value={nombre} key={"favs_"+nombre}>{nombre}</option>
                ))}
              </optgroup>
              <optgroup label='Non-favorites'>
                {Object.keys(personajes).filter((personaje) => !favoritos.includes(personaje)).sort().map((nombre) => (
                  <option value={nombre} key={nombre}>{nombre}</option>
                ))}
              </optgroup>
            </select>
            <i className={`estrella-fav bi ${favoritos.includes(personajeSeleccionadoMain) ? "bi-star-fill" : "bi-star"}`} onClick={handleFavoritos}></i>
          </div>
          <div className="">
            <div className="titulo-slider justificar-izquierda">Level</div>
            <div className="slider-wrapper">
              <input type="range" className='level-slider' name="nivelPersonaje" min={1} max={80} defaultValue={nivelMain} onChange={e => setNivelMain(e.target.value)}/>
              <div className='numero-slider'>{nivelMain}</div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h4>Skills</h4>
      <div className="skills-wrapper">
        <div className="titulo-slider">E</div>
        <input type="range" className='level-slider' name="nivelE" min={1} max={12} defaultValue={nivelEMain} onChange={e => setNivelEMain(e.target.value)}/>
        <div className='numero-slider'>{nivelEMain}</div>
        <div className="titulo-slider">Q</div>
        <input type="range" className='level-slider' name="nivelQ" min={1} max={12} defaultValue={nivelQMain} onChange={e => setNivelQMain(e.target.value)}/>
        <div className='numero-slider'>{nivelQMain}</div>
        <div className="titulo-slider">Passive</div>
        <input type="range" className='level-slider' name="nivelPasiva" min={1} max={12} defaultValue={nivelPasivaMain} onChange={e => setNivelPasivaMain(e.target.value)}/>
        <div className='numero-slider'>{nivelPasivaMain}</div>
      </div>
      <br />
      <h4>Wedges</h4>
      <DemonWedges wedgesList={wedgesList} slots={slots} setSlots={setSlots} tipo={personajes[personajeSeleccionadoMain]?.tipo??"any"} ></DemonWedges>
      <br />
      <h4>Buffs</h4>
      <div className='lista-buffs'>
        {personajes[personajeSeleccionadoMain] && personajes[personajeSeleccionadoMain].buffs ? personajes[personajeSeleccionadoMain].buffs.filter((buff) => buff.target != "allies").map((buff) => (
          <div key={`${personajeSeleccionadoMain}-${buff.id}`} className="tarjeta-buffs">
            <div className="checkbox-titulo">
              <input type="checkbox" className="form-check-input border-dark" checked={listaBuffs.includes(buff.id)} name={buff.id} onChange={handleBuffs}/>
              <h5>{buff.nombre}</h5>
            </div>
            <p>{buff.desc}</p>
            <div className='buff-stacks'>
              {buff.stacks && <input type="number" defaultValue={buffStacks[buff.id]??buff.stacks[0]} min={buff.stacks[0]} max={buff.stacks[1]} onChange={(e) => {if (e.target.value > buff.stacks[1]) {e.target.value = buff.stacks[1]} setBuffStacks(buff.id, parseInt(e.target.value))}} className="form-control"></input>}
              {buff.stacks && <p>Min: {buff.stacks[0]} - Max: {buff.stacks[1]}</p>}
            </div>
          </div>
        )) : ""}
      </div>
    </div>
  )
}

export default PersonajePrincipal