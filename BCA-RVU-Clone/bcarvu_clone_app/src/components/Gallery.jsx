import React, { useState, useEffect, useCallback } from 'react';

const galleryImages = [
  {
    src: 'assets/gallery/gallery1.jpg',
    title: 'Department Tech Symposium',
    caption: 'Inaugural ceremony and keynote lecture on modern computing.',
  },
  {
    src: 'assets/gallery/gallery2.jpg',
    title: 'RVU 24-Hour Hackathon',
    caption: 'Students collaborating intensively during the annual hackathon.',
  },
  {
    src: 'assets/gallery/gallery3.jpg',
    title: 'AI & Robotics Demonstration',
    caption: 'Student demonstrations of intelligent vision and robotics projects.',
  },
  {
    src: 'assets/gallery/gallery4.jpg',
    title: 'Computing Lab Session',
    caption: 'Hands-on practical session in our state-of-the-art laboratory.',
  },
  {
    src: 'assets/gallery/gallery5.jpg',
    title: 'Student Project Showcase',
    caption: 'Department project exhibition and capstone evaluations.',
  },
  {
    src: 'assets/gallery/gallery6.jpg',
    title: 'Campus Life & Tech Fest',
    caption: 'Annual tech celebration bringing students and faculty together.',
  },
];

const Gallery = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') {
        setActiveIdx(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev + 1) % galleryImages.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx(
          (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
        );
      }
    },
    [activeIdx]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activeImage = activeIdx !== null ? galleryImages[activeIdx] : null;

  return (
    <>
      <section id="gallery" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">CAMPUS LIFE</span>
            <h2 className="section-title">Department Gallery</h2>
            <p className="text-muted">
              Explore our classrooms, laboratories, events, workshops, and
              student activities.
            </p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((img, idx) => (
              <div
                className="gallery-item"
                key={idx}
                onClick={() => setActiveIdx(idx)}
              >
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className="gallery-caption-overlay">
                  <h6 className="text-white mb-1">{img.title}</h6>
                  <small className="text-warning">
                    <i className="fa-solid fa-expand me-1"></i> View Fullscreen
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="lightbox"
          style={{ display: 'flex' }}
          onClick={() => setActiveIdx(null)}
        >
          <span
            className="close-lightbox"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx(null);
            }}
          >
            &times;
          </span>

          {/* Previous Button */}
          <button
            className="lightbox-nav-btn lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx(
                (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
              );
            }}
            aria-label="Previous image"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div
            className="lightbox-content text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.src}
              id="lightboxImage"
              alt={activeImage.title}
            />
            <div className="lightbox-caption mt-3 text-white">
              <h5 className="mb-1 text-warning">{activeImage.title}</h5>
              <p className="text-light small mb-0">{activeImage.caption}</p>
            </div>
          </div>

          {/* Next Button */}
          <button
            className="lightbox-nav-btn lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx((prev) => (prev + 1) % galleryImages.length);
            }}
            aria-label="Next image"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;
