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

      <Link className="link-home" to="/">
        Sair
      </Link>
    </>
  );
};

export default Kitchen;
 

