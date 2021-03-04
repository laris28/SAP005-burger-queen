import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Kitchen = () => {
  const token = localStorage.getItem("token");
  const [pedidos, setPedidos] = useState([]);
  const [orderId, setOrderId] = useState([]);

  
  useEffect(() => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
      setPedidos(response.filter(pedido => pedido.status =='pending'))
       
      })
      .then((data) => {
        console.log(data);
      })

      .catch((error) => console.log("error", error));
  },[]);

   const handleOrder = (orderId) => {
     console.log(orderId)
    fetch(`https://lab-api-bq.herokuapp.com/orders/${orderId}`, {
      method: 'PUT',
      headers: { 
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({
          'status': 'Pedido pronto'
      })
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      const copia = pedidos.filter(pedido => pedido.id != orderId) 
      setPedidos(copia)
    })
  };
  
   

  return (
    <>
      <header>
        <p></p>
      </header>
      <div className="menu">
      <table className='itens'>
        <tbody>
          <tr>
            <th>Pedidos</th>
            <th>Cliente</th>
            <th>Mesa</th>
          </tr>
          {pedidos.map((produto) => (
            <tr key={produto.id}> 
              <td>{produto.Products.map((item)=>(
                    <>
                      <td> {item.qtd}</td>
                      <td> {item.name},</td>
                    </>
                  ))}</td> 
              <td>{produto.client_name}</td>
              <td>{produto.table}</td>
              <td> 
              <button id={produto.id} onClick={(e) => handleOrder(e.target.id)}>Pedido Pronto</button> 
              </td>
            </tr>
          ))} 
        </tbody>
      </table>

      <Link className="link-home" to="/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
  <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
</svg>Sair
      </Link>
      </div>
    </>
  );
};

export default Kitchen;
 

