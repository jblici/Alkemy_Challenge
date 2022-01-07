import {useState, useEffect} from 'react';
import {Form, Button, Container} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function EditTransaction(props) {
    const {userId, id} = useParams();
    const [oldOperation, setOldOperation] = useState({
        description: '',
        amount: '',
        type: '',
        date: ''
    });
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3001/operations/${userId}/${id}`)
        .then(response => {
            setOldOperation({
                description: response.data.description, 
                amount: response.data.amount, 
                data: response.data.date
            })
        })
        .catch(error => console.log(error))
    },[id, userId])

    const handleChange = (e) => {
        setOldOperation({
            ...oldOperation,
            [e.target.name]: e.target.value
        })
    }

    const handleCancel = (e) => {
        navigate('/home');
    }

    const handleDelete = async () => {
        await axios.delete(`http://localhost:3001/operations/${id}`)
        navigate('/home');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const operation = {description: oldOperation.description, amount: parseInt(oldOperation.amount), id, userId };
            await axios.put(`http://localhost:3001/operations/${userId}/${id}`, operation);
            swal('Good job!', "Operation edit success!", 'success');
            navigate('/home');
        } catch (err) {
            swal("Error", 'Something went wrong, please try again', 'error');
            console.log(err)
        }
    }

    return (
        <Container className="login">
            <Form className='formnewedit'>
                <div className="loginTitle">
                    <h2>Edit Transaction</h2>
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
                        placeholder={`$ ${oldOperation.amount}`} />    
                    </div>
                    <div className="col-6">
                        <input type="date" name='date' placeholder={`${oldOperation.date}`} onChange={handleChange}className="form-control" />    
                    </div>
                </div>
                <div className="mb-3 mt-3">
                    <textarea name="description" onChange={handleChange} placeholder={`${oldOperation.description}`} rows="1" className="form-control"/>
                </div>
                </Form.Group>
                <div className='loginbutton'>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    <Button variant="primary" onClick={handleSubmit}>Edit</Button>
                </div>
            </Form>
        </Container>
    );
}

export default EditTransaction;