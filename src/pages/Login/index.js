import { Link, useHistory } from 'react-router-dom';
import React, {useState} from 'react'

export const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const path = useHistory();

    const menu = () => {
    path.push('/menu')
    }
  
    const kitchen = () => {
      path.push('/kitchen')
    }
  

    const test = () => {
        fetch('https://lab-api-bq.herokuapp.com/auth', {
          body:`email=${email}&password=${password}` ,
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          
          },
          
        )
          .then((response) => response.json())
          .then((data) => {
            setEmail('')
            setPassword('')
            console.log(data)
            localStorage.setItem('token', data.token);
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
        <div className="Login">
            <form className="login">	
                <h1>BURGER QUEEN</h1>
                <input className="input" type="email" placeholder="Informe seu email" value={email} onChange={e=> setEmail(e.target.value)}/>
                <br></br>
                <input className="input" type="password" placeholder="Informe sua senha" value={password} onChange={e=> setPassword(e.target.value)}/>
                <br></br>
                <button className="form-button" type='submit' onClick={(e) => {
                e.preventDefault();
                test();
                }}>Logar</button>
                <br></br>
                <p className="p-bottom">Ainda não possui conta? <Link to="/register">Cadastre-se</Link></p>
            </form>
        </div>
      </>
    );
};


    