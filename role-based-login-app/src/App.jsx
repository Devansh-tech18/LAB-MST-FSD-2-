import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  
  // Initial demo posts so the feed isn't completely empty initially
  const [posts, setPosts] = useState([
    { id: 1, title: 'Welcome to Campus Portal', content: 'Explore upcoming tech fests and coding workshops.', author: 'System Admin' }
  ]);

  const handleLogin = (enteredUsername, selectedRole) => {
    setUsername(enteredUsername);
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setRole('');
  };

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Dashboard 
          username={username} 
          role={role} 
          posts={posts}
          onAddPost={handleAddPost}
          onDeletePost={handleDeletePost}
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
}

export default App;