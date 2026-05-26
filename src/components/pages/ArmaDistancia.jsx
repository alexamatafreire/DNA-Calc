import React from 'react'
import { useState } from 'react';
import { useCharacterStore } from '../../stores/characterStore';
import { useWeaponStore } from '../../stores/weaponStore';

const ArmaDistancia = ({armas}) => {
  const armaSeleccionada = useWeaponStore((state) => state.ranged);
  const setArmaSeleccionada = useWeaponStore((state) => state.setRanged);
  const listaBuffs = useWeaponStore((state) => state.rangedBuffs);
  const setListaBuffs = useWeaponStore((state) => state.setRangedBuffs);
  const buffStacks = useWeaponStore((state) => state.rangedBuffStacks);
  const setBuffStacks = useWeaponStore((state) => state.setRangedBuffStacks);
  const smelt = useWeaponStore((state) => state.rangedSmelt);
  const setSmelt = useWeaponStore((state) => state.setRangedSmelt);

  const handleBuffs = (e) => {
    setListaBuffs(e.target.checked ? [...listaBuffs, e.target.name] : listaBuffs.filter((buff) => buff !== e.target.name));
  }

  const handleChangeWeapon = (e) => {
    setArmaSeleccionada(e.target.value);
    setListaBuffs([]);
    setSmelt(0);
  }
  
  return (
    <div className='izquierda'>
      <h4>Weapon</h4>
      <div className="character-wrapper">
        <img src={`/fotos_armas/${armaSeleccionada}.png`} className='rounded-circle border border-2 border-dark' width={100} height={100} alt="" />
        <div className="character-selector-level">
          <select className="form-select border-2" name="personajeSelec" value={armaSeleccionada} onChange={handleChangeWeapon}>
            {Object.entries(armas).filter((arma) => arma[1].tipo == "ranged").sort().map(([nombre]) => (
              <option value={nombre} key={nombre}>{nombre}</option>
            ))}
          </select>
          <div className='weapon-smelt'>
            Smelt: <input type="number" className='form-control' min={0} max={5} value={smelt} onChange={e => {if (e.target.value > 5) {e.target.value = 5} if (e.target.value < 0) {e.target.value = 0} setSmelt(e.target.value)}}/>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h4>Buffs</h4>
      <div className='lista-buffs'>
        {armas[armaSeleccionada] && armas[armaSeleccionada].buffs ? armas[armaSeleccionada].buffs.map((buff) => (
          <div key={`${armaSeleccionada}-${buff.id}`} className="tarjeta-buffs">
            <div className="checkbox-titulo">
              <input type="checkbox" className="form-check-input border-dark" checked={listaBuffs.includes(buff.id)} name={buff.id} onChange={handleBuffs}/>
              <h5>{buff.nombre}</h5>
            </div>
            <p>{buff.desc}</p>
            <div className='buff-stacks'>
              {buff.stacks && <input type="number" onKeyDown={(event) => {event.preventDefault();}} defaultValue={buffStacks[buff.id]??buff.stacks[0]} min={buff.stacks[0]} max={buff.stacks[1]} onChange={(e) => {if (e.target.value > buff.stacks[1]) {e.target.value = buff.stacks[1]} setBuffStacks(buff.id, parseInt(e.target.value))}} className="form-control"></input>}
              {buff.stacks && <p>Min: {buff.stacks[0]} - Max: {buff.stacks[1]}</p>}
            </div>
          </div>
        )) : ""}
      </div>
    </div>
  )
}

export default ArmaDistancia