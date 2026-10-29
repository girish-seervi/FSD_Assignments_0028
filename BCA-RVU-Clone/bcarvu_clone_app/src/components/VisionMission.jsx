import React from 'react';

const VisionMission = () => {
  return (
    <section className="vision-mission py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">OUR VALUES</span>
          <h2 className="section-title">Vision &amp; Mission</h2>
        </div>

        <div className="row g-4">
          {/* Vision */}
          <div className="col-lg-6">
            <div className="vision-card">
              <div className="vm-icon">
                <i className="fa-solid fa-eye"></i>
              </div>
              <h3>Vision</h3>
              <p>Yet to add</p>
            </div>
          </div>

          {/* Mission */}
          <div className="col-lg-6">
            <div className="vision-card">
              <div className="vm-icon">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h3>Mission</h3>
              <ul>
                <li>Under maintanennce</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
