import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [usernameInput, setUsernameInput] = useState('');

  const handleLoginClick = (role) => {
    if (!usernameInput.trim()) {
      alert('⚠️ Please enter your name to continue.');
      return;
    }
    onLogin(usernameInput.trim(), role);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>👋</div>
        <h2>Welcome Back</h2>
        <p>Sign in to continue to the Team Portal</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="username">Your Name</label>
          <div className="input-icon-group">
            <span className="icon">👤</span>
            <input
              type="text"
              id="username"
              placeholder="e.g., John Doe"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>
        </div>

        <div className="button-group">
          <button 
            className="btn-admin btn-auth" 
            onClick={() => handleLoginClick('Admin')}
            type="button"
          >
            🛡️ Admin Access
          </button>
          <button 
            className="btn-viewer btn-auth" 
            onClick={() => handleLoginClick('Viewer')}
            type="button"
          >
            👀 Viewer Access
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;