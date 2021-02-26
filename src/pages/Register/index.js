import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
// import axios from 'axios';


export const Register = () => {
    const [signIn, registrationData] = useState({'restaurant': 'burguer queen'});
    const path = useHistory();

    const menu = () => {
    path.push('/menu')
    }
  
    const kitchen = () => {
    path.push('/kitchen')
    }
    const sendRegistration = (e) => {
        e.preventDefault();
        fetch('https://lab-api-bq.herokuapp.com/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(signIn)
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
        if(data.role === "waiter"){
            menu();
          }
          else if(data.role === "cooker"){
            kitchen();
          }
        })
    }

    return (
        <>
        <div className="Register">
            <form className="register" onSubmit={sendRegistration}>
                <h1>BURGER QUEEN</h1>
                <input type='text' className='userInput' placeholder='Nome do usuario' onChange={(e) => registrationData({...signIn, 'name' : e.target.value})} />
                <br></br>
                <input type='text' className='emailInput' placeholder='Insira seu e-mail' onChange={(e) => registrationData({...signIn, 'email' : e.target.value})} />
                <br></br>
                <input type='password' id='password' className='' placeholder='Informe uma senha numerica de 6 digitos' onChange={(e) => registrationData({...signIn, 'password' : e.target.value})} />
                <br></br>
                <div>
                    <input type="radio" className='select' value='cooker' name='role' onChange={(e) => registrationData({...signIn, 'role' : e.target.value})} /> 
                    <p>Cozinheiro(a)</p>
                    <input type="radio" className='select' value='waiter' name='role' onChange={(e) => registrationData({...signIn, 'role' : e.target.value})} />
                    <p>Garçom/Garçonete</p>
                </div>
                <br></br>
                <button id='btn-submit' className="button" type='submit' value='submit'>Cadastrar</button>
                <p>Se já for cadastrado, vá para o <Link to='/'>login</Link> </p>
            </form>
        </div>
    </>
    );
};