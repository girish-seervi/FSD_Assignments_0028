import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0f172a',
      color: 'white',
      textAlign: 'center',
      padding: '1.5rem',
      marginTop: 'auto'
    }}>
      <p>&copy; {new Date().getFullYear()} ElectroMart – Electrical & Lighting Solutions. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
