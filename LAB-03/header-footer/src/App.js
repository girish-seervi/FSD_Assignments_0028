import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <h1 className="simple-replica-text">
          This is the replica of ixigo header and footer
        </h1>
      </main>

      <Footer />
    </div>
  );
}

export default App;
