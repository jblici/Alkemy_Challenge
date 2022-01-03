import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import NewTransaction from './NewTransaction';
import Transactions from './Transactions';
import axios from 'axios';

function Balance() {
    const [show, setShow] = useState(false);
    const user = window.localStorage.getItem('user');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if (user) {
        return (
            <Container className="wallet">
                <div className="wallet-title">
                    <Button className="newTransactionButton" size="lg" variant="outline-dark" onClick={handleShow}>+ Add Transaction</Button>
                </div>
                <NewTransaction show={show} handleClose={handleClose}/>
                <div className="wallet-division">
                    <div className="row">
                        <div className="col-4 income">
                            <p>Income</p>
                        </div>
                        <div className="col-4 positive-balance">
                            <p>Balance</p>
                        </div>
                        <div className="col-4 expense">
                            <p>Expenses</p>
                        </div>
                    </div>
                </div>
            </Container>
        );
    } else {
        return <h1>Please login</h1>
    }
}

export default Balance;