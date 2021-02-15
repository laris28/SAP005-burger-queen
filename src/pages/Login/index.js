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
            
                <form class="login">	
                    <h1>BURGER QUEEN</h1>
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
                    <p className="p-bottom">Ainda não possui conta? <a href="/Register">Cadastre-se</a></p>	
        
                </form>	
            
        </div>
    )
}


export default Login;