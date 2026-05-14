import React from 'react'
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
  
  return (
    <div className='izquierda'>
      <h4>Character</h4>
      <div className="character-wrapper">
        <img src={`/fotos_personajes/completas/${personajeSeleccionadoMain}.png`} className='rounded-circle border border-2 border-dark' width={100} height={100} alt="" />
        <div className="character-selector-level">
          <select className="form-select border-2" name="personajeSelec" value={personajeSeleccionadoMain} onChange={e => setPersonajeSeleccionadoMain(e.target.value)}>
            {Object.entries(personajes).sort().map(([nombre]) => (
              <option value={nombre} key={nombre}>{nombre}</option>
            ))}
          </select>
          <div className="">
            <div className="titulo-slider">Level</div>
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
      <DemonWedges wedgesList={wedgesList} slots={slots} setSlots={setSlots} ></DemonWedges>
      <br />
      <h4>Buffs</h4>
      {personajes[personajeSeleccionadoMain] && personajes[personajeSeleccionadoMain].buffs ? personajes[personajeSeleccionadoMain].buffs.map((buff) => (
        <div key={`${personajeSeleccionadoMain}-${buff.nombre}`} className="tarjeta-buffs">
          <div className="checkbox-titulo">
            <input type="checkbox" className="form-check-input border-dark"/>
            <h5>{buff.nombre}</h5>
          </div>
          <p>{buff.desc}</p>
          {buff.stacks && <input type="number" className="form-control"></input>}
        </div>
      )) : ""}
    </div>
  )
}

export default PersonajePrincipal