import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //modified for backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!email || !password) {
        setError('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost/backend/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email,
                password,
                login: true
            }),
        });


        if (!response.ok) {
            const errorText = await response.text();
            setError(errorText);
            return;
        }

        const result = await response.text();
        console.log('Response from server:', result);
        
        // Clear fields after submission
        setError('');
        setEmail('');
        setPassword('');
        
    } catch (error) {
        console.error('Error:', error);
        setError('An unexpected error occurred. Please try again.');
    }
};

  return (
    <div className="login-container">
      <div className="form">
        <img src="/logo.png" alt="Logo" className="logo" />

        <h2>
          <span className="main">Login</span>
          <span className="sub">
            You don't have an account? <a href="#">Sign-up here</a>
          </span>
        </h2>

        {error && <p className="error-message">{error}</p>}

        <div className="actual-form">
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">
                <img src="email.png" alt="Email icon" /> Email Address
              </label>
              <input
                type="email"
                id="email" 
                placeholder="Enter email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="inputs"
                required
              />

              <label htmlFor="password">
                <img src="padlock.png" alt="Password icon" /> Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputs"
                required
              />
            </div>
            <a href="#" className="forgot-password">Forgot password?</a>

            <div className="btn">
              <button type="submit" className="log-btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;