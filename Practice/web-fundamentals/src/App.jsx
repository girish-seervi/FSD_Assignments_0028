import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('html');

  const renderContent = () => {
    switch (activeTab) {
      case 'html':
        return (
          <div className="content-section html-section">
            <h2>HTML: The Skeleton</h2>
            <p><strong>HTML (HyperText Markup Language)</strong> gives structure to your web pages. It's like the skeleton of a building. It uses <em>tags</em> to define elements like headings, paragraphs, and buttons.</p>
            <div className="example-box">
              <h3>Example Code</h3>
              <code>
                &lt;h1&gt;Welcome to My Website&lt;/h1&gt;<br />
                &lt;p&gt;This is a paragraph of text.&lt;/p&gt;<br />
                &lt;button&gt;Click Me!&lt;/button&gt;
              </code>
              <h3>Live Preview</h3>
              <div className="preview">
                <h1>Welcome to My Website</h1>
                <p>This is a paragraph of text.</p>
                <button>Click Me!</button>
              </div>
            </div>
          </div>
        );
      case 'css':
        return (
          <div className="content-section css-section">
            <h2>CSS: The Styling</h2>
            <p><strong>CSS (Cascading Style Sheets)</strong> is used to style your web page. It decides colors, fonts, layouts, and makes the skeleton look beautiful, like the paint and interior design of a building.</p>
            <div className="example-box">
              <h3>Example Code</h3>
              <code>
                button {'{'} <br />
                &nbsp;&nbsp;background-color: #3498db;<br />
                &nbsp;&nbsp;color: white;<br />
                &nbsp;&nbsp;padding: 10px 15px;<br />
                &nbsp;&nbsp;border-radius: 5px;<br />
                &nbsp;&nbsp;border: none;<br />
                {'}'}
              </code>
              <h3>Live Preview</h3>
              <div className="preview">
                <button style={{ backgroundColor: '#3498db', color: 'white', padding: '10px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Styled Button</button>
              </div>
            </div>
          </div>
        );
      case 'js':
        return (
          <div className="content-section js-section">
            <h2>JavaScript: The Interactivity</h2>
            <p><strong>JavaScript (JS)</strong> brings your website to life. It handles user actions (like clicks), animations, data fetching, and more. It's like the electricity and plumbing in a building.</p>
            <div className="example-box">
              <h3>Example Code</h3>
              <code>
                const button = document.querySelector('button');<br />
                <br />
                button.addEventListener('click', () =&gt; {'{'}<br />
                &nbsp;&nbsp;alert('Hello World!');<br />
                {'}'});
              </code>
              <h3>Live Preview</h3>
              <div className="preview">
                <button onClick={() => alert('Hello World! Javascript is working.')} style={{ backgroundColor: '#3498db', color: 'white', padding: '10px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Click for Alert</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Web Fundamentals</h1>
        <p>A simple guide to how the web works using HTML, CSS, and JavaScript</p>
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

        <div className="tab-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
