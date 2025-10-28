import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ThreatData {
  timestamp: string;
  threatScore: number;
}

interface ThreatChartProps {
  data: ThreatData[];
}

const ThreatChart: React.FC<ThreatChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="threatScore" stroke="#06B6D4" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ThreatChart;