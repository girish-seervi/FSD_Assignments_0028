import React from 'react';

const stats = [
  {
    icon: 'fa-solid fa-money-bill-trend-up',
    value: '₹18 LPA',
    label: 'Highest Package',
  },
  {
    icon: 'fa-solid fa-chart-line',
    value: '₹6.5 LPA',
    label: 'Average Package',
  },
  {
    icon: 'fa-solid fa-user-check',
    value: '97%',
    label: 'Placement Rate',
  },
  {
    icon: 'fa-solid fa-building',
    value: '210+',
    label: 'Recruiting Partners',
  },
];

const internshipCards = [
  {
    icon: 'fa-solid fa-graduation-cap',
    count: '1200+',
    label: 'Students Completed Internships',
  },
  {
    icon: 'fa-solid fa-laptop',
    count: '150+',
    label: 'Industry Training Programs',
  },
  {
    icon: 'fa-solid fa-certificate',
    count: '2500+',
    label: 'Professional Certifications',
  },
];

const recruiters = [
  { name: 'TCS', logo: 'assets/logos/tcs.png' },
  { name: 'Infosys', logo: 'assets/logos/infosys.png' },
  { name: 'Wipro', logo: 'assets/logos/wipro.png' },
  { name: 'Accenture', logo: 'assets/logos/accenture.png' },
  { name: 'IBM', logo: 'assets/logos/ibm.png' },
  { name: 'Microsoft', logo: 'assets/logos/microsoft.png' },
];

const PlacementsRecruiters = () => {
  return (
    <>
      <section id="placements" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">CAREER OPPORTUNITIES</span>
            <h2 className="section-title">Placement Excellence</h2>
            <p className="text-muted">
              Our dedicated placement cell connects students with leading
              technology companies and global organizations.
            </p>
          </div>

          <div className="row g-4 text-center">
            {stats.map((stat, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div className="placement-stat">
                  <i className={stat.icon}></i>
                  <h2>{stat.value}</h2>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Internship Highlights */}
          <div className="row mt-5 g-4">
            {internshipCards.map((card, idx) => (
              <div className="col-lg-4" key={idx}>
                <div className="internship-card text-center">
                  <i className={card.icon}></i>
                  <h3>{card.count}</h3>
                  <p>{card.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiters Carousel Section */}
      <section className="recruiters py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Our Recruiting Partners</h2>
          </div>

          <div className="recruiter-carousel-wrapper overflow-hidden py-3">
            <div className="row g-4 justify-content-center align-items-center">
              {recruiters.map((recruiter, idx) => (
                <div className="col-lg-2 col-md-4 col-6" key={idx}>
                  <div className="company-logo">
                    <img
                      src={recruiter.logo}
                      alt={recruiter.name}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlacementsRecruiters;
