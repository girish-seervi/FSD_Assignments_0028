import React from 'react';
import { localUsers } from '../data/users';
import Clock from '../components/Clock';

const Home = () => {
  const totalUsers = localUsers.length;
  const evenUsers = localUsers.filter(u => u.id % 2 === 0).length;
  const oddUsers = localUsers.filter(u => u.id % 2 !== 0).length;

  return (
    <div className="page-container">
      <header className="home-header">
        <h1>User Management Dashboard</h1>
        <p>College Assignment - React Web Application</p>
        <Clock />
      </header>

      <section className="stats-section">
        <h2>Quick Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Even Users</h3>
            <p className="stat-number">{evenUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Odd Users</h3>
            <p className="stat-number">{oddUsers}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
