import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Balance from './Components/Balance';
import Transactions from './Components/Transactions';
import NewTransaction from './Components/NewTransaction'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Balance />
      <Transactions />
      <NewTransaction />
      <Footer />
    </div>
  );
}

export default App;
