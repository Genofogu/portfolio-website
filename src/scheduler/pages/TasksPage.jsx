import React, { useState, useEffect } from 'react';

const TasksPage = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('genofogu-tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Complete MCA Assignment', category: 'Study', priority: 'High', completed: false, dueDate: new Date().toISOString().split('T')[0] },
      { id: 2, title: 'Deploy RAG update', category: 'Work', priority: 'High', completed: false, dueDate: new Date().toISOString().split('T')[0] },
      { id: 3, title: 'Write architectural design', category: 'Work', priority: 'Medium', completed: true, dueDate: new Date().toISOString().split('T')[0] }
    ];
  });

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [filter, setFilter] = useState('All'); // All, Active, Completed
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('genofogu-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      category,
      priority,
      completed: false,
      dueDate
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    const statusMatch = filter === 'All' || 
                        (filter === 'Active' && !t.completed) || 
                        (filter === 'Completed' && t.completed);
    const catMatch = categoryFilter === 'All' || t.category === categoryFilter;
    return statusMatch && catMatch;
  });

  const getPriorityColor = (p) => {
    switch (p) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return 'var(--color-text-secondary)';
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>All Tasks</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Manage and organize your day-to-day focus items.</p>
      </header>

      {/* Task Creation Form */}
      <form onSubmit={addTask} className="glass-card" style={{ padding: '1.5rem', marginBottom: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'end' }}>
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Task Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="What needs to be done?" 
            style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-primary)' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-primary)' }}
          >
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="Fitness">Fitness</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Priority</label>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-primary)' }}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Due Date</label>
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-primary)' }}
          />
        </div>

        <button 
          type="submit" 
          style={{
            gridColumn: '1 / -1',
            background: 'var(--color-accent-primary)',
            color: 'var(--color-background)',
            border: 'none',
            padding: '1rem',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginTop: '0.5rem'
          }}
        >
          Add Task
        </button>
      </form>

      {/* Task Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'Active', 'Completed'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? 'color-mix(in srgb, var(--color-accent-primary) 15%, transparent)' : 'transparent',
                color: filter === f ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Category:</span>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-background)', color: 'var(--color-text-primary)', fontSize: '0.9rem' }}
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="Fitness">Fitness</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
            <i className="fa-solid fa-clipboard-list" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
            <p>No tasks found matching your filters.</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className="glass-card" 
              style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '1.2rem', 
                opacity: task.completed ? 0.7 : 1,
                borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flex: 1 }}>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTask(task.id)}
                  style={{
                    width: '20px', 
                    height: '20px', 
                    accentColor: 'var(--color-accent-primary)',
                    cursor: 'pointer'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{
                    fontSize: '1.1rem',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                    fontWeight: '500'
                  }}>
                    {task.title}
                  </span>
                  <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', padding: '0.1rem 0.5rem', background: 'var(--color-background)', color: 'var(--color-accent-secondary)', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                      {task.category}
                    </span>
                    {task.dueDate && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        <i className="fa-regular fa-calendar-days" style={{ marginRight: '4px' }}></i>
                        {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => deleteTask(task.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '1.1rem',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksPage;
