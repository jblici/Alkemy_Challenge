import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import EditTransaction from './Components/EditTransaction';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Login from './Components/Login';
import Landing from './Components/Landing';

function App() {
  return (
    <div className="App">
    <Navbar/>
      <Router>
        <Routes>
          <Route element={<Landing />} exact path='/'/>
          <Route element={<Login />} exact path='/login'/>
          <Route element={<EditTransaction />} exact path='/:userId/:id'/>
          <Route element={<Home />} exact path='/home'/>
        </Routes>
      </Router>
      {/* <Transactions transactions={transactions} /> */}
      <Footer />
    </div>
  );
}

export default App;
