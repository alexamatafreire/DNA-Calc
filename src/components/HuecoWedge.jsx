import {useDroppable} from '@dnd-kit/react';
import './HuecoWedge.css';

const HuecoWedge = ({id, children}) => {
    const {ref} = useDroppable({
        id,
    });
    return (
        <div className="hueco-wedge" ref={ref}>
            {children}
        </div>
    )
}

export default HuecoWedge