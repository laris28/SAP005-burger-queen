import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useHistory} from 'react-router-dom'
/*import Login from '../src/pages/Login'*/
/*import User from './components/User'; */

function App() {	
  const history = useHistory()
  const InputName = document.querySelector("#InputName");	
  const InputEmail = document.querySelector("#InputEmail");	
  const InputPassword = document.querySelector("#InputPassword");	
  const InputRole = document.querySelector("#InputRole");	
  
  function InputBtn(e) {	
    e.preventDefault();	

    fetch('https://lab-api-bq.herokuapp.com/users/', {	
      method: 'POST',	
      headers: {	
        'accept': 'application/json',	
        'Content-Type': 'application/x-www-form-urlencoded'	
      },	
      body: `email=${InputEmail.value}&password=${InputPassword.value}&role=${InputRole.value}&restaurant=BurgerQueen&name=${InputName.value}`
    })	
      .then((response) => response.json())	
      .then((json) => {	
        console.log(json);	
        alert('Cadastro criado com sucesso');	
        InputName.value = "";	
        InputEmail.value = "";	
        InputPassword.value = "";	
        InputRole.value = "";	
        InputName.value = "";	
      })	
  };	

  const routerRegister=()=>{
    history.push('/cadastro')
  }
  const routerLogin=()=>{
    history.push('/login')
  }
  return (	 
    <div className="App">	   
      <nav className="nav">
      <button className="Inputbtn" onClick={routerLogin}>Login</button>
     <button className="Inputbtn" onClick={routerRegister}>Cadastro</button>     
    </nav>
   
  </div>	
  );
}



export default App;
