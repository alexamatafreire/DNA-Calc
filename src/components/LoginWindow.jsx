import React, { useState } from 'react'
import axios from 'axios';

const LoginWindow = ({ setLoginVisible }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [register, setRegister] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    return (
        <div className='login-window-wrapper' onClick={(e) => {setLoginVisible(false)}}>
            <div className="login-window" onClick={(e) => e.stopPropagation()}>
                <h4>{register?"Register":"Login"}</h4>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                </div>
                {register &&
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} />
                    </div>
                }
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPass(e.target.value)} />
                </div>
                <p className='error-login'>{mensajeError}</p>
                {!register && <button className='cambiar-registro' onClick={() => setRegister(true)}>Don't have an account? Register here.</button>}
                {register && <button className='cambiar-registro' onClick={() => setRegister(false)}>Already have an account? Login here.</button>}
                <br />
                {!register && <button className="btn btn-primary" onClick={() => {setMensajeError(login(email, pass, setLoginVisible))}}>Login</button>}
                {register && <button className="btn btn-primary" onClick={() => {setMensajeError(registerfunc(email, pass, name, setRegister))}}>Register</button>}
            </div>
        </div>
    )
}

const login = async (email, pass, setLoginVisible) => {
  try {
    const res = await axios.post(
      "http://192.168.56.101:3001/login",
      {
        email: email,
        pass: pass
      },
      {
        withCredentials: true
      }
    );
    if (res.data.message == "Login correcto.") {window.location.reload()}
    return(res.data.message);
  } catch (e) {
    console.log(e);
    return "oops";
  }
}

const registerfunc = async (email, pass, name, setRegister) => {
  try {
    const res = await axios.post(
      "http://192.168.56.101:3001/register",
      {
        email: email,
        pass: pass,
        name: name
      },
      {
        withCredentials: true
      }
    );
    if (res.data.message == "Registro correcto.") {setRegister(false)}
    return(res.data.message);
  } catch (e) {
    return(e.response.data.message);
  }
}

export default LoginWindow