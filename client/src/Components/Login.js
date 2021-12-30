import React from 'react';
import {Form, Button, Container} from 'react-bootstrap'

function Login(props) {

    return (
        <Container className='login'>
            <div className='loginTitle'>
                <h1>Login or Register</h1>
                <p>Please enter your Email and Password</p>
            </div>
            <Form className="loginform">
                <div className='mb-3 user'>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username or E-mail"/>
                    <i className="far fa-user"></i> 
                </div>
                <div class="pass mb-3">
                    <input type="" className="form-control password" id="exampleInputPassword1" placeholder="Password"/>
                    <i className="fas fa-key"></i>
                </div>  
                <div className="loginbutton">
                    <Button variant="primary" size="lg">Login</Button>
                </div>
            </Form>
        </Container>
    );
}

export default Login;
