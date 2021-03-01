import React, { useEffect, useState } from 'react';

export const Menu = () => {
  const token = localStorage.getItem("token");
  const [listItems, setItems] = useState([]);
  const [menuHamburgers, setHamburgers] = useState([]);
  const [orderPedidos, setPedidos] = useState([]);
  const [menuCafe, setCafe] = useState([]);
  const [side, setSide] = useState([]);
  const [menuBebidas, setBebidas] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  const [DeletProduct, setDeletProduct] = useState([]);
  const [total, setTotal] = useState([]);

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
  setItems([...listItems, product]);
  setProductPrice([...productPrice, product.price]);
  const addProduct = listItems.map((product) => {
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

  setPedidos({ ...orderPedidos, products: list });
  console.log(orderPedidos);
};

const handleTotalItems = () => {
  setTotal(productPrice.reduce((total, num) => total + num));
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
      setPedidos({});
      setItems([]);
      setTotal([]);
      setProductPrice([]);
      setDeletProduct([]);
      alert('Pedido criado com sucesso!')
    })
    .catch((error) => console.log("error", error));
  };


  return (
    <div>
      <table className='itens'>
        <tbody>
          <tr>
            <th>Café da Manhã</th>
            <th>Preço</th>
          </tr>
          {menuCafe.map((produto) => (
            <tr key={produto.id}>
              <div className="menuProducts">
                <img src={produto.image} alt={`${produto.name}`} />
              </div>
              <td>{produto.name}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button onClick={() => handleAddItems(produto)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='itens'>
        <tbody>
          <tr>
            <th>Hambúrgueres</th>
            <th>Adicionais</th>
            <th>Preço</th>
          </tr>
          {menuHamburgers.map((produto) => (
            <tr key={produto.id}>
              <div className="menuProducts">
                <img src={produto.image} alt={`${produto.name}`} />
              </div>
              <td>{produto.name + ' ' + produto.flavor}</td>
              <td>{produto.complement === 'null' ? '' : produto.complement}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button onClick={() => handleAddItems(produto)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='itens'>
        <tbody>
          <tr>
            <th>Acompanhamentos</th>
            <th>Preço</th>
          </tr>
          {side.map((produto) => (
            <tr key={produto.id}>
              <div className="menuProducts">
                <img src={produto.image} alt={`${produto.name}`} />
              </div>
              <td>{produto.name}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button onClick={() => handleAddItems(produto)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='itens'>
        <tbody>
          <tr>
            <th>Bebidas</th>
            <th>Preço</th>
          </tr>
          {menuBebidas.map((produto) => (
            <tr key={produto.id}>
              <div className="menuProducts">
                <img src={produto.image} alt={`${produto.name}`} />
              </div>
              <td>{produto.name}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button onClick={() => handleAddItems(produto)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='itens'>
        <tbody>
          <tr>
            <th>Produtos adicionados</th>
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
                <button onClick={() => handleDelete(produto)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <label>Name:</label><br/>
        <input
          name="name"
          type="text"
          onChange={(e) => setPedidos({ ...orderPedidos, client: e.target.value })}
        /><br/>
        <label>Numero da mesa:</label><br/>
        <input
          name="table"
          type="text"
          onChange={(e) => setPedidos({ ...orderPedidos, table: e.target.value })}
        /><br/>
        <div>
          <h3>Total</h3>
          <h3>R${total}</h3>
          <button onClick={() => handleTotalItems()}>Totalizar itens</button>
          <button onClick={() => submitOrder()}>Finalizar pedido</button>
        </div>
    </div>
  );
}
export default Menu;