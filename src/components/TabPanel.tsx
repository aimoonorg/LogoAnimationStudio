import React from 'react';

interface TabPanelProps {
  children: React.ReactNode;
  active: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, active }) => {
  if (!active) return null;
  
  return (
    <div role="tabpanel" className="focus:outline-none">
      {children}
    </div>
  );
};