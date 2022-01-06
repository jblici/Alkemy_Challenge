import {useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';

function Login() {
    let navigate = useNavigate()
    const [user, setUser] = useState({
        email: '', 
        password: ''
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            if(!user.email || !user.password) {
                swal("Error", 'Please fill the fields', 'error');
                return;
            }
            const newUser = {email: user.email, password: user.password, };
            const data = await axios.post('http://localhost:3001/auth/signin', newUser);
            localStorage.setItem('user', JSON.stringify(data.data));
            swal('Welcome!', "Start saving money!", 'success');
            navigate('/home');
        } catch (err) {
            swal("Error", 'Something went wrong, please try again', 'error');
            console.log(err)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            if(!user.email || !user.password) {
                swal("Error", 'Please fill the fields', 'error');
                return;
            }
            const newUser = {email: user.email, password: user.password, };
            const data = await axios.post('http://localhost:3001/auth/signup', newUser);
            localStorage.setItem('user', JSON.stringify(data.data));
            swal('Welcome!', "Start saving money!", 'success');
            navigate('/home');
        } catch (err) {
            swal("Error", 'Something went wrong, please try again', 'error');
            console.log(err)
        }
    }

    return (
        <Container className='login'>
            <div className='loginTitle'>
                <h1>Login or Register</h1>
                <p>Please enter your Email and Password</p>
            </div>
            <Form className="loginform">
                <div className='mb-3 user'>
                    <input type="email" onChange={handleChange} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username or E-mail"/>
                    <i className="far fa-user"></i> 
                </div>
                <div className="pass mb-3">
                    <input type="password" onChange={handleChange} name='password' className="form-control password" id="exampleInputPassword1" placeholder="Password"/>
                    <i className="fas fa-key"></i>
                </div>  
                <div className="loginbutton">
                    <Button variant="primary" onClick={handleLogin} size="lg">Login</Button>
                    <Button variant="primary" onClick={handleRegister} size="lg">Register</Button>
                </div>
            </Form>
        </Container>
    );
}


export default Login;
