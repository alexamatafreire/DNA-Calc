import {useDraggable} from '@dnd-kit/react';
import './DemonWedge.css';

const DemonWedge = ({tier, id, wedge, nombre, imagen}) => {
  const {ref} = useDraggable({
    id: id,
    data: {"wedge" : wedge}
  });
  return (
    <div className={`demon-wedge ${tier} ${id.startsWith("equipado")? "equipado" : ""}`} ref={ref}>
      <img src={`/fotos_wedges/${imagen}`} alt="" />
      <p>{nombre}</p>
    </div>
  )
}

export default DemonWedge