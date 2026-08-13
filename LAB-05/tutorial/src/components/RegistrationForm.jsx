import React, { useState } from 'react';
import { UserPlus, User, Mail, Phone, BookOpen, CheckCircle, AlertCircle, Sparkles, Layers } from 'lucide-react';
import StudentCard from './StudentCard';

export default function RegistrationForm() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: ''
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Submission Status & Registered Students List State
  const [successMessage, setSuccessMessage] = useState('');
  const [students, setStudents] = useState([
    {
      id: 1,
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@bca.edu',
      phone: '9876543210',
      course: 'BCA (Bachelor of Computer Applications)',
      timestamp: 'Today at 09:30 AM'
    }
  ]);

  // Handle Input Changes (Event Handling & Controlled Inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for field as user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // Field Validation Logic
  const validateField = (fieldName, value) => {
    let errorMsg = '';
    const trimmedVal = value ? value.trim() : '';

    if (!trimmedVal) {
      errorMsg = `${getFieldLabel(fieldName)} is required.`;
    } else if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedVal)) {
        errorMsg = 'Please enter a valid email address (e.g. name@domain.com).';
      }
    } else if (fieldName === 'phone') {
      // Must contain strictly digits and be exactly 10 digits long
      const phoneDigitsOnly = trimmedVal.replace(/\D/g, '');
      if (!/^\d{10}$/.test(trimmedVal)) {
        errorMsg = 'Phone number must contain exactly 10 numeric digits.';
      }
    }

    setErrors(prev => ({ ...prev, [fieldName]: errorMsg }));
    return !errorMsg;
  };

  const getFieldLabel = (name) => {
    switch (name) {
      case 'fullName': return 'Full Name';
      case 'email': return 'Email Address';
      case 'phone': return 'Phone Number';
      case 'course': return 'Course Selection';
      default: return 'Field';
    }
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all 4 fields on submit
    const isNameValid = validateField('fullName', formData.fullName);
    const isEmailValid = validateField('email', formData.email);
    const isPhoneValid = validateField('phone', formData.phone);
    const isCourseValid = validateField('course', formData.course);

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      course: true
    });

    // Prevent submission if validation fails
    if (!isNameValid || !isEmailValid || !isPhoneValid || !isCourseValid) {
      setSuccessMessage('');
      return;
    }

    // On successful validation:
    const newStudent = {
      id: Date.now(),
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      course: formData.course,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Dynamic State Update: prepend new student to array
    setStudents(prev => [newStudent, ...prev]);

    // Reset Form Fields
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      course: ''
    });
    setErrors({});
    setTouched({});

    // Display success notification
    setSuccessMessage(`Success! Student record for "${newStudent.fullName}" has been registered successfully.`);

    // Auto clear success message after 6 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 6000);
  };

  const handleDeleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return (
    <section id="registration" className="section-padding bg-light-accent">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <UserPlus size={14} /> Tutorial 3 Concept
          </div>
          <h2 className="section-title">
            Student Registration <span className="gradient-text">Form & Validation</span>
          </h2>
          <p className="section-subtitle">
            Demonstrating React controlled state management, real-time input validation rules, event handling (`onChange`, `onSubmit`), and dynamic DOM state updates.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* LEFT: FORM COMPONENT */}
          <div className="portal-card" style={{ borderTop: '5px solid var(--primary-600)' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Register New Student
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                Fill in all mandatory details below to validate and submit the registration.
              </p>
            </div>

            {/* Success Alert Banner */}
            {successMessage && (
              <div style={{
                backgroundColor: 'var(--success-50)',
                border: '1px solid #6ee7b7',
                color: '#065f46',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.5rem'
              }}>
                <CheckCircle size={20} color="var(--success-500)" flexShrink={0} />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* FIELD 1: FULL NAME */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>
                  Full Name <span style={{ color: 'var(--error-500)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="var(--slate-400)" style={iconPositionStyle} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="e.g. Rahul Verma"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      ...inputStyle,
                      borderColor: errors.fullName && touched.fullName ? 'var(--error-500)' : 'var(--slate-300)'
                    }}
                  />
                </div>
                {errors.fullName && touched.fullName && (
                  <div style={errorTextContainer}>
                    <AlertCircle size={14} /> {errors.fullName}
                  </div>
                )}
              </div>

              {/* FIELD 2: EMAIL ADDRESS */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>
                  Email Address <span style={{ color: 'var(--error-500)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} color="var(--slate-400)" style={iconPositionStyle} />
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. rahul.verma@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      ...inputStyle,
                      borderColor: errors.email && touched.email ? 'var(--error-500)' : 'var(--slate-300)'
                    }}
                  />
                </div>
                {errors.email && touched.email && (
                  <div style={errorTextContainer}>
                    <AlertCircle size={14} /> {errors.email}
                  </div>
                )}
              </div>

              {/* FIELD 3: PHONE NUMBER */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>
                  Phone Number (Exactly 10 Digits) <span style={{ color: 'var(--error-500)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} color="var(--slate-400)" style={iconPositionStyle} />
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      ...inputStyle,
                      borderColor: errors.phone && touched.phone ? 'var(--error-500)' : 'var(--slate-300)'
                    }}
                  />
                </div>
                {errors.phone && touched.phone && (
                  <div style={errorTextContainer}>
                    <AlertCircle size={14} /> {errors.phone}
                  </div>
                )}
              </div>

              {/* FIELD 4: COURSE SELECTION */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label style={labelStyle}>
                  Course Program <span style={{ color: 'var(--error-500)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <BookOpen size={18} color="var(--slate-400)" style={iconPositionStyle} />
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      ...inputStyle,
                      borderColor: errors.course && touched.course ? 'var(--error-500)' : 'var(--slate-300)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">-- Select Course --</option>
                    <option value="BCA (Bachelor of Computer Applications)">BCA (Bachelor of Computer Applications)</option>
                    <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                    <option value="MCA (Master of Computer Applications)">MCA (Master of Computer Applications)</option>
                    <option value="Full Stack Web Development">Full Stack Web Development</option>
                  </select>
                </div>
                {errors.course && touched.course && (
                  <div style={errorTextContainer}>
                    <AlertCircle size={14} /> {errors.course}
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}
              >
                <UserPlus size={18} /> Complete Registration
              </button>
            </form>
          </div>

          {/* RIGHT: DYNAMICALLY RENDERED STUDENT CARDS LIST & TECHNICAL EXPLANATION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Concept Explanation Card */}
            <div style={{
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              border: '1px solid var(--primary-200)',
              backgroundColor: 'var(--primary-50)'
            }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} color="var(--primary-600)" /> JavaScript & React Concepts Demonstrated:
              </h4>
              <ul style={{ fontSize: '0.84rem', color: 'var(--slate-700)', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                <li><strong>State Management:</strong> Managed with React `useState` hooks for input fields and record lists.</li>
                <li><strong>Event Handling:</strong> Capturing `onChange`, `onBlur`, and `onSubmit` user actions.</li>
                <li><strong>Form Validation:</strong> Immediate regex rules for email and mandatory 10-digit phone verification.</li>
                <li><strong>Dynamic Updates:</strong> Appending new entries to state dynamically re-renders student profile cards in real time.</li>
              </ul>
            </div>

            {/* Registered Student Cards List Container */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  Registered Student Directory ({students.length})
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                  Dynamically Updated State
                </span>
              </div>

              {students.length === 0 ? (
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  textAlign: 'center',
                  border: '1px dashed var(--slate-300)',
                  color: 'var(--slate-500)'
                }}>
                  No students registered yet. Fill out the form above to add student cards dynamically.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {students.map(student => (
                    <StudentCard key={student.id} student={student} onDelete={handleDeleteStudent} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.88rem',
  fontWeight: 700,
  color: 'var(--slate-800)',
  marginBottom: '0.35rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem 0.75rem 0.75rem 2.6rem',
  fontSize: '0.92rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--slate-300)',
  outline: 'none',
  fontFamily: 'inherit',
  backgroundColor: '#ffffff',
  transition: 'border-color var(--transition-fast)'
};

const iconPositionStyle = {
  position: 'absolute',
  left: '0.85rem',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none'
};

const errorTextContainer = {
  fontSize: '0.8rem',
  color: 'var(--error-500)',
  marginTop: '0.35rem',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem'
};
