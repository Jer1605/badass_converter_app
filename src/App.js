import React, { Component } from 'react';
import Footer from './Footer';
import Header from './Header';
import ConverterEngine from './ConverterEngine';
import './App.css';

class App extends Component {
    render() {
        return(
            <section className='app'>
                <Header />
                <ConverterEngine />
                <Footer />
            </section>
    );
    }
}

export default App;