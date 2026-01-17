import React from 'react';
import theme from '../styles/theme';

const StatusBadge = ({ status, size = 'md' }) => {
  const styles = {
    verified: {
      bg: 'rgba(16, 185, 129, 0.2)',
      text: '#10b981',
      border: 'rgba(16, 185, 129, 0.3)',
      icon: '✓'
    },
    pending: {
      bg: 'rgba(245, 158, 11, 0.2)',
      text: '#f59e0b',
      border: 'rgba(245, 158, 11, 0.3)',
      icon: '⏱'
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.2)',
      text: '#ef4444',
      border: 'rgba(239, 68, 68, 0.3)',
      icon: '✗'
    },
    active: {
      bg: `rgba(34, 211, 238, 0.2)`,
      text: theme.colors.primary[400],
      border: `rgba(34, 211, 238, 0.3)`,
      icon: '●'
    }
  };

  const sizes = {
    sm: { padding: '0.25rem 0.5rem', fontSize: '0.75rem' },
    md: { padding: '0.5rem 0.75rem', fontSize: '0.875rem' },
    lg: { padding: '0.75rem 1rem', fontSize: '1rem' }
  };

  const style = styles[status] || styles.active;
  const sizeStyle = sizes[size];

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      borderRadius: theme.borderRadius.full,
      border: `1px solid ${style.border}`,
      background: style.bg,
      color: style.text,
      fontWeight: '500',
      ...sizeStyle
    }}>
      <span>{style.icon}</span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
