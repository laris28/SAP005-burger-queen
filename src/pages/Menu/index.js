import {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";


export const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [client,setClient] = useState('');
  const [table,setTable] = useState('');
  const [send, setSend] = useState('');

  var raw = {"client":client, "table":table, "products":[{"id":29, "qtd":8}]};

  const getProducts = () => {
    const token = localStorage.getItem('token');
    return fetch("https://lab-api-bq.herokuapp.com/products", {
      method: 'GET',
      headers: {Authorization: token},
      redirect: 'follow'
    })
    
  }
  const postOrders = () => {
    const token = localStorage.getItem('token');
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: 'POST',
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(raw),
      // redirect: 'follow'
      
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }
  useEffect(() => {
    getProducts()
    .then(response => response.json())
    .then(result => setMenu(result))
    .catch(error => console.log('error', error));
  }, []);

  return (
    <>
      <h1>Bem vindo ao menu</h1>
      <br></br>
      <h2>Café da Manhã</h2>
      {menu.map(function(item){
        console.log(item)
        return(
          <p key={item.id}>{item.name}</p>
        )
      })}

      <input type = "text" placeholder = "Client" value={client} onChange={e=> setClient(e.target.value)}/>
      <input type = "text" placeholder = "Mesa" value={table} onChange={e=> setTable(e.target.value)}/>
      <button className="form-button" type='submit' onClick={(e) => {
        e.preventDefault();
        postOrders();
      }}>Enviar Pedido</button>
    </>
  );
}

export default Menu;