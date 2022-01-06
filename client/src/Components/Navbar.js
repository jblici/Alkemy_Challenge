import React from 'react';
import piggy from '../pigbank.png';
import logout from '../logout.png';
import { Nav } from '../StyledComponents/Style';

function Navbar() {
    const localUser = JSON.parse(localStorage.getItem('user'));

    const handleLocalStorage = () => {
        localStorage.removeItem('user');
    }

    return (
        <nav>
            <Nav>
                <a className="navbar-brand" href="/">
                    <img src={piggy} alt="" className="d-inline-block align-text-top piggy"/>
                </a>
                <h5>Alkemy Wallet</h5>
                {localUser ? (
                    <div className="logout">
                        <a onClick={handleLocalStorage} className="navbar-brand" href="/login">
                            <img src={logout} alt="" className="d-inline-block align-text-top logoutlogo"/> 
                            <h5>Logout</h5>
                        </a>
                    </div>
                ) 
                : (
                    <div></div>
                )}
            </Nav>
        </nav>
    );
}

export default Navbar;