import React, {useState} from 'react';
/*import '.login.css'*/

const Login =()  =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)

    /*const handleClick = (e) => {
        e.preventDefalt()
        setShow(!show);
    }*/

    return (
    <div className="Login">
        <div className= "login-logo">
            <img src="https://cdn3.iconfinder.com/data/icons/eldorado-stroke-food-2/40/burger_2-512.png" alt="Burger, hamburger, cheeseburger icon - Download on Iconfinder"/>
       <h1>Login</h1>
       <form>	
      <label htmlFor="email" className="label">E-mail:</label>	
      <br></br>
      <input className="input" type="text" value={email} onChange={e => setEmail(e.target.valeu)} name="email"></input>	
      <br></br>		
      <label htmlFor="password" className="label">Senha:</label>	
      <br></br>	
      <input className="input" type={ show ? "text" : "password"}
       value={password} onChange={e => setPassword(e.target.value)} name="password"></input>	
      <br></br>
      
     {/* <div className="login-eye"> {show ? (<HiEye size={20} onClick={handleClick} />) : (<HiEyeOff size={20} onClick={handleClick} />)} </div></br>*/}	

      <input type="submit" className="form-button" value="Entrar"></input>	
      
    </form>	
    <p className="p-bottom">Ainda não possui conta? <a href="/Register">Cadastre-se</a></p>	
             </div>
             </div>
      )
      }


export default Login;