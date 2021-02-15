import React, {useState} from 'react';
/*import Register from */
/*import '.login.css'*/
    
    function Login() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        /*const [show, setShow] = useState(false);*/

        /*const handleClick = (e) => {
            e.preventDefalt()
            setShow(!show);*/


        function InputBtn (e) {
                e.preventDefault();	      
                fetch('https://lab-api-bq.herokuapp.com/users/', {	   
                  method: 'POST',	        
                  headers: {	        
                    'accept': 'application/json',	          
                    'Content-Type': 'application/x-www-form-urlencoded'	         
                  },	        
                  body :`email=${email}&password=${password}`
          
          
                })	    
                  .then((response) => response.json())	        
                  .then((json) => {	        
                    console.log(json);	         
                    alert('Cadastro criado com sucesso');        	               
                  })	        
              };	    
        
        return (
                <div className="App">
                <div className="login-logo">
                    <img src="https://cdn3.iconfinder.com/data/icons/eldorado-stroke-food-2/40/burger_2-512.png" alt="Burger, hamburger, cheeseburger icon - Download on Iconfinder" />
                    <h1>Login</h1>
                    <form>
                        <label htmlFor="email" className="label">E-mail:</label>
                        <br></br>
                        <input className="input" type="text" value={email} onChange={e => setEmail(e.target.valeu)} name="email"></input>
                        <br></br>
                        <label htmlFor="password" className="label">Senha:</label>
                        <br></br>
                        <input className="input" type={show ? "text" : "password"}
                            value={password} onChange={e => setPassword(e.target.value)} name="password"></input>
                        <br></br>



                        <input type="submit" className="form-button" value="Entrar"></input>

                    </form>
                    <p className="p-bottom">Ainda não possui conta?<a href="/Register">Cadastre-se</a></p>
                </div>
            </div>
        );
    }


export default Login;