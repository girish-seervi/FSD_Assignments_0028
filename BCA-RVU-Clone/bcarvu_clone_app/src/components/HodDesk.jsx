import React, { useState } from 'react';

const HodDesk = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="hod" className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-4 text-center">
            <img
              src="assets/faculty/hod.png"
              alt="Head of Department"
              className="img-fluid rounded-circle hod-image shadow-lg"
            />
          </div>

          <div className="col-lg-8">
            <span className="section-subtitle">HOD'S DESK</span>
            <h2 className="section-title">Message from the Head of Department</h2>

            <p className="lead">
              Welcome to the Department of Computer Applications. Our department is
              committed to nurturing future-ready professionals equipped with strong
              technical expertise, ethical values, innovation, and leadership
              qualities.
            </p>

            <p>
              Through industry-oriented curriculum, research-driven learning,
              cutting-edge laboratories, internships, innovation hubs, and
              collaboration with leading organizations, we prepare students to excel
              in the rapidly evolving world of computing.
            </p>

            <p>
              We believe education extends beyond classrooms. Our focus is on
              developing analytical thinking, creativity, teamwork,
              entrepreneurship, and lifelong learning among students.
            </p>

            {expanded && (
              <div className="mt-3 p-3 bg-white rounded shadow-sm border-start border-4 border-warning">
                <p className="mb-2">
                  <strong>Department Objectives &amp; Values:</strong> Our faculty
                  regularly mentors students for national and international hackathons,
                  peer-reviewed research papers, and startup incubations. We welcome
                  prospective students and industry collaborators to be part of our
                  vibrant technical ecosystem.
                </p>
                <p className="text-muted small mb-0">
                  — Department of Computer Applications, RV University, Bengaluru
                </p>
              </div>
            )}

            <button
              className="btn btn-warning ripple mt-3"
              onClick={() => setExpanded(prev => !prev)}
            >
              {expanded ? 'Show Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HodDesk;
