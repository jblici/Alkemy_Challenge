import React from 'react';
import { Container } from 'react-bootstrap';
import { StyledLink } from '../StyledComponents/Style';

function Landing(props) {
    return (
        <Container className='login'>
            <h1>Welcome!</h1>
            <StyledLink to='/login'>
                <h3>Please Login..</h3>
            </StyledLink>
        </Container>
    );
}

export default Landing;