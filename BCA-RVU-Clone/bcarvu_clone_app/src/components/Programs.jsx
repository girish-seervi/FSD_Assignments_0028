import React, { useState } from 'react';

const programsData = [
  {
    id: 'bca',
    title: 'BCA',
    subtitle: 'Bachelor of Computer Applications',
    icon: 'fa-solid fa-laptop-code',
    description:
      'Strong foundation in programming, databases, networking, software engineering, and web technologies.',
    details: [
      'Core Programming (C, C++, Java, Python, Go)',
      'Data Structures & Algorithms',
      'Database Management Systems (SQL & NoSQL)',
      'Web Technologies & Full-Stack Development',
      'Operating Systems & Computer Networks',
      'Software Engineering & Agile Methodologies',
    ],
  },
];

const Programs = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <section id="programs" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">ACADEMICS</span>
          <h2 className="section-title">Programs Offered</h2>
          <p className="text-muted">
            Industry-oriented undergraduate programs designed to prepare students
            for emerging technologies.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {programsData.map((prog) => (
            <div key={prog.id} className="col-lg-4 col-md-6">
              <div className="program-card">
                <i className={prog.icon}></i>
                <h4>{prog.title}</h4>
                <p>{prog.description}</p>
                <button
                  className="btn btn-outline-warning mt-2"
                  onClick={() => setSelectedProgram(prog)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Program Details Modal */}
        {selectedProgram && (
          <div
            className="modal fade show"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)' }}
            tabIndex="-1"
            onClick={() => setSelectedProgram(null)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedProgram.title} — {selectedProgram.subtitle}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedProgram(null)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <p>{selectedProgram.description}</p>
                  <h6 className="text-warning mb-3">Key Focus Areas:</h6>
                  <ul className="list-unstyled">
                    {selectedProgram.details.map((item, idx) => (
                      <li key={idx} className="mb-2">
                        <i className="fa-solid fa-check text-warning me-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                    <span className="badge bg-light text-dark border">
                      Duration: 3 / 4 Years (Honours)
                    </span>
                    <a href="#contact" className="btn btn-warning btn-sm" onClick={() => setSelectedProgram(null)}>
                      Inquire Admissions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Programs;
