import React, { useState, useMemo } from 'react';
import { facultyData } from '../data/facultyData';

const FacultyDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [designationFilter, setDesignationFilter] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const filteredFaculty = useMemo(() => {
    return facultyData.filter((faculty) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        term === '' ||
        faculty.name.toLowerCase().includes(term) ||
        faculty.research.toLowerCase().includes(term) ||
        faculty.qualification.toLowerCase().includes(term);

      let matchesDesignation = true;
      if (designationFilter !== 'all') {
        const normFilter = designationFilter.toLowerCase();
        const normDesig = faculty.designation.toLowerCase();

        if (normFilter === 'assistant professor') {
          matchesDesignation =
            normDesig.includes('assistant') || normDesig.includes('assistent');
        } else if (normFilter === 'associate professor') {
          matchesDesignation = normDesig.includes('associate');
        } else if (normFilter === 'professor') {
          matchesDesignation =
            normDesig.includes('professor') &&
            !normDesig.includes('assistant') &&
            !normDesig.includes('assistent') &&
            !normDesig.includes('associate');
        } else {
          matchesDesignation = normDesig === normFilter;
        }
      }

      return matchesSearch && matchesDesignation;
    });
  }, [searchTerm, designationFilter]);

  return (
    <section id="faculty" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">OUR FACULTY</span>
          <h2 className="section-title">Faculty Directory</h2>
          <p className="section-description">
            Meet our experienced academicians, researchers, and industry experts
            dedicated to academic excellence.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 ps-3">
                <i className="fa-solid fa-magnifying-glass text-muted"></i>
              </span>
              <input
                type="text"
                id="facultySearch"
                className="form-control form-control-lg border-start-0"
                placeholder="Search faculty by name or research area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary border-start-0"
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <select
              id="designationFilter"
              className="form-select form-select-lg"
              value={designationFilter}
              onChange={(e) => setDesignationFilter(e.target.value)}
            >
              <option value="all">All Designations</option>
              <option value="Professor">Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
            </select>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="row g-4" id="facultyContainer">
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map((faculty, index) => (
              <div className="col-lg-4 col-md-6" key={faculty.email || index}>
                <div className="faculty-card d-flex flex-column h-100">
                  <img
                    src={faculty.image}
                    className="faculty-image"
                    alt={faculty.name}
                  />
                  <div className="faculty-body d-flex flex-column flex-grow-1">
                    <h4>{faculty.name}</h4>
                    <span className="designation">{faculty.designation}</span>

                    <p className="text-muted">
                      <i className="fa-solid fa-graduation-cap"></i>{' '}
                      {faculty.qualification}
                    </p>

                    <p className="text-muted">
                      <i className="fa-solid fa-microchip"></i>{' '}
                      {faculty.research}
                    </p>

                    <div className="mt-auto pt-3">
                      <button
                        className="btn btn-outline-warning w-100 ripple"
                        onClick={() => setSelectedFaculty(faculty)}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="p-4 bg-white rounded-4 shadow-sm max-w-md mx-auto">
                <i className="fa-solid fa-user-slash fa-3x text-warning mb-3"></i>
                <h5>No Faculty Found</h5>
                <p className="text-muted mb-3">
                  No faculty member matched your current search or designation filter.
                </p>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    setSearchTerm('');
                    setDesignationFilter('all');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Faculty Profile Modal */}
      {selectedFaculty && (
        <div
          className="modal fade show"
          id="facultyModal"
          tabIndex="-1"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={() => setSelectedFaculty(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Faculty Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedFaculty(null)}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body p-4" id="facultyModalBody">
                <div className="row align-items-center">
                  <div className="col-md-5 text-center mb-4 mb-md-0">
                    <img
                      src={selectedFaculty.image}
                      className="img-fluid rounded-circle mb-3 shadow"
                      alt={selectedFaculty.name}
                      style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'cover',
                        border: '5px solid var(--gold)',
                      }}
                    />
                    <div className="badge bg-warning text-dark px-3 py-2">
                      {selectedFaculty.cabin ? `Cabin: ${selectedFaculty.cabin}` : 'Department Block'}
                    </div>
                  </div>

                  <div className="col-md-7">
                    <h3 className="mb-1">{selectedFaculty.name}</h3>
                    <h5 className="text-warning mb-3">
                      {selectedFaculty.designation}
                    </h5>
                    <hr />

                    <div className="faculty-modal-details">
                      <p>
                        <strong>Qualification:</strong> {selectedFaculty.qualification}
                      </p>
                      <p>
                        <strong>Email:</strong>{' '}
                        <a
                          href={`mailto:${selectedFaculty.email}`}
                          className="text-decoration-none text-warning"
                        >
                          {selectedFaculty.email}
                        </a>
                      </p>
                      <p>
                        <strong>Cabin:</strong> {selectedFaculty.cabin}
                      </p>
                      <p>
                        <strong>Research Area:</strong> {selectedFaculty.research}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-top d-flex gap-2">
                      <a
                        href={`mailto:${selectedFaculty.email}`}
                        className="btn btn-warning btn-sm"
                      >
                        <i className="fa-solid fa-envelope me-1"></i> Send Email
                      </a>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setSelectedFaculty(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FacultyDirectory;
