import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import NewTransaction from './NewTransaction';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);
    const localUser = JSON.parse(localStorage.getItem('user'));
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3001/operations/${localUser.user.id}`)
        .then(response => {
            setTransactions(response.data.op)
            setUser(response.data.user)
        })
        .catch(error => console.log(error))
    },[localUser.user.id, show])

    const handleDelete = (operationId) => {
        axios.delete(`http://localhost:3001/operations/${operationId}`)
        setShow(false)
        navigate('/');
    }

    if (user) {
        return (
            <Container className="wallet">
                <div className="wallet-title">
                    <Button className="newTransactionButton" size="lg" variant="outline-dark" onClick={handleShow}>+ Add Transaction</Button>
                </div>
                <NewTransaction show={show} handleClose={handleClose} user={user}/>
                <div className="wallet-division">
                    <div className="row">
                        <div className="col-4 income">
                            { transactions.filter(t => t.type === 'income').map(t=> (
                                <div className='detail' key={t.id}>
                                    <div className='date'>{t.date.split('T')[0]}</div>
                                    <div>{t.description.slice(0,8)} ${t.amount}</div>
                                    <Link to={`/${t.userId}/${t.id}`}>
                                        <button className='btn btn-outline-info opButton'>Edit</button>
                                    </Link>
                                    <button onClick={(e) => handleDelete(t.id)} className='btn btn-outline-danger opButton'>Delete</button>
                                </div>
                            ))}
                        </div>
                        <div className="col-4 positive-balance" key={user.id}>
                            <h1>BALANCE</h1>
                            <h3>${user.balance||'0'}</h3>
                        </div>
                        <div className="col-4 expense">
                            { transactions.filter(t => t.type === 'expense').map(t=> (
                                <div className='detail' key={t.id}>
                                    <div className='date'>{t.date.split('T')[0]}</div>
                                    <div className='amount'>{t.description.slice(0,8)}  ${t.amount}</div>
                                    <Link to={`/${t.userId}/${t.id}`}>
                                        <button className='btn btn-outline-info opButton'>Edit</button>
                                    </Link>
                                    <button onClick={(e) => handleDelete(t.id)} className='btn btn-outline-danger opButton'>Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        )
    } else {
        return (<Link to='/login'><h1>Please login...</h1></Link>)
    }
}

export default Home;