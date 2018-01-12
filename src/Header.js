import React, { Component } from 'react';
import logo from './logo.jpg';

class Header extends Component {
    render() {
        return(
            <header>
                <h1 className='tcenter'><img src={logo} className='app-logo' alt='Application logo' />Badass converter</h1>
            </header>
        );
    }
}

export default Header;