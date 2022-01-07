import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);
    const localUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get(`http://localhost:3001/operations/${localUser.user.id}`)
        .then(response => {
            setTransactions(response.data.op)
            setUser(response.data.user)
        })
        .catch(error => console.log(error))
    },[localUser.user.id])

    if (user) {
        return (
            <Container className="wallet">
                <div className="wallet-title">
                    <Link to={`/new/${user.id}`}>
                        <Button className="newTransactionButton" size="lg" variant="outline-dark">+ Add Transaction</Button>
                    </Link>
                </div>
                <div className="wallet-division">
                    <div className="row">
                        <div className="col-4 income">
                            { transactions.filter(t => t.type === 'income').map(t=> (
                                <div className='detail' key={t.id}>
                                    <div className='date'>{t.date.split('T')[0]}</div>
                                    <div className='detailTitle'>{t.description.slice(0,8)}</div>
                                    <div>${t.amount}</div>
                                    <div className='editdeletebuttons'>
                                        <Link to={`/edit/${t.userId}/${t.id}`}>
                                            <button className='btn btn-outline-info opButton'>Info</button>
                                        </Link>
                                    </div>
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
                                    <div className='detailTitle'>{t.description.slice(0,8)}  </div>
                                    <div className='amount'>${t.amount}</div>
                                    <div className='editdeletebuttons'>
                                        <Link to={`/edit/${t.userId}/${t.id}`}>
                                            <button className='btn btn-outline-info opButton'>Info</button>
                                        </Link>
                                    </div>
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