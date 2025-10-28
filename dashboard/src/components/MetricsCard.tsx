import React from 'react';

interface MetricsCardProps {
  title: string;
  value: number;
  description: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, description }) => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default MetricsCard;