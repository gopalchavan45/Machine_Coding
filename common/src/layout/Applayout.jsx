import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Applayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Sticky Header stays fixed at the top */}
      {/* <header className="sticky top-0 z-50">
        <Header />
      </header> */}

      {/* Main content body containing Sidebar and Dynamic Outlet */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        {/* Main content area scrolls independently if content is too long */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Applayout;