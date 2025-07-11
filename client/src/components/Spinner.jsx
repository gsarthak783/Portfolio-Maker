import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <span className="loading loading-spinner loading-lg text-blue-500"></span>
    </div>
  );
};

export default Spinner;
