import "./App.css";

function App() {
  return (
    <div className="container">
      <h2 className="title">Student Profile Card</h2>

      <div className="card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
        />

        <h1>Girish</h1>
        <p>BCA(H) Student</p>

        <div className="details">
          <p>
            <strong>College:</strong> RV University
          </p>
          <p>
            <strong>Semester:</strong> 5
          </p>
          <p>
            <strong>Location:</strong> Bengaluru
          </p>
        </div>

        <h3>Skills</h3>

        <div className="skills">
          <span>HTML</span>
          <span>CSS</span>
          <span>React</span>
        </div>

        <div className="buttons">
          <button
            onClick={() => alert("Contact: girishkailashbca24@rvu.edu.in")}
          >
            Contact
          </button>

          <button
            className="follow"
            onClick={() => alert("Thanks for following!")}
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;