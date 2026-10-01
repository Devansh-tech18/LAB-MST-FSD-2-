import React, { useState } from 'react';

function Dashboard({ username, role, posts, onAddPost, onDeletePost, onLogout }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('⚠️ Both Title and Content are required.');
      return;
    }
    // Add timestamp and author
    onAddPost({ 
      id: Date.now(), 
      title, 
      content, 
      author: username,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
    setTitle('');
    setContent('');
  };

  const isAdmin = role === 'Admin';

  return (
    <div className="app-container">
      {/* Modern App Header */}
      <header className="app-header">
        <div className="user-info">
          <h2>Gm, {username} !</h2>
          <div className="user-meta">
            <span>Core contributor</span>
            <span className={`role-badge ${role.toLowerCase()}`}>{role}</span>
          </div>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          🚪 Sign Out
        </button>
      </header>

      {/* Admin Create Section OR Viewer Notice */}
      {isAdmin ? (
        <div className="create-post-section">
          <h3>✨ Create New Announcement</h3>
          <form onSubmit={handleCreateSubmit}>
            <div className="form-group">
              <label>Announcement Title</label>
              <div className="input-icon-group">
                <span className="icon">📌</span>
                <input
                  type="text"
                  placeholder="E.g., Q4 Strategy Meeting"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Content</label>
              <div className="input-icon-group">
                <span className="icon">📝</span>
                <textarea
                  placeholder="Write the details here..."
                  rows="3"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn-create">
              🚀 Publish to Feed
            </button>
          </form>
        </div>
      ) : (
        <div className="readonly-state">
          <span>👀</span>
          Viewing in Read-Only Mode. Contact an Admin to request publishing rights.
        </div>
      )}

      {/* Live Feed Section */}
      <div className="feed-container">
        <h3>📢 Community Feed ({posts.length})</h3>
        
        <div className="feed-list">
          {posts.length === 0 ? (
            <div className="post-card" style={{ textAlign: 'center', color: '#95a5a6', fontStyle: 'italic' }}>
              No announcements yet. Check back later!
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-card-header">
                  <div>
                    <h4 className="post-title">{post.title}</h4>
                    <div className="post-meta-data">
                      Posted by <strong>{post.author}</strong> • {post.date}
                    </div>
                  </div>
                  {isAdmin && (
                    <button 
                      className="btn-delete" 
                      onClick={() => onDeletePost(post.id)}
                      title="Delete post"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <p className="post-content">{post.content}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;