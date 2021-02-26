import {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";


export const Menu = () => {
  const [client,setClient] = useState('');
  const [table,setTable] = useState('');
  const [send, setSend] = useState('');

  const [menuHamburgers, setHamburgers] = useState([]);
  const [orderPedidos, setPedidos] = useState([]);
  const [menuCafe, setCafe] = useState([]);
  const [side, setSide] = useState([]);
  const [menuBebidas, setBebidas] = useState([]);
  const [listItens, setItens] = useState([]); //add todos os produtos
  const [deleteProduct, setDeletProduct] = useState([]);
  const [total, setTotal] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    return fetch("https://lab-api-bq.herokuapp.com/products", {
      method: 'GET',
      headers: {Authorization: token},
      redirect: 'follow'
    })
    .then(response => response.json())
    .then(result => {
      const item = result;
      const drinks = item.filter((product) => product.sub_type.includes("drinks"));
      const cafe = item.filter((product) => product.type.includes("breakfast"));
      const hamburgers = item.filter((product) => product.sub_type.includes("hamburguer"));
      const acompanhamentos = item.filter((product) => product.sub_type.includes("side"));
      setBebidas(drinks);
      setCafe(cafe);
      setHamburgers(hamburgers);
      setSide(acompanhamentos);
    })
    .catch(error => console.log('error', error));
  }, []);

  const handleAddItens = (product) => {
    setPedidos([...listItens, product]);
    setProductPrice([...productPrice, product]);

    const addProdutos = listItens.map((product) => {
    return {
      id: product.id, 
      qtd: 1,
    }
    })

    const requestQtd = addProdutos.reduce(
      function(x, y) { //x= id, y=qtd
        x[y.id] = x[y.id]||[];
        x[y.id].push(y);
        return x;
      }, Object.create(null));

    const list = [];
      for (const [key, value] of Object.entries(requestQtd)) {
        list.push({
          id: key,
          qtd: value.length,
        })
      }

      setItens({...orderPedidos, products: list});
      console.log(orderPedidos)
  }

  const handleTotalItens = () => {
    setTotal(productPrice.reduce((total, num) => total + num));
  }

  const handleDelite = (product) => {
    setTotal(productPrice.splice(listItens.indexOf(product), 1));
    setDeletProduct(listItens.splice(listItens.indexOf(product), 1));
    handleTotalItens();
  }

  const postOrders = () => {
    const token = localStorage.getItem('token');
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: 'POST',
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderPedidos),      
    })
    .then(response => {
      response.json()
      .then(result => console.log(result));
      setTotal([]);
      setProductPrice([]);
      setDeletProduct([]);
      setItens({});
      setPedidos([]);
    })
    .catch(error => console.log('error', error));
  }


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
                <button onClick={() => handleAddItens(produto)}>+</button>
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
                <button onClick={() => handleAddItens(produto)}>+</button>
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
                <button onClick={() => handleAddItens(produto)}>+</button>
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
                <button onClick={() => handleAddItens(produto)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total</h3>
      <h3>R${total}</h3>
      <button onClick={() => handleTotalItens()}>Totalizar itens</button>
      <button onClick={() => postOrders()}>Finalizar pedido</button>
      <input type = "text" placeholder = "Client" value={client} onChange={e=> setClient(e.target.value)}/>
        <input type = "text" placeholder = "Mesa" value={table} onChange={e=> setTable(e.target.value)}/>
        <button className="form-button" type='submit' onClick={(e) => {
          e.preventDefault();
          postOrders();
        }}>Enviar Pedido</button>
    </div>
  );
};

export default Menu;

