import React from 'react';

export const webTopics = {
  html: [
    {
      id: 'html-intro',
      title: 'Introduction & Structure',
      description: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It consists of a series of elements which you use to enclose, or wrap, different parts of the content to make it appear a certain way.',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document Title</title>
</head>
<body>
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>
</body>
</html>`,
      preview: (
        <div>
          <h1>My First Heading</h1>
          <p>My first paragraph.</p>
        </div>
      )
    },
    {
      id: 'html-text',
      title: 'Text Formatting',
      description: 'HTML provides several tags for formatting text, such as headings (h1 to h6), paragraphs (p), bold/strong text, and italic/emphasized text.',
      code: `<h1>Heading 1</h1>
<h2>Heading 2</h2>
<p>This is a standard paragraph.</p>
<p><strong>This text is important (bold).</strong></p>
<p><em>This text is emphasized (italic).</em></p>`,
      preview: (
        <div>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <p>This is a standard paragraph.</p>
          <p><strong>This text is important (bold).</strong></p>
          <p><em>This text is emphasized (italic).</em></p>
        </div>
      )
    },
    {
      id: 'html-lists',
      title: 'Lists',
      description: 'Lists are used to group a set of related items. HTML supports Unordered Lists (bullets) and Ordered Lists (numbers).',
      code: `<h3>Unordered List</h3>
<ul>
  <li>Apple</li>
  <li>Banana</li>
</ul>

<h3>Ordered List</h3>
<ol>
  <li>First Step</li>
  <li>Second Step</li>
</ol>`,
      preview: (
        <div>
          <h3>Unordered List</h3>
          <ul>
            <li>Apple</li>
            <li>Banana</li>
          </ul>
          <h3>Ordered List</h3>
          <ol>
            <li>First Step</li>
            <li>Second Step</li>
          </ol>
        </div>
      )
    },
    {
      id: 'html-links-images',
      title: 'Links & Images',
      description: 'Links (anchor tags) connect web pages, and image tags embed images into the document.',
      code: `<a href="https://www.ibm.com" target="_blank">Visit IBM</a>
<br/>
<img src="https://via.placeholder.com/150" alt="Placeholder Image" />`,
      preview: (
        <div>
          <a href="https://www.ibm.com" target="_blank" rel="noreferrer">Visit IBM</a>
          <br/><br/>
          <img src="https://via.placeholder.com/150" alt="Placeholder Image" />
        </div>
      )
    },
    {
      id: 'html-tables',
      title: 'Tables',
      description: 'HTML tables allow web developers to arrange data into rows and columns.',
      code: `<table border="1">
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>IBM</td>
    <td>Arvind Krishna</td>
    <td>USA</td>
  </tr>
  <tr>
    <td>Example Corp</td>
    <td>Jane Doe</td>
    <td>UK</td>
  </tr>
</table>`,
      preview: (
        <table style={{borderCollapse: 'collapse', width: '100%'}}>
          <thead>
            <tr>
              <th style={{border: '1px solid #ddd', padding: '8px'}}>Company</th>
              <th style={{border: '1px solid #ddd', padding: '8px'}}>Contact</th>
              <th style={{border: '1px solid #ddd', padding: '8px'}}>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>IBM</td>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>Arvind Krishna</td>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>USA</td>
            </tr>
            <tr>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>Example Corp</td>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>Jane Doe</td>
              <td style={{border: '1px solid #ddd', padding: '8px'}}>UK</td>
            </tr>
          </tbody>
        </table>
      )
    },
    {
      id: 'html-forms',
      title: 'Forms & Inputs',
      description: 'Forms are used to collect user input. They contain input elements like text fields, checkboxes, radio buttons, and submit buttons.',
      code: `<form>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  
  <label for="cars">Choose a car:</label><br>
  <select id="cars" name="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
  </select><br><br>
  
  <button type="button">Submit</button>
</form>`,
      preview: (
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="fname">First name:</label><br />
          <input type="text" id="fname" name="fname" style={{margin: '5px 0', padding: '5px'}}/><br />
          
          <label htmlFor="cars">Choose a car:</label><br />
          <select id="cars" name="cars" style={{margin: '5px 0', padding: '5px'}}>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select><br /><br />
          
          <button type="button" style={{padding: '5px 10px'}}>Submit</button>
        </form>
      )
    },
    {
      id: 'html-semantic',
      title: 'Semantic HTML',
      description: 'Semantic elements clearly describe their meaning to both the browser and the developer (e.g., <header>, <footer>, <article>, <nav>).',
      code: `<header>
  <h1>Website Header</h1>
  <nav>Navigation Links</nav>
</header>
<main>
  <section>
    <h2>Section Title</h2>
    <article>Article Content</article>
  </section>
</main>
<footer>
  <p>Website Footer</p>
</footer>`,
      preview: (
        <div style={{border: '1px solid #ccc', padding: '10px'}}>
          <header style={{backgroundColor: '#e9ecef', padding: '10px'}}>
            <h1 style={{margin: 0}}>Website Header</h1>
            <nav>Navigation Links</nav>
          </header>
          <main style={{padding: '10px'}}>
            <section style={{border: '1px dashed #999', padding: '10px'}}>
              <h2>Section Title</h2>
              <article style={{backgroundColor: '#f8f9fa', padding: '10px'}}>Article Content</article>
            </section>
          </main>
          <footer style={{backgroundColor: '#e9ecef', padding: '10px', marginTop: '10px'}}>
            <p style={{margin: 0}}>Website Footer</p>
          </footer>
        </div>
      )
    }
  ],
  css: [
    {
      id: 'css-intro',
      title: 'Selectors & Basic Styling',
      description: 'CSS (Cascading Style Sheets) is used to format the layout of a webpage. Selectors target HTML elements to apply styles based on element names, classes, or IDs.',
      code: `/* Element Selector */
p {
  color: blue;
}

/* Class Selector */
.highlight {
  background-color: yellow;
}

/* ID Selector */
#unique-text {
  font-weight: bold;
}`,
      preview: (
        <div>
          <p style={{color: 'blue'}}>This is a paragraph styled with an element selector.</p>
          <p className="highlight" style={{backgroundColor: 'yellow', padding: '5px'}}>This uses a class selector (.highlight).</p>
          <p id="unique-text" style={{fontWeight: 'bold'}}>This uses an ID selector (#unique-text).</p>
        </div>
      )
    },
    {
      id: 'css-box-model',
      title: 'The Box Model',
      description: 'All HTML elements can be considered as boxes. The CSS box model consists of: margins, borders, padding, and the actual content.',
      code: `.box {
  width: 200px;
  padding: 20px;       /* Space inside the border */
  border: 5px solid red; /* The border itself */
  margin: 15px;        /* Space outside the border */
  background-color: lightgray;
}`,
      preview: (
        <div style={{
          width: '200px',
          padding: '20px',
          border: '5px solid red',
          margin: '15px',
          backgroundColor: 'lightgray',
          textAlign: 'center'
        }}>
          Content (200px wide)
        </div>
      )
    },
    {
      id: 'css-typography',
      title: 'Typography & Colors',
      description: 'CSS provides properties to change fonts, text alignment, spacing, and colors (using names, HEX, RGB, or HSL).',
      code: `.text-style {
  font-family: 'Arial', sans-serif;
  font-size: 1.2rem;
  color: #ffffff;
  background-color: #3498db;
  text-align: center;
  letter-spacing: 2px;
  padding: 10px;
  border-radius: 5px;
}`,
      preview: (
        <div style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '1.2rem',
          color: '#ffffff',
          backgroundColor: '#3498db',
          textAlign: 'center',
          letterSpacing: '2px',
          padding: '10px',
          borderRadius: '5px'
        }}>
          Styled Text
        </div>
      )
    },
    {
      id: 'css-flexbox',
      title: 'Flexbox Layout',
      description: 'The Flexible Box Layout Module makes it easier to design flexible responsive layout structure without using float or positioning.',
      code: `.flex-container {
  display: flex;
  justify-content: space-between; /* align horizontally */
  align-items: center;            /* align vertically */
  background-color: #f1f1f1;
  padding: 10px;
}
.flex-item {
  background-color: #4CAF50;
  color: white;
  padding: 20px;
  margin: 5px;
}`,
      preview: (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f1f1f1',
          padding: '10px'
        }}>
          <div style={{backgroundColor: '#4CAF50', color: 'white', padding: '20px', margin: '5px'}}>Item 1</div>
          <div style={{backgroundColor: '#4CAF50', color: 'white', padding: '20px', margin: '5px'}}>Item 2</div>
          <div style={{backgroundColor: '#4CAF50', color: 'white', padding: '20px', margin: '5px'}}>Item 3</div>
        </div>
      )
    },
    {
      id: 'css-grid',
      title: 'Grid Layout',
      description: 'CSS Grid Layout offers a grid-based layout system, with rows and columns, making it easier to design complex web pages.',
      code: `.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10px;
  background-color: #2196F3;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  text-align: center;
}`,
      preview: (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          gap: '10px',
          backgroundColor: '#2196F3',
          padding: '10px'
        }}>
          <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', textAlign: 'center'}}>1</div>
          <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', textAlign: 'center'}}>2</div>
          <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', textAlign: 'center'}}>3</div>
          <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', textAlign: 'center'}}>4</div>
          <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', textAlign: 'center'}}>5</div>
          <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', textAlign: 'center'}}>6</div>
        </div>
      )
    },
    {
      id: 'css-responsive',
      title: 'Responsive Design (Media Queries)',
      description: 'Media queries allow you to apply CSS styles only when specific conditions are met, such as the viewport width. Essential for mobile-friendly designs.',
      code: `/* Default style (mobile first) */
.responsive-box {
  background-color: pink;
}

/* When the screen is 600px or wider */
@media screen and (min-width: 600px) {
  .responsive-box {
    background-color: lightgreen;
  }
}`,
      preview: (
        <div>
          <p><em>(Resize browser to see effect if this were an actual media query, simulated below)</em></p>
          <div style={{backgroundColor: 'lightgreen', padding: '20px', textAlign: 'center', border: '2px solid green'}}>
            I'm lightgreen on large screens!
          </div>
        </div>
      )
    }
  ],
  js: [
    {
      id: 'js-variables',
      title: 'Variables & Data Types',
      description: 'Variables store data values. Modern JS uses let and const. Data types include Strings, Numbers, Booleans, Arrays, and Objects.',
      code: `// Variables
const name = "Alice"; // String
let age = 25;         // Number
let isStudent = true; // Boolean

// Array
const fruits = ["Apple", "Banana", "Cherry"];

// Object
const person = {
  firstName: "John",
  lastName: "Doe"
};

console.log(name, age);`,
      preview: (
        <div style={{fontFamily: 'monospace', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px'}}>
          &gt; Alice 25<br/>
          &gt; ["Apple", "Banana", "Cherry"]<br/>
          &gt; {"{firstName: 'John', lastName: 'Doe'}"}
        </div>
      )
    },
    {
      id: 'js-operators',
      title: 'Operators & Conditionals',
      description: 'Operators perform operations on variables. Conditionals (if/else) allow you to execute different code based on conditions.',
      code: `let x = 10;
let y = 5;

// Arithmetic & Comparison
if (x > y && x === 10) {
  console.log("x is greater than y and exactly 10");
} else if (x == "10") {
  console.log("x is loosely equal to 10");
} else {
  console.log("Conditions not met");
}`,
      preview: (
        <div style={{fontFamily: 'monospace', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px'}}>
          &gt; x is greater than y and exactly 10
        </div>
      )
    },
    {
      id: 'js-functions',
      title: 'Functions',
      description: 'Functions are blocks of code designed to perform a particular task. Arrow functions provide a shorter syntax.',
      code: `// Traditional Function Declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Arrow Function (ES6)
const multiply = (a, b) => {
  return a * b;
};

// Concise Arrow Function
const square = x => x * x;

console.log(greet("World")); // Hello, World!`,
      preview: (
        <div style={{fontFamily: 'monospace', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px'}}>
          &gt; Hello, World!<br/>
          &gt; 20 (if multiply(4, 5))<br/>
          &gt; 25 (if square(5))
        </div>
      )
    },
    {
      id: 'js-loops',
      title: 'Loops & Iteration',
      description: 'Loops can execute a block of code a number of times. Common loops are for, while, and array iteration methods like forEach.',
      code: `// Standard For Loop
for (let i = 0; i < 3; i++) {
  console.log("Iteration " + i);
}

// Array forEach
const colors = ["red", "green", "blue"];
colors.forEach((color) => {
  console.log(color);
});`,
      preview: (
        <div style={{fontFamily: 'monospace', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px'}}>
          &gt; Iteration 0<br/>
          &gt; Iteration 1<br/>
          &gt; Iteration 2<br/>
          &gt; red<br/>
          &gt; green<br/>
          &gt; blue
        </div>
      )
    },
    {
      id: 'js-dom',
      title: 'DOM Manipulation',
      description: 'The Document Object Model (DOM) is a programming interface for web documents. JS can change HTML elements, attributes, and styles.',
      code: `// Select an element
const myElement = document.getElementById("demo");
const buttons = document.querySelectorAll(".btn");

// Change content and style
myElement.innerHTML = "Text changed by JS!";
myElement.style.color = "red";
myElement.style.fontSize = "20px";`,
      preview: (
        <div>
          <div style={{color: 'red', fontSize: '20px'}}>Text changed by JS!</div>
        </div>
      )
    },
    {
      id: 'js-events',
      title: 'Events',
      description: 'HTML events are "things" that happen to HTML elements (e.g., click, mouseover, keypress). JS can react to these events.',
      code: `const btn = document.querySelector("#myBtn");

// Add event listener
btn.addEventListener("click", function(event) {
  alert("Button was clicked!");
  console.log(event.target);
});`,
      preview: (
        <div>
          <button 
            onClick={() => alert("Button was clicked!")}
            style={{padding: '10px 15px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
          >
            Click Me
          </button>
        </div>
      )
    },
    {
      id: 'js-fetch',
      title: 'JSON & Fetch API',
      description: 'The Fetch API provides a JS interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses.',
      code: `// Fetch data from an API
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json()) // Parse JSON
  .then(data => {
    console.log(data.title);
  })
  .catch(error => {
    console.error('Error:', error);
  });`,
      preview: (
        <div style={{fontFamily: 'monospace', backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '4px'}}>
          &gt; Fetching data...<br/>
          &gt; "sunt aut facere repellat provident occaecati..."
        </div>
      )
    }
  ]
};
