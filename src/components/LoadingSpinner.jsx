import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-[100vh] w-full">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
  </div>
);

export default LoadingSpinner;