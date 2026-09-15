import React from 'react';

function DashboardHeader() {
  return (
    <header className="scheduler-header">
      <div className="search-bar">
        <i className="fa-solid fa-search"></i>
        <input type="text" placeholder="Search tasks..." />
      </div>
      <button className="new-task-btn">
        <i className="fa-solid fa-plus"></i>
        New Task
      </button>
    </header>
  );
}

export default DashboardHeader;
