import React, { useState, useEffect } from 'react';
import './App.css';
import { webTopics } from './data/topics';

function App() {
  const [activeTab, setActiveTab] = useState('html');
  const [activeSubTopic, setActiveSubTopic] = useState(webTopics['html'][0].id);

  // When tab changes, reset the subtopic to the first one in the new category
  useEffect(() => {
    setActiveSubTopic(webTopics[activeTab][0].id);
  }, [activeTab]);

  const currentCategoryTopics = webTopics[activeTab];
  const currentTopic = currentCategoryTopics.find(t => t.id === activeSubTopic) || currentCategoryTopics[0];

  return (
    <div className="app-container">
      <header className="header">
        <h1>Web Fundamentals</h1>
        <p>A comprehensive guide to HTML, CSS, and JavaScript based on the IBM Web Fundamentals course.</p>
      </header>
      
      <main className="main-content">
        <div className="tabs">
          <button 
            className={`tab-btn html-tab ${activeTab === 'html' ? 'active' : ''}`}
            onClick={() => setActiveTab('html')}
          >
            HTML
          </button>
          <button 
            className={`tab-btn css-tab ${activeTab === 'css' ? 'active' : ''}`}
            onClick={() => setActiveTab('css')}
          >
            CSS
          </button>
          <button 
            className={`tab-btn js-tab ${activeTab === 'js' ? 'active' : ''}`}
            onClick={() => setActiveTab('js')}
          >
            JavaScript
          </button>
        </div>

        <div className="workspace">
          <div className="sidebar">
            <h3 className="sidebar-title">{activeTab.toUpperCase()} Topics</h3>
            <ul className="topic-list">
              {currentCategoryTopics.map((topic) => (
                <li key={topic.id}>
                  <button 
                    className={`topic-btn ${activeSubTopic === topic.id ? 'active' : ''}`}
                    onClick={() => setActiveSubTopic(topic.id)}
                  >
                    {topic.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="content-area">
            <div className={`content-section ${activeTab}-section`}>
              <h2>{currentTopic.title}</h2>
              <p className="description">{currentTopic.description}</p>
              
              <div className="example-box">
                <h3>Example Code</h3>
                <pre><code>{currentTopic.code}</code></pre>
                
                <h3>Live Preview</h3>
                <div className="preview">
                  {currentTopic.preview}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
