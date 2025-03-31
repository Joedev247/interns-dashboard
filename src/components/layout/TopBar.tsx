import React from 'react';

const TopBar: React.FC = () => (
  <div className="bg-blue-600 text-white py-2">
    <div className="container mx-auto px-4">
      <p className="text-sm text-center font-medium">
        🎉 Free shipping on orders over $50 | Use code: FREESHIP50
      </p>
    </div>
  </div>
);

export default TopBar;
