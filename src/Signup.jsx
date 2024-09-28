import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required.';
    }
    

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms and conditions.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Form submitted:', formData);
    
    // Reseting fields after submission
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
    });
    
    setErrors({});
  };

  return (
    <div>
      <div className="form">
        <img src="/logo.png" alt="Lockie" className='logo' />
        <h2>
          <span className="main">Create an Account</span>
          <span className="sub">
            Already have an account? <a href="#">Login here</a>
          </span>
        </h2>

        <div className="actual-form">
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="fullName">
                <img src="/user.png" alt="Contact icon" /> Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="inputs"
                placeholder="e.g., Reload Time"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              {errors.fullName && <p className="error-message">{errors.fullName}</p>}

              <label htmlFor="email">
                <img src="/email.png" alt="Email icon" /> Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="inputs"
                placeholder="Enter email e.g., example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}

              <label htmlFor="phone">
                <img src="/phone.png" alt="Phone icon" /> Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="inputs"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}

              <label htmlFor="password">
                <img src="/padlock.png" alt="Security icon" /> Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="inputs"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="error-message">{errors.password}</p>}

              <label htmlFor="confirmPassword">
                <img src="/padlock.png" alt="Security icon" /> Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="inputs"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && (
                  <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>

            <input 
              type="checkbox" 
              id="terms" 
              name="terms" 
              checked={formData.terms} 
              onChange={handleChange} 
            />
            <label htmlFor="terms" className='tnc'>
              By clicking the box, you agree with our
              <a href="#"> terms</a> <br /> and <a href="#">conditions.</a>
            </label>
            {errors.terms && <p className="error-message">{errors.terms}</p>}

            <div className="btn">
              <button type="submit" className="log-btn">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
