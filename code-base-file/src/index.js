import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
// import { initializeApp } from 'firebase/app';
import 'firebase/database';
import './style.css';
import { Header } from './Components/App/Header';
import { Footer } from './Components/App/Footer';

// const firebaseConfig = {
//   apiKey: "AIzaSyAsZ8v2EvOi5_KXwe_JdPv_hRGSNjnDRHM",
//   authDomain: "info340myplan.firebaseapp.com",
//   databaseURL: "https://info340myplan-default-rtdb.firebaseio.com/",
//   projectId: "info340myplan",
//   storageBucket: "info340myplan.appspot.com",
//   messagingSenderId: "970126728751",
//   appId: "1:970126728751:web:d2e1586cd9812f94d030da",
//   measurementId: "G-QJ15MH0V1F"
// };

// const firebaseApp = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Router>
      <Header />
      <App />
      <Footer />
    </Router>,
  document.getElementById('root')
);
