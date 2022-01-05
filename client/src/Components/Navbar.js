import React from 'react';
import piggy from '../pigbank.png';
import { Nav } from '../StyledComponents/Style';

function Navbar() {
    return (
        <nav>
            <Nav>
                <a className="navbar-brand" href="/">
                    <img src={piggy} alt="" width="100" height="100" className="d-inline-block align-text-top"/>
                </a>
                <h5>Alkemy Wallet</h5>
            </Nav>
        </nav>
    );
}

export default Navbar;