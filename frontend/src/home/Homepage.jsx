import React from 'react';
import Nav from './Nav.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

function Homepage(){
    return(
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div 
                className="background-container" 
                style={{ backgroundImage: 'url(/Background.jpg)' }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Nav />
                <Main />
                <Footer />
            </div>
        </div>
    );
}

export default Homepage;
