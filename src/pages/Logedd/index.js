import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
/*import './logedd.css';*/

function Logedd() {

  const history = useHistory()

  const routerLogedd = () => {
    history.push('/Login')
  }

  return (
    <div className="Register">
      <h1>Cadastro criado com sucesso!</h1>
      <h1>Cadastre o login:</h1>
      <button className="InputBtn" onClick={routerLogedd}>Login</button>
    </div>
  );
}

export default Logedd; 
