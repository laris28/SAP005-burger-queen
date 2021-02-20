import React, { useState } from 'react';

export const Menu = () => {
    const [hamburgers, updateData] = useState ([]);

    let token = localStorage.getItem('token');
    console.log(token);

        const myHeader = new Headers();
        myHeader.append('Authorization', token);

        const [client,setClient] = useState('');
        const [table,setTable] = useState('');
        
        fetch('https://lab-api-bq.herokuapp.com/products', {
            method: 'GET',
            headers: myHeader,
            body: JSON.stringify()
        })
        .then(response => response.json())
        .then((response) => {
            updateData(response);
        }, [])
        .then(response => console.log(response))
        .catch(error => console.log('error', error));

        var myHeaders = new Headers();
myHeaders.append("Authorization", token);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"client":client,"table":table,"products":[{"id":29,"qtd":8}]});

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

  
    
    return(


        <div>
            <input type = "text" placeholder = "Nome do cliente" value={client} onChange={e=> setClient(e.target.value)}/>
         <input type = "text" placeholder = "Mesa" value={table} onChange={e=> setTable(e.target.value)}/>
         <button className="form-button" type='submit' onClick={(e) => {
                e.preventDefault();
                
                }}>Enviar Pedido</button>
            <h1>Menu</h1>
            {hamburgers.map(({id, name, price, image}) => {
                return(
                    <div className='container'>
                        <div className='card'>
                            <div class="card-container">
                                <li key={id }>
                                    <div className="hamburgers-thumb">
                                        <img src={image} alt={`${name} Thumb`} />
                                    </div>
                                    <p>{ name }</p>
                                    <p>R${ price }</p>
                                    <button id='submitItem'>Adicionar</button>
                                </li>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Menu;