import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useState, UseEffect } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Balance from './Components/Balance';
import Transactions from './Components/Transactions';
import Login from './Components/Login';

function App() {
  
  const [transactions, setTransactions] = useState([])
  const token = window.localStorage.getItem('token');
  const localUser = window.localStorage.getItem('user');

  return (
    <div className="App">
      <Navbar />
      {token ? <Balance user={localUser}/> : <Login />}
      {/* <Transactions transactions={transactions} /> */}
      <Footer />
    </div>
  );
}

export default App;
