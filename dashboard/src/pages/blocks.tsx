import React, { useEffect, useState } from 'react';
import { fetchBlockedIPs, unblockIP } from '../services/api';
import BlockModal from '../components/BlockModal';

const BlocksPage = () => {
  const [blockedIPs, setBlockedIPs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIP, setSelectedIP] = useState(null);

  useEffect(() => {
    const loadBlockedIPs = async () => {
      const data = await fetchBlockedIPs();
      setBlockedIPs(data);
    };

    loadBlockedIPs();
  }, []);

  const handleUnblock = async (ip) => {
    await unblockIP(ip);
    setBlockedIPs(blockedIPs.filter((blockedIP) => blockedIP !== ip));
  };

  const openModal = (ip) => {
    setSelectedIP(ip);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedIP(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Blocked IPs</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">IP Address</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blockedIPs.map((ip) => (
            <tr key={ip}>
              <td className="py-2 px-4 border-b">{ip}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => openModal(ip)}
                >
                  Unblock
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <BlockModal
          ip={selectedIP}
          onClose={closeModal}
          onConfirm={() => handleUnblock(selectedIP)}
        />
      )}
    </div>
  );
};

export default BlocksPage;