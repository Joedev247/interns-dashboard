import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Loading;