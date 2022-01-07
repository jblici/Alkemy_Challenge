import React from 'react';
import { Container } from 'react-bootstrap';
import { StyledLink, Circle } from '../StyledComponents/Style';

function Landing(props) {
    const localUser = JSON.parse(localStorage.getItem('user'));
    return (
        <Container className='login'>
            <h1>Welcome!</h1>
            <br></br>
            { localUser ? (
                <StyledLink to='/home'>
                <Circle>    
                <h3>My Wallet</h3>
                    </Circle>
                </StyledLink>    
            ) 
            : 
            (
                <StyledLink to='/login'>
                    <Circle>
                        <h3>Please Login..</h3>
                    </Circle>
                </StyledLink>
            ) 
            }
        </Container>
    );
}

export default Landing;