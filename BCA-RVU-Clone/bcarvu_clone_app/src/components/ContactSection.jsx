import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="contact-section py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">GET IN TOUCH</span>
          <h2 className="section-title">Contact Department</h2>
        </div>

        <div className="row g-5">
          <div className="col-lg-6">
            <div className="contact-form">
              {submitted ? (
                <div className="text-center py-4">
                  <div
                    className="d-inline-flex justify-content-center align-items-center rounded-circle bg-warning bg-opacity-25 text-warning mb-3"
                    style={{ width: '80px', height: '80px' }}
                  >
                    <i className="fa-solid fa-circle-check fa-3x text-warning"></i>
                  </div>
                  <h3 className="mb-2">Thank You, {formData.name}!</h3>
                  <div className="alert alert-success mt-3 mb-4">
                    Your message regarding "
                    <strong>{formData.subject || 'General Inquiry'}</strong>" has
                    been successfully submitted.
                  </div>
                  <p className="text-muted mb-4">
                    The Department of Computer Applications admissions and
                    administrative team will get back to you at{' '}
                    <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    className="btn btn-warning ripple"
                    onClick={handleReset}
                  >
                    <i className="fa-solid fa-paper-plane me-2"></i>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="contactName" className="form-label small fw-semibold text-muted">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contactEmail" className="form-label small fw-semibold text-muted">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contactSubject" className="form-label small fw-semibold text-muted">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="contactSubject"
                      name="subject"
                      className="form-control"
                      placeholder="Subject (e.g., BCA Admissions, Research, Syllabus)"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contactMessage" className="form-label small fw-semibold text-muted">
                      Message
                    </label>
                    <textarea
                      id="contactMessage"
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-warning w-100 ripple py-3 font-weight-bold"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane me-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="contact-info">
              <h4>Department Office</h4>

              <p>
                <i className="fa-solid fa-location-dot"></i>
                <span>RV University, Bengaluru, Karnataka, India</span>
              </p>

              <p>
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:bca@rvu.edu.in" className="text-decoration-none text-muted">
                  bca@rvu.edu.in
                </a>
              </p>

              <p>
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+919876543210" className="text-decoration-none text-muted">
                  +91 98765 43210
                </a>
              </p>

              <p>
                <i className="fa-solid fa-clock"></i>
                <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
              </p>
            </div>

            <div className="map-placeholder">
              <i className="fa-solid fa-map-location-dot"></i>
              <h5>RV University Campus</h5>
              <p className="text-muted small mb-0 px-3 text-center">
                Mysore Road, RV Vidyaniketan Post, Bengaluru, Karnataka 560059
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
