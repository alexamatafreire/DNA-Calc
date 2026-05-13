import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './InfoTooltip.css'

const InfoTooltip = ({id, title}) => {
  return (
    <OverlayTrigger 
        overlay={
            <Popover id={id}>
                {title}
            </Popover>
        }
        placement='auto'
    >
        <div className='div-info'>i</div>
    </OverlayTrigger>
  )
}

export default InfoTooltip