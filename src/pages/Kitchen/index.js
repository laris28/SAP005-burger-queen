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
      <h1>Pedidos solicitados</h1>
    
      {pedidos.map((product, index) => {
         console.log(product.id)
        return (
          
          <div className="container">
            <div className="card">
              <div className="card-container">
                <li key={index}>
                  <p>{product.client_name}</p>
                   <p>{product.Products.map((item,index2)=>(
                     <>
                     <p> {item.name}</p>
                     <p> {item.qtd}</p>
                     </>
                   ))}</p> 
                  <p>{product.table}</p>
                </li>
              </div>
            </div>
            <button id={product.id} onClick={(e) => handleOrder(e.target.id)}>Pedido Pronto</button> 
          </div>
        );
      })}
      <Link className="link-home" to="/">
        Sair
      </Link>
    </>
  );
};

export default Kitchen;