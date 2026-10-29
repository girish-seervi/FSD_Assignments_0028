import React, { useState, useEffect, useRef } from 'react';

const statsData = [
  {
    icon: 'fa-solid fa-user-graduate',
    count: 1800,
    suffix: '+',
    label: 'Students',
  },
  {
    icon: 'fa-solid fa-chalkboard-user',
    count: 48,
    suffix: '+',
    label: 'Faculty',
  },
  {
    icon: 'fa-solid fa-laptop-code',
    count: 12,
    suffix: '',
    label: 'Laboratories',
  },
  {
    icon: 'fa-solid fa-briefcase',
    count: 97,
    suffix: '%',
    label: 'Placement %',
  },
  {
    icon: 'fa-solid fa-building',
    count: 210,
    suffix: '+',
    label: 'Recruiters',
  },
  {
    icon: 'fa-solid fa-award',
    count: 8500,
    suffix: '+',
    label: 'Alumni',
  },
];

const StatCard = ({ item, isVisible }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const totalFrames = 60;
    const frameRate = duration / totalFrames;
    const increment = item.count / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= item.count) {
        setDisplayCount(item.count);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isVisible, item.count]);

  return (
    <div className="col-lg-2 col-md-4 col-6">
      <div className="stat-card">
        <i className={item.icon}></i>
        <h2 className="counter">
          {displayCount}
          {item.suffix}
        </h2>
        <p>{item.label}</p>
      </div>
    </div>
  );
};

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats py-5" ref={sectionRef}>
      <div className="container">
        <div className="row text-center g-4">
          {statsData.map((item, index) => (
            <StatCard key={index} item={item} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
