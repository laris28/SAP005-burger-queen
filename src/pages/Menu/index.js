import {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";


export const Menu = () => {
  const [menu, setMenu] = useState([]);
  let token = localStorage.getItem('token');
  console.log(token)

  const [client,setClient] = useState('');
  const [table,setTable] = useState('');
  const [send, setSend] = useState('');


  useEffect(() => {
    var myHeaders = new Headers();
myHeaders.append("Authorization", token);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://lab-api-bq.herokuapp.com/products", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  })

  const handleSend = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({"client":client,"table": table,"products":[{"id":29,"qtd":1}]});
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://lab-api-bq.herokuapp.com/orders", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }

    return (
    <>
          <h1>Bem vindo ao menu</h1>
          <br></br>
          <h2>Café da Manhã</h2>

         <input type = "text" value={client} onChange={e=> setClient(e.target.value)}/>
         <input type = "text" placeholder = "Mesa" value={table} onChange={e=> setTable(e.target.value)}/>
         <button className="form-button" type='submit' onClick={(e) => {
                e.preventDefault();
                handleSend();
                }}>Enviar Pedido</button>
    </>

    );
  }
  
  export default Menu;