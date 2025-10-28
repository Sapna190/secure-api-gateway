import React from 'react';
import Sidebar from '../components/Sidebar';
import LogTable from '../components/LogTable';
import ThreatChart from '../components/ThreatChart';
import MetricsCard from '../components/MetricsCard';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <MetricsCard />
          <MetricsCard />
          <MetricsCard />
        </div>
        <ThreatChart />
        <LogTable />
      </main>
    </div>
  );
};

export default Dashboard;