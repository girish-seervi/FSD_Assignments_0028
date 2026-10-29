import React from 'react';

const AboutDepartment = () => {
  return (
    <section id="about" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">ABOUT THE DEPARTMENT</span>
          <h2 className="section-title">Excellence in Computer Applications</h2>
          <p className="section-description">
            The Department of Computer Applications provides high-quality
            education, advanced research, innovation, entrepreneurship, and
            industry collaboration.
          </p>
        </div>

        <div className="row g-4">
          {/* Overview */}
          <div className="col-lg-4">
            <div className="info-card h-100">
              <div className="icon-box">
                <i className="fa-solid fa-building-columns"></i>
              </div>
              <h4>Overview</h4>
              <p>
                Established with the vision of producing globally competent
                computing professionals, the department offers modern
                infrastructure, experienced faculty, and industry-focused learning.
              </p>
            </div>
          </div>

          {/* Objectives */}
          <div className="col-lg-4">
            <div className="info-card h-100">
              <div className="icon-box">
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <h4>Objectives</h4>
              <ul>
                <li>Deliver quality education</li>
                <li>Promote research culture</li>
                <li>Industry collaboration</li>
                <li>Innovation &amp; Entrepreneurship</li>
                <li>Lifelong learning</li>
              </ul>
            </div>
          </div>

          {/* Highlights */}
          <div className="col-lg-4">
            <div className="info-card h-100">
              <div className="icon-box">
                <i className="fa-solid fa-star"></i>
              </div>
              <h4>Department Highlights</h4>
              <ul>
                <li>Modern Computing Labs</li>
                <li>AI &amp; Data Science Center</li>
                <li>Industry Certifications</li>
                <li>Excellent Placements</li>
                <li>International Collaborations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDepartment;
