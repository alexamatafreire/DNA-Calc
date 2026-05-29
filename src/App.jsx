import './App.css'
import React, { use, useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import DamageTable from './components/DamageTable';
import DemonWedges from './components/DemonWedges';
import PersonajePrincipal from './components/pages/PersonajePrincipal';
import ArmaMelee from './components/pages/ArmaMelee';
import ArmaDistancia from './components/pages/ArmaDistancia';
import Equipo from './components/pages/Equipo'
import { useWedgeStore } from './stores/wedgesStore';
import { useUserStore } from './stores/userStore';
import { calcularStats } from './utils/calcularstats';
import axios from 'axios';
import LoginWindow from './components/LoginWindow';

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
  const [armas, setArmas] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/armas.json");
        const data = await response.json();
        setArmas(data);
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
  const navStyle = ({isActive}) => ({
    color: isActive ? "#FFF" : "#000",
    backgroundColor : isActive ? "#222" : "transparent"
  });
  const [loginVisible, setLoginVisible] = useState(false);
  const username = useUserStore((state) => state.username);
  const setUsername = useUserStore((state) => state.setUsername);
  setUsername(tempUser);

  return (
    <BrowserRouter>
      <div className='App'>
        <div className="container barra-navegacion">
          <nav className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
              <li className={`nav-item rounded-2}`}>
                <NavLink to="/" style={navStyle} className="nav-link">Main</NavLink>
              </li>
              <li className={`nav-item rounded-2}`}>
                <NavLink to="/melee" style={navStyle} className="nav-link">Melee</NavLink>
              </li>
              <li className="nav-item rounded-2">
                <NavLink to="/ranged" style={navStyle} className='nav-link'>Ranged</NavLink>
              </li>
              <li className="nav-item rounded-2">
                <NavLink to="/team" style={navStyle} className='nav-link'>Team</NavLink>
              </li>
            </ul>
          </nav>
          {username == "none" && <i className="bi bi-person-circle"  onClick={() => {setLoginVisible(true)}}></i>}
          {username != "none" && <p>Welcome, {username}!</p>}
        </div>
      </div>
      <Routes>
        <Route path='/' element={<PersonajePrincipal wedgesList={wedgesList} personajes={personajes} />} />
        <Route path='/melee' element={<ArmaMelee armas={armas} />} />
        <Route path='/ranged' element={<ArmaDistancia armas={armas} />} />
        <Route path='/team' element={<Equipo personajes={personajes} />} />
      </Routes>
      <div className="derecha">
        <DamageTable wedgesList={wedgesList} personajes={personajes} armas={armas} ></DamageTable>
      </div>
      {loginVisible && <LoginWindow setLoginVisible={setLoginVisible}></LoginWindow>}
    </BrowserRouter>
  )
}

const getUserAuth = async () => {
  try {
    const res = await axios.get(
      "http://192.168.56.101:3001/getuser",
      {
        withCredentials: true
      }
    );
    return(res.data.username);
  } catch (e) {
    return(e.response.data.username);
  }
}
let tempUser = "none";
tempUser = await getUserAuth();

export default App