import React from 'react'

const ArmaMelee = ({setPersonajeSeleccionado}) => {
  return (
    <div className='izquierda'>
      <p>Arma:</p>
      <input type="text" name="asdas" id="asdadsa" onChange={e => setPersonajeSeleccionado(e.target.value)}/>
      <p>Nivel arma:</p>
      <p>Smelt:</p>
      <p>Wedges:</p>
    </div>
  )
}

export default ArmaMelee