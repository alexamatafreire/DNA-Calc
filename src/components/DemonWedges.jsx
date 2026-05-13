import React, { useState, useEffect } from 'react'
import DemonWedge from './DemonWedge'
import { DragDropProvider } from '@dnd-kit/react';
import HuecoWedge from './HuecoWedge';
import './DemonWedges.css';

const DemonWedges = ({wedgesList, slots, setSlots}) => {
    return (
        <div className="wedges-container">
            <DragDropProvider
                onDragEnd={(event) => {
                    if (event.canceled) return;
                    if (event.operation.target) {
                        setSlots(event.operation.target.id, event.operation.source.data.wedge);
                        if (event.operation.source.id.startsWith("equipado")) {
                            setSlots(event.operation.source.id.slice(-1), slots[event.operation.target.id]);
                        }
                    } else {
                        if (event.operation.source.id.startsWith("equipado")) {
                            setSlots(event.operation.source.id.slice(-1), undefined);
                        }
                    }
                }}
            >

                <div className={`slots-wedges ${Object.keys(slots).length != 9 ? "wedges-armas" : ""}`}>
                    {Object.entries(slots).map(([slot, wedge]) => (
                        <HuecoWedge key={slot} id={slot}>
                            {wedge != "" && wedgesList[wedge] ? <DemonWedge id={`equipado-${slot}`} wedge={wedge} nombre={wedgesList[wedge].nombre} imagen={wedgesList[wedge].imagen} tier={`tier${wedgesList[wedge].tier}`}></DemonWedge> : ""}
                        </HuecoWedge>
                    ))}
                </div>
                <div className="wedges">
                    {wedgesList && Object.entries(wedgesList).map(([id, wedge]) => (
                        <DemonWedge id={id} key={id} wedge={id} nombre={wedge.nombre} imagen={wedge.imagen} tier={`tier${wedge.tier}`}/>
                    ))}
                </div>
            </DragDropProvider>
        </div>
    )
}

function sumarArray(arr) {
    return arr.reduce((acc, current) => {return acc + current},0);
}

export default DemonWedges