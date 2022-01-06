import {useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function NewTransaction(props) {
    const {userId} = useParams();
    const [newOperation, setNewOperation] = useState({
        description: '',
        amount: '',
        type: 'income',
        userId: userId,
        date: ''
    });
    let navigate = useNavigate()

    const handleChange = (e) => {
        setNewOperation({
            ...newOperation,
            [e.target.name]: e.target.value
        })
        console.log(newOperation)
    }

    const handleCancel = (e) => {
        navigate('/home');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(!newOperation.description || !newOperation.amount || !newOperation.type || !newOperation.date) {
                swal("Error", 'Please fill the fields', 'error');
                return;
            }
            const operation = {description: newOperation.description, amount: newOperation.amount, type: newOperation.type, userId, date: newOperation.date };
            console.log(operation)
            await axios.post('http://localhost:3001/operations/create', operation);
            swal('Welcome!', "Start saving money!", 'success');
            navigate('/home');
        } catch (err) {
            swal("Error", 'Something went wrong, please try again', 'error');
            console.log(err)
        }
    }

    return (
        <Container className="login">
            <Form className="formnewedit">
                <div className="loginTitle">
                    <h2>New Transaction</h2>
                </div>
                <Form.Group className="">
                <div className='row mt-3 mb-3'>
                    <div className="col-6">
                        <input 
                        className='form-control' 
                        name="amount" 
                        onChange={handleChange} 
                        type='number' 
                        min='0' 
                        placeholder='$ Amount' />    
                    </div>
                    <div className="col-6">
                        <input type="date" name='date' onChange={handleChange}className="form-control" />    
                    </div>
                </div>
                <div className="col-3">
                    <div className="form-check">
                        <input 
                        className="form-check-input" 
                        name='type' 
                        onChange={handleChange} 
                        type="radio" 
                        value="income" 
                        checked />
                        <label className="form-check-label">Income</label>
                    </div>
                    <div className="form-check">
                        <input 
                        className="form-check-input" 
                        name='type' 
                        onChange={handleChange} 
                        type="radio" 
                        value="expense"/>
                        <label className="form-check-label">
                        Expense
                        </label>
                    </div>
                </div>
                <div className="mb-3 mt-3">
                    <textarea name="description" onChange={handleChange} placeholder='Description' rows="1" className="form-control"/>
                </div>
                </Form.Group>
                <div className='loginbutton'>
                    <Button variant="danger" onClick={handleCancel}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </div>
            </Form>
        </Container>
    );
}

export default NewTransaction;