import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-60 bg-white h-screen shadow-md p-4">
      <div className="mb-6 font-semibold text-lg text-primary">Secure Gateway</div>
      <nav className="space-y-2">
        <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50" href="/dashboard">Dashboard</a>
        <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50" href="/logs">Logs</a>
        <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50" href="/blocks">Blocks</a>
      </nav>
    </aside>
  );
};

export default Sidebar;