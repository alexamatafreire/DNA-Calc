import './App.css'
import React, { use, useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DamageTable from './components/DamageTable';
import DemonWedges from './components/DemonWedges';
import PersonajePrincipal from './components/pages/PersonajePrincipal';
import Arma from './components/pages/Arma';
import { useWedgeStore } from './stores/wedgesStore';
import { calcularStats } from './utils/calcularstats';

function App() {
  const [personajes, setPersonajes] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/personajes.json");
        const data = await response.json();
        setPersonajes(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  const [wedgesList, setWedgesList] = useState({});
  useEffect(() => {
  async function fetchData() {
      try {
      const response = await fetch("/wedges.json");
      const data = await response.json();
      setWedgesList(data);
      } catch (e) {
          console.log(e);
      }
  }
  fetchData();
  }, []);

  const [mejoras, setMejoras] = useState({
    "ATK": [],
    "HP": []
  });

  return (
    <BrowserRouter>
      <div className='App'>
        <div className="container barra-navegacion">
          <nav className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
              <li className={`nav-item rounded-2 ${window.location.pathname == "/" ? "current-nav" : ""}`}>
                <Link to="/" className="nav-link text-black">Main</Link>
              </li>
              <li className={`nav-item rounded-2 ${window.location.pathname == "/arma" ? "current-nav" : ""}`}>
                <Link to="/arma" className="nav-link text-black">Melee</Link>
              </li>
              <li className="nav-item rounded-2">
                <Link className='nav-link text-black'>Ranged</Link>
              </li>
              <li className="nav-item rounded-2">
                <Link className='nav-link text-black'>Team</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<PersonajePrincipal wedgesList={wedgesList} personajes={personajes} />} />
        <Route path='/arma' element={<Arma/>} />
      </Routes>
      <div className="derecha">
        <DamageTable wedgesList={wedgesList} personajes={personajes} ></DamageTable>
      </div>
    </BrowserRouter>
  )
}

export default App