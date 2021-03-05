import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Components/logo";

export const Menu = () => {
  const token = localStorage.getItem("token");
  const [listItems, setItems] = useState([]);
  const [menuHamburgers, setHamburgers] = useState([]);
  const [orderPedidos, setOrderPedidos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [menuCafe, setCafe] = useState([]);
  const [side, setSide] = useState([]);
  const [menuBebidas, setBebidas] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  const [DeletProduct, setDeletProduct] = useState([]);
  const [total, setTotal] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("https://lab-api-bq.herokuapp.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      const itens = data;
      const coffeeItems = itens.filter((products) =>
        products.type.includes("breakfast")
      );
      const burgers = itens.filter((products) =>
        products.sub_type.includes("hamburguer")
      );
      const sideDish = itens.filter((products) =>
        products.sub_type.includes("side")
      );
      const drink = itens.filter((products) =>
        products.sub_type.includes("drinks")
      );
      setBebidas(drink);
      setSide(sideDish);
      setHamburgers(burgers);
      setCafe(coffeeItems);
    })
    .catch((error) => console.log("error", error));
  }, []);

  const handleAddItems = (product) => {
    const newItems = [...listItems, product]
    setItems(newItems);

    const newProductPrice = [...productPrice, product.price]
    setProductPrice(newProductPrice);

    const addProduct = newItems.map((product) => {
      return {
        id: product.id,
        qtd: 1,
      };
    });

    const requestQtd = addProduct.reduce(function (x, y) {
      x[y.id] = x[y.id] || [];
      x[y.id].push(y);
      return x;
    }, Object.create(null));

    const list = [];
    for (const [key, value] of Object.entries(requestQtd)) {
      list.push({
        id: key,
        qtd: value.length,
      });
    }

    setOrderPedidos({ ...orderPedidos, products: list });
    console.log(orderPedidos);
  };

  const handleTotalItems = () => {
    setTotal(productPrice.reduce((total, num) => total + num, 0));

  }

  const handleDelete = (product) => {
    setTotal(productPrice.splice(listItems.indexOf(product), 1));
    setDeletProduct(listItems.splice(listItems.indexOf(product), 1));
    handleTotalItems();
  }

  const submitOrder = () => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(orderPedidos),
    })
    .then((response) => {
      response.json()
      .then((data) => console.log(data));
      setOrderPedidos({});
      setItems([]);
      setTotal([]);
      setProductPrice([]);
      setDeletProduct([]);
      alert('Pedido criado com sucesso!')
    })
    .catch((error) => console.log("error", error));
  };

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
      setPedidos(response.filter(pedido => pedido.status =='Pedido pronto'))   
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log("error", error));
  },[]);

  const handleOrder = (orderId) => {
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
      <div className="menu">
        <div className="App">
          <section>
            <div className="logo">
              <Logo />
            </div>
          </section>
          <button className="buttonMenu" onClick={() => setMenu('breakfast')}>
            Café da manhã
          </button>
          <button className="buttonMenu" onClick={() => setMenu('hamburger')}>
            Hambúrgueres
          </button>
          <button className="buttonMenu" onClick={() => setMenu('side')}>
            Acompanhamentos
          </button>
          <button className="buttonMenu" onClick={() => setMenu('drinks')}>
            Bebidas
          </button>
          <button className="buttonMenu" onClick={() => setMenu('prontos')}>
            Pedidos prontos
          </button>

          {menu === 'breakfast' && (
            <div>
              <table className='itens'>
                <tbody>
                  <tr>
                    <th>Café da Manhã</th>
                  </tr>
                  {menuCafe.map((produto) => (
                    <tr key={produto.id}>
                      <div className="menuProducts">
                        <img src={produto.image} alt={`${produto.name}`} />
                      </div>
                      <td>{produto.name}</td>
                      <td>R$ {produto.price},00</td>
                      <td>
                        <button onClick={() => handleAddItems(produto)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {menu === 'hamburger' && (
            <div>
              <table className='itens'>
                <tbody>
                  <tr>
                    <th>Hambúrgueres</th>
                  </tr>
                  {menuHamburgers.map((produto) => (
                    <tr key={produto.id}>
                      <div className="menuProducts">
                        <img src={produto.image} alt={`${produto.name} Image`} />
                      </div>
                      <td>{produto.name + ' ' + produto.flavor}</td>
                      <td>{produto.complement === 'null' ? '' : produto.complement}</td>
                      <td>R$ {produto.price},00</td>
                      <td>
                        <button onClick={() => handleAddItems(produto)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {menu === 'side' && (
            <div>
              <table className='itens'>
                <tbody>
                  <tr>
                    <th>Acompanhamentos</th>
                  </tr>
                  {side.map((produto) => (
                    <tr key={produto.id}>
                      <div className="menuProducts">
                        <img src={produto.image} alt={`${produto.name}`} />
                      </div>
                      <td>{produto.name}</td>
                      <td>R$ {produto.price},00</td>
                      <td>
                        <button onClick={() => handleAddItems(produto)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {menu === 'drinks' && (
            <div>
              <table className='itens'>
                <tbody>
                  <tr>
                    <th>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cup-straw" viewBox="0 0 16 16">
                        <path d="M13.902.334a.5.5 0 0 1-.28.65l-2.254.902-.4 1.927c.376.095.715.215.972.367.228.135.56.396.56.82 0 .046-.004.09-.011.132l-.962 9.068a1.28 1.28 0 0 1-.524.93c-.488.34-1.494.87-3.01.87-1.516 0-2.522-.53-3.01-.87a1.28 1.28 0 0 1-.524-.93L3.51 5.132A.78.78 0 0 1 3.5 5c0-.424.332-.685.56-.82.262-.154.607-.276.99-.372C5.824 3.614 6.867 3.5 8 3.5c.712 0 1.389.045 1.985.127l.464-2.215a.5.5 0 0 1 .303-.356l2.5-1a.5.5 0 0 1 .65.278zM9.768 4.607A13.991 13.991 0 0 0 8 4.5c-1.076 0-2.033.11-2.707.278A3.284 3.284 0 0 0 4.645 5c.146.073.362.15.648.222C5.967 5.39 6.924 5.5 8 5.5c.571 0 1.109-.03 1.588-.085l.18-.808zm.292 1.756C9.445 6.45 8.742 6.5 8 6.5c-1.133 0-2.176-.114-2.95-.308a5.514 5.514 0 0 1-.435-.127l.838 8.03c.013.121.06.186.102.215.357.249 1.168.69 2.438.69 1.27 0 2.081-.441 2.438-.69.042-.029.09-.094.102-.215l.852-8.03a5.517 5.517 0 0 1-.435.127 8.88 8.88 0 0 1-.89.17zM4.467 4.884s.003.002.005.006l-.005-.006zm7.066 0l-.005.006c.002-.004.005-.006.005-.006zM11.354 5a3.174 3.174 0 0 0-.604-.21l-.099.445.055-.013c.286-.072.502-.149.648-.222z"/>
                      </svg>Bebidas
                    </th>
                  </tr>
                  {menuBebidas.map((produto) => (
                    <tr key={produto.id}>
                      <div className="menuProducts">
                        <img src={produto.image} alt={`${produto.name}`} />
                      </div>
                      <td>{produto.name}</td>
                      <td>R$ {produto.price},00</td>
                      <td>
                        <button onClick={() => handleAddItems(produto)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {menu === 'prontos' && (
            <div>
              <table className='itens'>
                <tbody>
                  <tr>
                    <th>Pedidos prontos</th>
                  </tr>
                  {pedidos.map((produto) => {
                    const dataUpdated = new Date(produto.updatedAt);
                    const dataCreated = new Date(produto.createdAt);
                    const diferença = Math.abs(dataUpdated) - dataCreated;
                    const minutes = Math.floor(diferença / 1000 / 60);
                    return(
                      <div className="pedidos-prontos">
                        <tr key={produto.id}>
                          <td>{produto.Products.map((item)=>(
                            <>
                              <div>
                                <td> {item.qtd}</td>
                                <td> {item.name},</td>
                              </div>
                            </>
                          ))}</td> 
                          <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch-fill" viewBox="0 0 16 16">
                            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584.531.531 0 0 0 .013-.012l.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354a.717.717 0 0 0-.012.012A6.973 6.973 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1h-3zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0z"/>
                            </svg> {minutes} min
                          </td>
                          <td>Cliente: {produto.client_name}</td>
                          <td>Mesa: {produto.table}</td>
                          <td> 
                            <button className="pedido" id={produto.id} onClick={(e) => handleOrder(e.target.id)}>Pedido entregue</button> 
                          </td>
                        </tr>
                      </div>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
    
          <div className="pedidos">
            <table className='itens'>
              <tbody>
                <tr>
                  <th>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16">
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                    </svg> Comanda
                  </th>
                </tr>
                {listItems.map((produto) => (
                  <tr key={produto.id}>
                    <div className="menuProducts">
                      <img src={produto.image} alt={`${produto.name}`} />
                    </div>
                    <td>{produto.name}</td>
                    <td>{produto.complement === "null" ? "" : produto.complement}</td>
                    <td>R$ {produto.price},00</td>
                    <td>
                      <button onClick={() => handleDelete(produto)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <label>Nome do cliente:</label>
            <br/>
            <input 
              name="name"
              type="text"
              onChange={(e) => setOrderPedidos({ ...orderPedidos, client: e.target.value })}
            />
            <br/>
            <label>Número da mesa:</label>
            <br/>
            <input
              name="table"
              type="text"
              onChange={(e) => setOrderPedidos({ ...orderPedidos, table: e.target.value })}
            />
            <br/>
            <div>
              <h3>Total</h3>
              <h3>R${total}</h3>
            </div>
          </div>

          <button className="form-button" onClick={() => handleTotalItems()}>Totalizar itens</button>
          <button className="form-button" onClick={() => submitOrder()}>Finalizar pedido</button>
        </div>

        <Link className="link-home" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
            <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
          </svg> Sair 
        </Link>
      </div>
    </>
  );
}
export default Menu;
