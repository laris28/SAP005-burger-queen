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
      setItens([]);
      setPedidos({});
    })
    .catch(error => console.log('error', error));
  }

  return (
    <div className="cardapio">
      <h1>Bem vindo ao menu</h1>
      <h2 className="cafe">Menu do café da manhã</h2>
      <div>
        {menuCafe.map((item) => {
        console.log(item)
          return(
              <div>
                <li key={item.id }>
                  <div className="menuProducts">
                    <img src={item.image} alt={`${item.name}`} />
                  </div>
                  <p>{ item.name }</p>
                  <p>R${ item.price }</p>
                  <button onClick={() => { 
                    handleAddItens(item);
                  }}>Adicionar</button>
                </li>
              </div>
            )
          })}
          </div>
          <div>
            <h2 className="cafe">Menu do dia</h2>
          {menuHamburgers.map((item) => {
            console.log(item)
            return(
              <div>
                <li key={item.id }>
                  <div className="menuProducts">
                    <img src={item.image} alt={`${item.name}`} />
                  </div>
                  <p>{ item.name }</p>
                  <p>R${ item.price }</p>
                  <button onClick={() => { 
                    handleAddItens(item);
                  }}>Adicionar</button>
                </li>
              </div>
            )
          })}
          </div>
          <div>
            <h2 className="cafe">Menu de bebidas</h2>
           {menuBebidas.map((item) => {
            console.log(item)
            return(
              <div>
                <li key={item.id }>
                  <div className="menuProducts">
                    <img src={item.image} alt={`${item.name}`} />
                  </div>
                  <p>{ item.name }</p>
                  <p>R${ item.price }</p>
                  <button onClick={() => { 
                    handleAddItens(item);
                  }}>Adicionar</button>
                </li>
              </div>
               
            )
          })}
          </div>
          <div>
            <h2 className="cafe">Adicionais</h2>
           {side.map((item) => {
            console.log(item)
            return(
              <div>
                <li key={item.id }>
                  <div className="menuProducts">
                    <img src={item.image} alt={`${item.name}`} />
                  </div>
                  <p>{ item.name }</p>
                  <p>R${ item.price }</p>
                  <button onClick={() => { 
                    handleAddItens(item);
                  }}>Adicionar</button>
                </li>
              </div>

            )
          })}
          </div>
          <div>
            <h2 className="cafe">Total</h2>
          {listItens.map((item) => {
            console.log(item)
            return(
              <div>
                <li key={item.id }>
                  <div className="menuProducts">
                    <img src={item.image} alt={`${item.name}`} />
                  </div>
                  <p>{ item.name }</p>
                  <p>{ item.price }</p>
                  <button onClick={() => { 
                    handleDelite(item);
                  }}>Deletar</button>                
                </li>
              </div>

            )
          })}
          </div>
        <input type = "text" placeholder = "client" value={client} onChange={e=> setClient(e.target.value)}/>
        <input type = "text" placeholder = "Mesa" value={table} onChange={e=> setTable(e.target.value)}/>
        <button className="form-button" type='submit' onClick={(e) => {
          e.preventDefault();
          postOrders();
        }}>Enviar Pedido</button>
      </div>
  );
}

export default Menu;