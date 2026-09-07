import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', city: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.city) {
      setError('All fields are required!');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address!');
      return;
    }
    setError('');
    setSubmittedData(formData);
    setFormData({ name: '', email: '', city: '' }); // Clear form
  };

  return (
    <div className="lab-component">
      <h3>User Form (Controlled Components)</h3>
      <form onSubmit={handleSubmit} className="custom-form">
        {error && <p className="error-text">{error}</p>}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h4>Submitted Data:</h4>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>City:</strong> {submittedData.city}</p>
        </div>
      )}
    </div>
  );
};

export default UserForm;
