import React from 'react';
import { 
    Nav,
} from '../StyledComponents/Style';
import piggy from '../pigbank.png';

function Navbar() {
    return (
        <Nav>
            <a className="navbar-brand" href="#">
                <img src={piggy} alt="" width="100" height="100" className="d-inline-block align-text-top"/>
            </a>
            <h5>Alkemy Balance</h5>
        </Nav>
    );
}

export default Navbar;