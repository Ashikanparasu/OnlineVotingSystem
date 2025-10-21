import React from 'react';
import Nav from './Nav.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

function Homepage() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
        backgroundColor: '#000',
        color: '#fff',
      }}
    >
      {/* Fullscreen Background Section */}
      <section
        style={{
          backgroundImage: 'url(/Background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Navbar at top */}
        <div style={{ width: '100%' }}>
          <Nav />
        </div>

        {/* Main content center */}
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Main />
        </div>
      </section>

      {/* Footer below background */}
      <Footer />
    </div>
  );
}

export default Homepage;
