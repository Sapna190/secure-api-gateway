import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <h1 className="text-4xl font-bold text-primary">Welcome to the Secure API Gateway Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">Your one-stop solution for managing API security and monitoring threats.</p>
    </div>
  );
};

export default HomePage;