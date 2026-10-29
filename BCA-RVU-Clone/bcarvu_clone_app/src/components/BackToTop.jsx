import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="backToTop"
      className={show ? 'show' : ''}
      onClick={scrollToTop}
      aria-label="Back to Top"
      title="Back to Top"
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
};

export default BackToTop;
