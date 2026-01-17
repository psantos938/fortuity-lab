import React, { useState } from 'react';
import theme from '../styles/theme';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.user);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(to bottom right, ${theme.colors.background.darker}, ${theme.colors.background.dark})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: theme.fonts.primary
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: theme.colors.background.card,
        padding: '2rem',
        borderRadius: theme.borderRadius.xl,
        boxShadow: theme.shadows.xl
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 1rem',
            background: `linear-gradient(135deg, ${theme.colors.primary[400]}, ${theme.colors.primary[600]})`,
            borderRadius: theme.borderRadius.xl,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            🧪
          </div>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            color: theme.colors.text.primary,
            marginBottom: '0.5rem'
          }}>
            Fortuity Lab
          </h1>
          <p style={{ color: theme.colors.text.secondary }}>
            Embryology Witnessing System
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: theme.colors.background.dark,
                border: `1px solid ${theme.colors.text.tertiary}`,
                borderRadius: theme.borderRadius.md,
                color: theme.colors.text.primary,
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: theme.colors.background.dark,
                border: `1px solid ${theme.colors.text.tertiary}`,
                borderRadius: theme.borderRadius.md,
                color: theme.colors.text.primary,
                fontSize: '1rem',
                outline: 'none'
              }}
              required
            />
          </div>

          {error && (
            <div style={{
              padding: '0.75rem',
              marginBottom: '1rem',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: theme.borderRadius.md,
              color: '#ef4444',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: loading ? theme.colors.text.tertiary : theme.colors.primary[600],
              color: theme.colors.text.primary,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: theme.colors.background.dark,
          borderRadius: theme.borderRadius.md,
          fontSize: '0.875rem',
          color: theme.colors.text.secondary
        }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Demo Users:</strong>
          <div>admin / admin123</div>
          <div>embryo1 / embryo123</div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
