import React, { useState } from 'react';

interface BlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBlock: (ipOrApiKey: string, reason: string, ttl: number) => void;
}

const BlockModal: React.FC<BlockModalProps> = ({ isOpen, onClose, onBlock }) => {
  const [ipOrApiKey, setIpOrApiKey] = useState('');
  const [reason, setReason] = useState('');
  const [ttl, setTtl] = useState(3600); // Default TTL of 1 hour

  const handleBlock = () => {
    onBlock(ipOrApiKey, reason, ttl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Block IP/API Key</h2>
        <input
          type="text"
          placeholder="IP or API Key"
          value={ipOrApiKey}
          onChange={(e) => setIpOrApiKey(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="number"
          placeholder="TTL (seconds)"
          value={ttl}
          onChange={(e) => setTtl(Number(e.target.value))}
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 text-gray-500">Cancel</button>
          <button onClick={handleBlock} className="bg-red-500 text-white px-4 py-2 rounded">Block</button>
        </div>
      </div>
    </div>
  );
};

export default BlockModal;