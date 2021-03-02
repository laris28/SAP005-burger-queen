import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Kitchen = () => {
  const token = localStorage.getItem("token");
  const [orderPedidos, setPedidos] = useState([]);
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
        setPedidos(response);
      })
      .then((data) => {
        console.log(data);
      })

      .catch((error) => console.log("error", error));
  },[]);

  const handleDelete = (product) => {
    fetch(
      "https://lab-api-bq.herokuapp.com/orders/"`${orderId}`,
      {
        method: "DELETE",
        path: `${orderId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      },
      []
    )
      .then((response) => response.json())
      .then((data) => {
        const dataId = data;
        const filterId = dataId.filter((products) =>
          products.id.includes("id")
        );
        setOrderId(filterId);
        console.log(data);
      })
      .then((data) => {
        const itens = data;
      }, [])
      .catch((error) => console.log("error", error));
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
          {orderPedidos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.Products.map((item)=>(
                    <>
                      <td> {item.qtd}</td>
                      <td> {item.name},</td>
                    </>
                  ))}</td> 
              <td>{produto.client_name}</td>
              <td>{produto.table}</td>
              {/* <td> <button onClick={() => }>
                    FINALIZAR
                  </button>
              </td> */}
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

