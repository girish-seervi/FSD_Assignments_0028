import React from 'react';

const researchData = [
  {
    icon: 'fa-solid fa-book-open',
    title: 'Publications',
    count: '350+',
    description:
      'Research papers published in reputed national and international journals and conferences.',
    buttonText: 'View Publications',
  },
  {
    icon: 'fa-solid fa-lightbulb',
    title: 'Projects',
    count: '75+',
    description:
      'Faculty and student projects solving real-world industrial and societal problems.',
    buttonText: 'Explore Projects',
  },
  {
    icon: 'fa-solid fa-award',
    title: 'Patents',
    count: '25+',
    description:
      'Innovative solutions protected through intellectual property development.',
    buttonText: 'View Patents',
  },
  {
    icon: 'fa-solid fa-handshake',
    title: 'Collaborations',
    count: '40+',
    description:
      'Academic and industry partnerships promoting innovation and knowledge sharing.',
    buttonText: 'Partners',
  },
];

const ResearchInnovation = () => {
  return (
    <section id="research" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">RESEARCH &amp; DEVELOPMENT</span>
          <h2 className="section-title">Research &amp; Innovation</h2>
          <p className="text-muted">
            Creating solutions through interdisciplinary research, innovation,
            entrepreneurship and collaboration.
          </p>
        </div>

        <div className="row g-4">
          {researchData.map((item, idx) => (
            <div className="col-lg-3 col-md-6" key={idx}>
              <div className="research-card h-100 d-flex flex-column">
                <div className="research-icon">
                  <i className={item.icon}></i>
                </div>
                <h4>{item.title}</h4>
                <h2>{item.count}</h2>
                <p className="flex-grow-1">{item.description}</p>
                <a href="#contact" className="btn btn-outline-warning mt-3">
                  {item.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchInnovation;
