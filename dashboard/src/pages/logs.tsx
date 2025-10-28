import React, { useEffect, useState } from 'react';
import { fetchLogs } from '../services/api';
import LogTable from '../components/LogTable';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs();
        setLogs(data.logs);
      } catch (err) {
        setError('Failed to load logs');
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Logs</h1>
      <LogTable logs={logs} />
    </div>
  );
};

export default LogsPage;