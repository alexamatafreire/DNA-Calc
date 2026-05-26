import React from 'react'
import { useCharacterStore } from '../../stores/characterStore';

const Equipo = ({ personajes }) => {
  const teammate1 = useCharacterStore((state) => state.teammate1);
  const setTeammate1 = useCharacterStore((state) => state.setTeammate1);
  const teammate2 = useCharacterStore((state) => state.teammate2);
  const setTeammate2 = useCharacterStore((state) => state.setTeammate2);
  const listaBuffs = useCharacterStore((state) => state.listaBuffs);
  const setListaBuffs = useCharacterStore((state) => state.setListaBuffs);
  const buffStacks = useCharacterStore((state) => state.buffStacks);
  const setBuffStacks = useCharacterStore((state) => state.setBuffStacks);

  const handleBuffs = (e) => {
    setListaBuffs(e.target.checked ? [...listaBuffs, e.target.name] : listaBuffs.filter((buff) => buff !== e.target.name));
  }

  return (
    <div className='izquierda'>
      <style>
        {`.imagen-teammate1 {
          border: 2px solid ${personajes[teammate1]?.color};
        }
        .imagen-teammate2 {
          border: 2px solid ${personajes[teammate2]?.color};
        }`}
      </style>
      <h4>Team</h4>
      <div className='teammates-wrapper'>
        <div className="character-wrapper">
          <img src={`/fotos_personajes/${teammate1}.png`} className='rounded-circle imagen-teammate1' width={100} height={100} alt="" />
          <div className="character-selector-level">
            <select className="form-select border-2" name="personajeSelec" value={teammate1} onChange={e => setTeammate1(e.target.value)}>
              <option value={"None"}>None</option>
              {Object.entries(personajes).sort().map(([nombre]) => (
                <option value={nombre} key={nombre}>{nombre}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="character-wrapper">
          <img src={`/fotos_personajes/${teammate2}.png`} className='rounded-circle imagen-teammate2' width={100} height={100} alt="" />
          <div className="character-selector-level">
            <select className="form-select border-2" name="personajeSelec" value={teammate2} onChange={e => setTeammate2(e.target.value)}>
              <option value={"None"}>None</option>
              {Object.entries(personajes).sort().map(([nombre]) => (
                <option value={nombre} key={nombre}>{nombre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <h4>Buffs</h4>
      <div className='lista-buffs'>
        {teammate1!="None" && <h5>{teammate1}</h5>}
        {personajes[teammate1] && personajes[teammate1].buffs ? personajes[teammate1].buffs.filter((buff) => buff.target != "self").map((buff) => (
          <div key={`${teammate1}-${buff.id}`} className="tarjeta-buffs">
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
      <br />
      <div className='lista-buffs'>
        {teammate2!="None" && <h5>{teammate2}</h5>}
        {personajes[teammate2] && personajes[teammate2].buffs ? personajes[teammate2].buffs.filter((buff) => buff.target != "self").map((buff) => (
          <div key={`${teammate2}-${buff.id}`} className="tarjeta-buffs">
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

export default Equipo