import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { 
    Circle,
} from '../StyledComponents/Style';

function Balance() {
    return (
        <Container>
                <div className="title">
                    Wallet
                    <div className="subTitle">
                        <div className="row">
                            <div className="col-4">
                                <p>Income</p>
                            </div>
                            <div className="col-4">
                                <p>Expenses</p>
                                
                            </div>
                            <div className="col-4">
                                <p>Balance</p>
                                
                            </div>
                        </div>
                        <button>Add Transaction</button>
                    </div>
                </div>
            
        </Container>
    );
}

export default Balance;