import React from 'react';

const events = [
  {
    date: '10 July 2026',
    title: 'National Level Coding Competition',
    description:
      'Department students participated in a national coding challenge and secured top rankings.',
  },
  {
    date: '25 June 2026',
    title: 'AI & Machine Learning Workshop',
    description:
      'Three-day hands-on workshop conducted with industry experts.',
  },
  {
    date: '15 May 2026',
    title: 'Campus Placement Drive',
    description:
      'Leading IT companies conducted recruitment drives for final-year students.',
  },
];

const NewsEvents = () => {
  return (
    <section id="events" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">LATEST UPDATES</span>
          <h2 className="section-title">News &amp; Events</h2>
        </div>

        <div className="timeline">
          {events.map((event, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-date">{event.date}</div>
              <div className="timeline-content">
                <h4>{event.title}</h4>
                <p className="mb-0">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
