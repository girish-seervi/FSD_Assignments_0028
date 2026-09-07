import React from 'react';
import Counter from '../components/Counter';
import Toggle from '../components/Toggle';
import UserForm from '../components/UserForm';
import Todo from '../components/Todo';
import UserSearch from '../components/UserSearch';

const About = () => {
  return (
    <div className="page-container about-page">
      <h2>About This Project</h2>
      
      <section className="about-section">
        <h3>Project Objective</h3>
        <p>This is a complete React web application built as a college assignment. It demonstrates various core concepts of React such as functional components, Hooks, and client-side routing.</p>
      </section>

      <section className="about-section">
        <h3>Technologies Used</h3>
        <ul>
          <li><strong>React</strong>: JavaScript library for building user interfaces.</li>
          <li><strong>React Router DOM</strong>: Used for handling navigation without page reloads.</li>
          <li><strong>CSS3</strong>: For styling the application and ensuring a responsive grid layout.</li>
        </ul>
      </section>

      <section className="about-section">
        <h3>Routing & Even/Odd Explanation</h3>
        <p>
          React Router is used to map specific URLs to specific component views. 
          For example, the <code>/users/even</code> route renders a component that uses the <code>.filter()</code> 
          array method to only display users where <code>user.id % 2 === 0</code>. 
          The <code>/users/odd</code> route similarly filters for <code>user.id % 2 !== 0</code>.
        </p>
      </section>

      <section className="about-section lab-section">
        <h3>React Lab Demonstrations</h3>
        <p>Below are smaller isolated components demonstrating various React concepts:</p>
        
        <div className="lab-components-grid">
          <Counter />
          <Toggle />
          <UserForm />
          <Todo />
          <UserSearch />
        </div>
      </section>

    </div>
  );
};

export default About;
