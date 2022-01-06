import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import EditTransaction from './Components/EditTransaction';
import NewTransaction from './Components/NewTransaction';
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
          <Route element={<Home />} exact path='/home'/>
          <Route element={<NewTransaction />} exact path='/new/:userId'/>
          <Route element={<EditTransaction />} exact path='/edit/:userId/:id' />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
