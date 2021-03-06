import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import Logo from "../Components/logo";

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
                <div className="logo-register">
                    <Logo />
                </div>                
                <input type='text' className="input-register" placeholder='Nome do usuario' onChange={(e) => registrationData({...signIn, 'name' : e.target.value})} />
                <br></br>
                <input type='text' className="input-register" placeholder='Insira seu e-mail' onChange={(e) => registrationData({...signIn, 'email' : e.target.value})} />
                <br></br>
                <input type='password' id='password' className="input-register" placeholder='Informe uma senha numerica de 6 digitos' onChange={(e) => registrationData({...signIn, 'password' : e.target.value})} />
                <br></br>
                <div className="cadastro">
                    <p>Cozinheiro(a)</p>
                    <input type="radio" className='select' value='cooker' name='role' onChange={(e) => registrationData({...signIn, 'role' : e.target.value})} />
                    <p>Garçom/Garçonete</p>
                    <input type="radio" className='select' value='waiter' name='role' onChange={(e) => registrationData({...signIn, 'role' : e.target.value})} />
                </div>
                <br></br>
                <button id='btn-submit' className="form-input-register" type='submit' value='submit'>Cadastrar</button>
                <div className="texto-cadastro">
                    <p>Se já for cadastrado, vá para o <Link to='/'>login</Link> </p>
                </div>
            </form>
        </div>
         
        <footer id="footer">
        <h4>Projeto feito na <a target="_blank" href="https://www.laboratoria.la/br">Laboratoria</a> por
          <a className="footer-link" href="https://github.com/laris28" alt="Larissa Alborghette GitHub"> Larissa Alborghette</a> e	
          <a className="footer-link" href="https://github.com/RobertaKelly" alt="Roberta Kelly GitHub"> Roberta Kelly</a> 	
        </h4>	
      </footer>
    </>
    );
};