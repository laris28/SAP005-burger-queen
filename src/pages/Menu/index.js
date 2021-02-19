import {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";


export const Menu = () => {
  const [menu, setMenu] = useState([]);
  let token = localStorage.getItem('token');
  console.log(token)

  useEffect(() => {
    var myHeaders = new Headers();
myHeaders.append("Authorization", token);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://lab-api-bq.herokuapp.com/products", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  })

    return (
      <>
          <h1>Bem vindo ao menu</h1>
          
      </>


    );
  }
  
  export default Menu;