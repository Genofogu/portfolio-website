import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import StatsPage from './pages/StatsPage';

function Scheduler() {
  return (
    <div className="scheduler-app">
      <Sidebar />
      <Header />
      <main className="scheduler-main-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="stats" element={<StatsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default Scheduler;