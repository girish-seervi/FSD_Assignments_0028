import React from 'react';

const achievements = [
  {
    icon: 'fa-solid fa-trophy',
    title: 'National Hackathon Winners',
    description:
      'Students secured top positions in national-level coding competitions and innovation challenges.',
  },
  {
    icon: 'fa-solid fa-medal',
    title: 'University Rank Holders',
    description:
      'Consistent academic excellence with multiple university toppers every year.',
  },
  {
    icon: 'fa-solid fa-rocket',
    title: 'Startup Innovators',
    description:
      'Students developing entrepreneurial solutions through innovation cells and incubation centers.',
  },
];

const Achievements = () => {
  return (
    <section className="py-5" id="achievements">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">STUDENT SUCCESS</span>
          <h2 className="section-title">Student Achievements</h2>
        </div>

        <div className="row g-4">
          {achievements.map((item, idx) => (
            <div className="col-lg-4 col-md-6" key={idx}>
              <div className="achievement-card h-100">
                <i className={item.icon}></i>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
