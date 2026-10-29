import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: 'assets/images/hero1.jpg',
    badge: 'RV UNIVERSITY',
    title: (
      <>
        Department of <span>Computer Applications</span>
      </>
    ),
    description:
      'Empowering students with innovation, technology, research, entrepreneurship and industry-ready computing skills.',
    buttons: (
      <div className="hero-buttons">
        <a href="#about" className="btn btn-gold ripple">
          Explore Department
        </a>
        <a href="#faculty" className="btn btn-outline-light ms-3">
          Meet Faculty
        </a>
      </div>
    ),
  },
  {
    id: 2,
    image: 'assets/images/hero2.jpg',
    badge: 'ACADEMIC EXCELLENCE',
    title: (
      <>
        Future Ready <span>Computing Education</span>
      </>
    ),
    description:
      'Artificial Intelligence, Data Science, Cyber Security, Cloud Computing & Software Engineering.',
    buttons: (
      <div className="hero-buttons">
        <a href="#programs" className="btn btn-warning">
          View Programs
        </a>
      </div>
    ),
  },
];

const typingWords = [
  'Innovation',
  'Artificial Intelligence',
  'Software Development',
  'Future Technology',
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Typing effect state
  const [typedText, setTypedText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect loop
  useEffect(() => {
    const currentWord = typingWords[wordIdx];
    let typingSpeed = 100;

    if (isDeleting) {
      typingSpeed = 50;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, charIdx + 1));
        setCharIdx(prev => prev + 1);

        if (charIdx + 1 >= currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setTypedText(currentWord.substring(0, charIdx - 1));
        setCharIdx(prev => prev - 1);

        if (charIdx - 1 <= 0) {
          setIsDeleting(false);
          setWordIdx(prev => (prev + 1) % typingWords.length);
          setCharIdx(0);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, wordIdx]);

  // Slide autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
  };

  return (
    <section
      className="hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="swiper heroSwiper position-relative h-100 overflow-hidden">
        <div
          className="swiper-wrapper h-100 d-flex"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="swiper-slide hero-slide flex-shrink-0 w-100 h-100 position-relative"
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="overlay"></div>
              <div className="container h-100 position-relative">
                <div className="hero-content">
                  <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                    <span className="badge bg-warning text-dark font-weight-bold">
                      {slide.badge}
                    </span>
                    <span className="hero-typing-badge badge bg-dark text-warning border border-warning">
                      <span className="me-1">Focus:</span>
                      <span className="typing">{typedText}</span>
                      <span className="typing-cursor">|</span>
                    </span>
                  </div>

                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  {slide.buttons}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="swiper-pagination custom-pagination">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`pagination-bullet ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="swiper-button-prev custom-nav-btn"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="swiper-button-next custom-nav-btn"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
