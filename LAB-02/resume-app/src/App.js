import { useState } from "react";
import "./App.css";
import profilePhoto from "./assets/girish-kailash.jpg";

const certificates = [
  {
    name: "CompTIA IT Fundamentals: Operating Systems",
    provider: "Skillsoft",
    issued: "February 2025",
    link: "https://skillsoft.digitalbadges.skillsoft.com/aca7bfc7-bd34-4616-88d2-01cdc057ee2c#acc.uL48vPd3",
  },
  {
    name: "Web Development Fundamentals",
    provider: "Credly",
    issued: "View credential",
    link: "https://www.credly.com/badges/2456a23c-da6f-4c9a-b696-18fb6e916b3e/linked_in_profile",
  },
  {
    name: "Data Analysis with Python",
    provider: "IBM SkillsBuild",
    issued: "February 2025",
    link: "https://courses.skillsbuild.skillsnetwork.site/certificates/c0591a2fb1514ec884675f46a0353fc1",
  },
  {
    name: "Python 101 for Data Science",
    provider: "IBM SkillsBuild",
    issued: "February 2025",
    link: "https://courses.skillsbuild.skillsnetwork.site/certificates/e43d754370044124bf081d59931ee7e5",
  },
];

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="app">
      <nav className="navbar">
        <a className="brand" href="#home">
          GK<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#credentials">Credentials</a>
        </div>

        <button
          type="button"
          className="nav-contact"
          onClick={() => setIsContactOpen(true)}
        >
          Contact me ↗
        </button>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="section-label">BCA (HONS.) / THIRD YEAR / RV UNIVERSITY</p>
            <h1>
              Girish
              <br />
              <span>Kailash.</span>
            </h1>

            <p className="hero-description">
              A third-year BCA (Hons.) student who builds web and mobile
              applications while exploring programming, data, and AI.
            </p>

            <div className="hero-buttons">
              <a
                className="button button-primary"
                href="https://www.linkedin.com/in/girish-kailash-437003301"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn profile <span>↗</span>
              </a>

              <a
                className="button button-outline"
                href="https://github.com/girish-seervi"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <span>↗</span>
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="portrait-frame">
              <img
                src={profilePhoto}
                alt="Girish Kailash"
                className="profile-photo"
              />
            </div>

            <div className="hero-card-details">
              <div>
                <p className="card-label">CURRENTLY</p>
                <div className="status-dot">
                  <span></span> Learning & building
                </div>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <strong>04</strong>
                  <span>verified certificates</span>
                </div>

                <div className="hero-stat">
                  <strong>3rd year</strong>
                  <span>BCA (Hons.) at RVU</span>
                </div>
              </div>

              <p className="location">⌖ Bengaluru, Karnataka, India</p>
            </div>
          </div>
        </section>

        <section className="resume-section" id="about">
          <div className="section-heading">
            <p className="section-label">01 / PROFILE</p>
            <h2>Resume at a glance.</h2>
          </div>

          <div className="about-layout">
            <p className="about-text">
              I am a third-year BCA (Hons.) student at RV University. I build
              web, mobile, and interactive projects while strengthening my
              skills in programming, data, artificial intelligence, and
              thoughtful digital product design.
            </p>

            <table className="profile-table">
              <tbody>
                <tr>
                  <th>Education</th>
                  <td>BCA (Hons.), RV University</td>
                </tr>
                <tr>
                  <th>Current year</th>
                  <td>Third year</td>
                </tr>
                <tr>
                  <th>Based in</th>
                  <td>Bengaluru, Karnataka</td>
                </tr>
                <tr>
                  <th>Primary interests</th>
                  <td>Mobile Apps, Web Development, Data &amp; AI</td>
                </tr>
                <tr>
                  <th>Contact</th>
                  <td>
                    <a href="mailto:girishkailashbca24@rvu.edu.in">
                      girishkailashbca24@rvu.edu.in
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="resume-section skills-section">
          <div className="section-heading">
            <p className="section-label">02 / CAPABILITIES</p>
            <h2>What I work with.</h2>
          </div>

          <div className="skills-grid">
            <article>
              <span className="skill-number">01</span>
              <h3>Programming</h3>
              <p>Python · C · C++ · JavaScript</p>
            </article>

            <article>
              <span className="skill-number">02</span>
              <h3>Web & Mobile</h3>
              <p>HTML · JavaScript · React Native · GitHub</p>
            </article>

            <article>
              <span className="skill-number">03</span>
              <h3>Creative & Game Tools</h3>
              <p>Unity · Figma · VS Code · Jupyter Notebook</p>
            </article>
          </div>
        </section>

        <section className="resume-section" id="work">
          <div className="section-heading">
            <p className="section-label">03 / PROJECTS</p>
            <h2>Things I’ve explored.</h2>
          </div>

          <div className="project-grid">
            <article className="project-card project-featured">
              <div className="project-top">
                <span>01</span>
                <span>UNITY / TEAM PROJECT</span>
              </div>
              <h3>SphereBlitz</h3>
              <p>
                A team-built game developed with Unity during my summer
                internship at Fusion VR. The project strengthened my
                experience of collaborative game development and Unity.
              </p>
              <div className="project-tags">
                <span>Unity</span>
                <span>Team Project</span>
                <span>Game Development</span>
              </div>
            </article>

            <article className="project-card project-mobile">
              <div className="project-top">
                <span>02</span>
                <span>MOBILE DEVELOPMENT</span>
              </div>
              <h3>React Native Apps</h3>
              <p>
                A growing collection of mobile application work built with
                React Native and published on GitHub as part of my learning
                journey.
              </p>
              <a
                className="project-link"
                href="https://github.com/girish-seervi/CS2308-MAD-Apps"
                target="_blank"
                rel="noreferrer"
              >
                View app repository ↗
              </a>
              <div className="project-tags">
                <span>React Native</span>
                <span>Mobile Apps</span>
              </div>
            </article>

            <article className="project-card project-specar">
              <div className="project-top">
                <span>03</span>
                <span>AR / REACT NATIVE</span>
              </div>
              <h3>SpecAR</h3>
              <p>
                A React Native AR app developed during my internship period.
                It turns 2D quotation sketches into 3D models and places them
                in a real room through augmented reality.
              </p>
              <div className="project-tags">
                <span>React Native</span>
                <span>Augmented Reality</span>
                <span>3D Models</span>
              </div>
            </article>
          </div>
          <p className="github-note">
            I also maintain separate GitHub repositories for the subjects,
            technologies, and projects I have studied so far. <a
              href="https://github.com/girish-seervi"
              target="_blank"
              rel="noreferrer"
            >
              Explore my GitHub profile ↗
            </a>
          </p>
        </section>

        <section className="resume-section" id="credentials">
          <div className="section-heading">
            <p className="section-label">04 / CREDENTIALS</p>
            <h2>Verified learning.</h2>
          </div>

          <div className="certificate-wrap">
            <table className="certificate-table">
              <thead>
                <tr>
                  <th>Credential</th>
                  <th>Provider</th>
                  <th>Issued</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((certificate) => (
                  <tr key={certificate.name}>
                    <td>{certificate.name}</td>
                    <td>{certificate.provider}</td>
                    <td>{certificate.issued}</td>
                    <td>
                      <a
                        href={certificate.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="contact-section">
          <p className="section-label">05 / CONTACT</p>
          <h2>Let’s build something useful.</h2>
          <p>
            Open to learning opportunities, student collaborations, and
            technology conversations.
          </p>

          <div className="contact-links">
            <a href="mailto:girishkailashbca24@rvu.edu.in">
              Email me <span>↗</span>
            </a>
            <a
              href="https://github.com/girish-seervi"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span>↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/girish-kailash-437003301"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span>↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer>© 2026 Girish Kailash · Built with curiosity.</footer>

      {isContactOpen && (
        <div
          className="contact-modal-backdrop"
          onClick={() => setIsContactOpen(false)}
        >
          <section
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close contact details"
              onClick={() => setIsContactOpen(false)}
            >
              ×
            </button>
            <p className="section-label">CONTACT DETAILS</p>
            <h2 id="contact-modal-title">Let’s connect.</h2>
            <p className="modal-intro">
              Feel free to reach out for collaborations, projects, or
              technology conversations.
            </p>

            <a className="contact-detail" href="tel:+918970134271">
              <span className="contact-detail-label">PHONE</span>
              <strong>+91 89701 34271</strong>
              <span>Call ↗</span>
            </a>

            <a
              className="contact-detail"
              href="mailto:girishkailashbca24@rvu.edu.in"
            >
              <span className="contact-detail-label">EMAIL</span>
              <strong>girishkailashbca24@rvu.edu.in</strong>
              <span>Email ↗</span>
            </a>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
