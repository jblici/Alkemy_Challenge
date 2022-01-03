import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch } from "wouter"
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login';

function App() {
  const [transactions, setTransactions] = useState([])
  const token = window.localStorage.getItem('token');

  return (
    <div className="App">
    <Navbar/>
      <Switch>
        <Route component={Login} exact path='/login'/>
        <Route component={Home} exact path='/'/>
      </Switch>
      {/* <Transactions transactions={transactions} /> */}
      <Footer />
    </div>
  );
}

export default App;
