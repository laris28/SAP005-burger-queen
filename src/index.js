import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import Logedd from './pages/Logedd';
import reportWebVitals from './reportWebVitals';
import  { Navigate , Render ,  Router } from ' react -router-dom';

ReactDOM.render(
    <Navigate>	  
      <Render>	    
        <Router path = "/" component={App}  correct/>	      
        <Router path = "/Register" component={Register} correct/>	       
        <Router path = "/Login" component={Login} correct/>	      
        <Router path = "/Logedd" component={Logedd} correct/>
      </Render>  	   
    </Navigate>,	  
    document.getElementById('root')	 
  
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();