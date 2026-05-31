import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';

function DashboardLayout() {
  return (
    <div className="scheduler-app" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <DashboardSidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', overflow: 'hidden' }}>
        <DashboardHeader />
        <main className="scheduler-main-content" style={{ flex: 1, overflowY: 'auto', background: 'var(--color-background)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
