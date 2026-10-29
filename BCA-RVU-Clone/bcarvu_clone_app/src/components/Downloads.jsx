import React, { useState } from 'react';

const downloads = [
  {
    id: 'syllabus',
    icon: 'fa-solid fa-book',
    title: 'Syllabus',
    description: 'Latest curriculum and course structure.',
    fileName: 'BCA_Curriculum_Structure_2026.pdf',
  },
  {
    id: 'calendar',
    icon: 'fa-solid fa-calendar',
    title: 'Academic Calendar',
    description: 'Semester schedules and important dates.',
    fileName: 'RVU_Academic_Calendar_2026-27.pdf',
  },
  {
    id: 'timetable',
    icon: 'fa-solid fa-clock',
    title: 'Time Table',
    description: 'Class schedules and laboratory timings.',
    fileName: 'BCA_Semester_Class_Timetable.pdf',
  },
  {
    id: 'forms',
    icon: 'fa-solid fa-file-lines',
    title: 'Forms & Notices',
    description: 'Department forms and announcements.',
    fileName: 'Department_Notices_Forms.pdf',
  },
];

const Downloads = () => {
  const [downloadingItem, setDownloadingItem] = useState(null);

  const handleDownload = (item) => {
    setDownloadingItem(item.title);
    setTimeout(() => {
      setDownloadingItem(null);
    }, 2500);
  };

  return (
    <section id="downloads" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">RESOURCES</span>
          <h2 className="section-title">Downloads</h2>
        </div>

        {downloadingItem && (
          <div className="alert alert-success alert-dismissible fade show text-center max-w-md mx-auto mb-4" role="alert">
            <i className="fa-solid fa-circle-check me-2"></i>
            Downloading <strong>{downloadingItem}</strong> document...
          </div>
        )}

        <div className="row g-4">
          {downloads.map((item) => (
            <div className="col-lg-3 col-md-6" key={item.id}>
              <div className="download-card h-100 d-flex flex-column">
                <i className={item.icon}></i>
                <h4>{item.title}</h4>
                <p className="flex-grow-1">{item.description}</p>
                <button
                  className="btn btn-warning w-100 mt-3"
                  onClick={() => handleDownload(item)}
                >
                  <i className="fa-solid fa-download me-2"></i>
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Downloads;
