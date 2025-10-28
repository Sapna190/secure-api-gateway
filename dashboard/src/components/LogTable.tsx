import React from 'react';

interface Log {
  timestamp: string;
  clientIp: string;
  method: string;
  path: string;
  threatScore: number;
  actionTaken: string;
}

interface LogTableProps {
  logs: Log[];
}

const LogTable: React.FC<LogTableProps> = ({ logs }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Timestamp</th>
          <th className="py-2 px-4 border-b">Client IP</th>
          <th className="py-2 px-4 border-b">Method & Path</th>
          <th className="py-2 px-4 border-b">Threat Score</th>
          <th className="py-2 px-4 border-b">Action Taken</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{log.timestamp}</td>
            <td className="py-2 px-4 border-b">{log.clientIp}</td>
            <td className="py-2 px-4 border-b">{`${log.method} ${log.path}`}</td>
            <td className="py-2 px-4 border-b">{log.threatScore}</td>
            <td className="py-2 px-4 border-b">{log.actionTaken}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogTable;