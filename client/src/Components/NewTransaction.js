import {useState} from 'react';
import {Modal, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
//import Select from 'react-select';
import swal from 'sweetalert';
import axios from 'axios';

function NewTransaction({show, handleClose, user}) {
    const [newOperation, setNewOperation] = useState({
        description: '',
        amount: '',
        type: 'income',
        userId: user.id,
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(!newOperation.description || !newOperation.amount || !newOperation.type || !newOperation.date) {
                swal("Error", 'Please fill the fields', 'error');
                return;
            }
            const operation = {description: newOperation.description, amount: newOperation.amount, type: newOperation.type, userId: user.id, date: newOperation.date };
            console.log(operation)
            await axios.post('http://localhost:3001/operations/create', operation);
            handleClose()
            swal('Welcome!', "Start saving money!", 'success');
            navigate('/');
        } catch (err) {
            swal("Error", 'Something went wrong, please try again', 'error');
            console.log(err)
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input 
                className='form-control' 
                name="amount" 
                onChange={handleChange} 
                type='number' 
                min='0' 
                placeholder='$' />
                <div className='row mt-3 mb-3'>
                    <div className="col-6">
                        <div className="form-check">
                        <input 
                        className="form-check-input" 
                        name='type' 
                        onChange={handleChange} 
                        type="radio" 
                        value="income" 
                        checked />
                        <label className="form-check-label">
                        Income
                        </label>
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
                    <div className="col-6">
                        <label className="form-label">Date</label>
                        <input type="date" name='date' onChange={handleChange}className="form-control" />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea name="description" onChange={handleChange} rows="1" className="form-control"/>
                </div>
            </Modal.Body>
            <Modal.Footer centered='true'>
                <Button variant="danger" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewTransaction;