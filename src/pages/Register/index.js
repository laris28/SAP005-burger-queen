import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {useHistory} from 'react-router-dom'
import './Register.css';

function Register () { 
    const history = useHistory()
  
    const routerLogedd = ()=>{
      history.push('/Logedd')
    }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');	  
  const [password, setPassword] = useState('');	 
  const [role, setRole] = useState('');	

return (
    <div className="Register">	 
      <h1>Cadastre-se</h1>	      
      <form className="CadastroForm">	
        <label htmlFor="InputName">Nome:</label>	        
        <input type="text" placeholder="Nome" className="Input" value={name} onChange={(event) => setName(event.target.value)} />	

        <label htmlFor="InputEmail">E-mail:</label>	     
        <input type="text" placeholder="E-mail" className="Input" value={email} onChange={(event) => setEmail(event.target.value)} />

       <label htmlFor="InputPassword">Senha:</label>	        
        
        <input type="password" placeholder="Senha" className="Input" value={password} onChange={(event) => setPassword(event.target.value)} />


        <label htmlFor="InputRole">Cargo:</label>	       
        <select name="ordenar" className="Input" value={role} onChange={(event) => setRole(event.target.value)}>	    
          <option value=''>Cargo</option>	         
          <option value="garcom">Garçom</option>	          
          <option value="cozinheiro">Cozinheiro</option>	         
        </select>	    

        <button className="InputBtn" onClick={(e) => {	       
          e.preventDefault();

         fetch('http://lab-api-bq.herokuapp.com/users/', {   
           method: 'POST',
            headers: {	        
              'accept': 'application/json',	              
              'Content-Type': 'application/x-www-form-urlencoded'
            }

           /* body:`email=${email}&password=${password}&role=${role}&restaurant=BurgerQueen&name=${name}` })
            .then((response) => response.json())	            
            .then((json) => {	 
              console.log(json);
              if(json.id !==null) {
                routerLogedd();}

                setName('');	              
                setEmail('');	           
                setRole('');
            })*/

      }}>Cadastro</button>
     </form>
     </div>
);

}

export default Register;