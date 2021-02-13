// import logo from './logo.svg';
// import './App.css';
// import User from './components/User';

// function App() {
//   return (
//     <div className="App">
//       <User/>
//     </div>
//   );
// }

// export default App;

import React, {useState, useEffect} from 'react';
import User from './User';

const App = () => {
  const [users, setUsers] = userState(data);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [pokemons, setPokemons] = useState([]);

  useEffect(()=> {
    fetch('https://pokeapi.co/api/v2/type/5')
      .then(result => result.json())
      .then(result => {
        console.log(result)
        setPokemons(result.pokemon)
      });
    }, []);

  // useEffect(()=> {
  //   console.log('Input description foi alterado!')
  // }, [users]);

  // useEffect(()=> {
  //   console.log('Input name foi alterado!')
  // }, [users]);

  // useEffect(()=> {
  //   console.log('Users foi alterado!')
  // }, [users]);

  // useEffect(()=> {
  //   console.log('Algum estado foi alterado!')
  // }, [users]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   setUsers(...users, {name, description}]);
  // }


  {
    pokemons.map((item, index) => {
      return(
        <p key= {index}>{item.pokemon.name}</p>
      )
    })
  }
}

export default App;
