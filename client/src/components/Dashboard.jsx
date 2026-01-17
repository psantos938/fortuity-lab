import React, { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import theme from '../styles/theme';
import api from '../api';

const Dashboard = ({ user, onLogout }) => {
  const [stats, setStats] = useState(null);
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, samplesRes] = await Promise.all([
        api.getStats(),
        api.getSamples()
      ]);

      const statsData = await statsRes.json();
      const samplesData = await samplesRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (samplesData.success) setSamples(samplesData.samples);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(to bottom right, ${theme.colors.background.darker}, ${theme.colors.background.dark})`,
      padding: '2rem',
      fontFamily: theme.fonts.primary
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: theme.colors.text.primary,
            marginBottom: '0.5rem'
          }}>
            🧪 Fortuity Lab Dashboard
          </h1>
          <p style={{ color: theme.colors.text.secondary }}>
            Welcome, {user.name} ({user.role})
          </p>
        </div>
        <button
          onClick={onLogout}
          style={{
            padding: '0.75rem 1.5rem',
            background: theme.colors.background.card,
            color: theme.colors.text.primary,
            border: `1px solid ${theme.colors.text.tertiary}`,
            borderRadius: theme.borderRadius.md,
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Stats Cards */}
        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <StatCard
              label="Total Samples"
              value={stats.totalSamples}
              color={theme.colors.primary[400]}
            />
            <StatCard
              label="Active Samples"
              value={stats.activeSamples}
              color={theme.colors.success.light}
            />
            <StatCard
              label="Witnessing Events"
              value={stats.totalWitnessingEvents}
              color={theme.colors.primary[300]}
            />
            <StatCard
              label="Today's Events"
              value={stats.todayEvents}
              color={theme.colors.warning.light}
            />
          </div>
        )}

        {/* Recent Samples */}
        <div style={{
          background: theme.colors.background.card,
          borderRadius: theme.borderRadius.lg,
          padding: '1.5rem',
          border: `1px solid ${theme.colors.text.tertiary}`
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: theme.colors.text.primary
            }}>
              Recent Samples
            </h2>
            <button
              onClick={loadData}
              style={{
                padding: '0.5rem 1rem',
                background: theme.colors.background.dark,
                color: theme.colors.text.primary,
                border: `1px solid ${theme.colors.text.tertiary}`,
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: theme.colors.text.secondary }}>
              Loading...
            </div>
          ) : samples.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: theme.colors.text.secondary }}>
              No samples yet. Create one to get started!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {samples.slice(-5).reverse().map((sample) => (
                <SampleCard key={sample.id} sample={sample} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div style={{
    background: theme.colors.background.card,
    padding: '1.5rem',
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.text.tertiary}`
  }}>
    <div style={{
      fontSize: '2.5rem',
      fontWeight: '700',
      color: color,
      marginBottom: '0.5rem'
    }}>
      {value}
    </div>
    <div style={{
      color: theme.colors.text.secondary,
      fontSize: '0.875rem'
    }}>
      {label}
    </div>
  </div>
);

const SampleCard = ({ sample }) => (
  <div style={{
    background: theme.colors.background.dark,
    padding: '1rem',
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.text.tertiary}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div>
      <div style={{
        fontFamily: theme.fonts.mono,
        color: theme.colors.primary[400],
        fontWeight: '500',
        marginBottom: '0.25rem'
      }}>
        {sample.barcode}
      </div>
      <div style={{
        fontSize: '0.875rem',
        color: theme.colors.text.secondary
      }}>
        {sample.patientName} - {sample.type}
      </div>
    </div>
    <StatusBadge status={sample.status || 'active'} />
  </div>
);

export default Dashboard;
