import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Ananya Sharma',
    role: 'BCA Graduate',
    image: 'assets/images/student1.jpg',
    quote:
      'The department provided excellent technical exposure, industry training, and supportive faculty guidance.',
    company: 'Placed at TCS Digital',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Software Engineer',
    image: 'assets/images/student2.jpg',
    quote:
      'Modern laboratories and practical learning helped me build confidence for my professional career.',
    company: 'Placed at Microsoft',
    rating: 5,
  },
  {
    id: 3,
    name: 'Priya Nair',
    role: 'Data Analyst',
    image: 'assets/images/student3.jpg',
    quote:
      'The research culture and innovation opportunities encouraged me to build real-world projects.',
    company: 'Placed at Infosys',
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">STUDENT VOICES</span>
          <h2 className="section-title">Testimonials</h2>
        </div>

        {/* Desktop display of all 3 or mobile carousel */}
        <div className="d-none d-lg-block">
          <div className="row g-4">
            {testimonials.map((t) => (
              <div className="col-lg-4" key={t.id}>
                <div className="testimonial-card h-100 d-flex flex-column justify-content-between">
                  <div>
                    <img src={t.image} alt={t.name} loading="lazy" />
                    <div className="testimonial-rating text-warning mb-2">
                      {[...Array(t.rating)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star small me-1"></i>
                      ))}
                    </div>
                    <p>"{t.quote}"</p>
                  </div>
                  <div>
                    <h5 className="mb-1">{t.name}</h5>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet and Mobile Carousel */}
        <div className="d-lg-none position-relative">
          <div className="testimonial-carousel-container">
            <div className="testimonial-card">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
              />
              <div className="testimonial-rating text-warning mb-2">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star small me-1"></i>
                ))}
              </div>
              <p>"{testimonials[currentIndex].quote}"</p>
              <h5>{testimonials[currentIndex].name}</h5>
              <span>{testimonials[currentIndex].role}</span>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
            <button
              className="btn btn-sm btn-outline-warning rounded-circle"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              style={{ width: '40px', height: '40px' }}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="d-flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`pagination-bullet ${currentIndex === idx ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              className="btn btn-sm btn-outline-warning rounded-circle"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              style={{ width: '40px', height: '40px' }}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
