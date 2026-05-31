import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import ClockWidget from './widgets/ClockWidget';
import WeatherWidget from './widgets/WeatherWidget';
import GoalWidget from './widgets/GoalWidget';
import StatsWidget from './widgets/StatsWidget';

function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem('genofogu-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      const defaultTasks = [
        { id: 1, title: 'Complete MCA Assignment', category: 'Study', priority: 'High', completed: false, dueDate: new Date().toISOString().split('T')[0] },
        { id: 2, title: 'Deploy RAG update', category: 'Work', priority: 'High', completed: false, dueDate: new Date().toISOString().split('T')[0] },
        { id: 3, title: 'Write architectural design', category: 'Work', priority: 'Medium', completed: true, dueDate: new Date().toISOString().split('T')[0] }
      ];
      setTasks(defaultTasks);
      localStorage.setItem('genofogu-tasks', JSON.stringify(defaultTasks));
    }

    // Load habits from localStorage
    const savedHabits = localStorage.getItem('genofogu-habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      const defaultHabits = [
        { id: 1, name: 'Read Research Papers', doneToday: true, streak: 4, history: [true, false, true, true, true, false, true] },
        { id: 2, name: 'Cloud Certification Prep', doneToday: false, streak: 2, history: [false, true, false, true, false, false, false] }
      ];
      setHabits(defaultHabits);
      localStorage.setItem('genofogu-habits', JSON.stringify(defaultHabits));
    }
  }, []);

  const toggleTaskCompletion = (id) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updated);
    localStorage.setItem('genofogu-tasks', JSON.stringify(updated));
  };

  const toggleHabitToday = (id) => {
    const updated = habits.map(h => {
      if (h.id === id) {
        const nextDoneToday = !h.doneToday;
        const histCopy = [...h.history];
        histCopy[histCopy.length - 1] = nextDoneToday;
        const nextStreak = nextDoneToday ? h.streak + 1 : Math.max(0, h.streak - 1);
        return { ...h, doneToday: nextDoneToday, history: histCopy, streak: nextStreak };
      }
      return h;
    });
    setHabits(updated);
    localStorage.setItem('genofogu-habits', JSON.stringify(updated));
  };

  // Filter tasks to show active ones
  const activeTasks = tasks.filter(t => !t.completed).slice(0, 4);

  return (
    <div className="scheduler-dashboard" style={{ padding: '2rem' }}>
      <header className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h1>Productivity Hub</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Welcome back, {user?.email ? user.email.split('@')[0] : 'Developer'}. Here is your daily overview.
        </p>
      </header>

      {/* Widget Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <ClockWidget />
        <WeatherWidget />
        <StatsWidget tasks={tasks} habits={habits} />
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Vespera Featured Card */}
        <div className="glass-card featured-product" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent-primary) 15%, transparent), color-mix(in srgb, var(--color-accent-secondary) 15%, transparent))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Vespera Core</h2>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', marginBottom: '1.5rem' }}>
                Your AI-powered daily companion for maximizing focus. Access your auto-generated tasks, reflections, and insights.
              </p>
              <a href="https://vespera.app" target="_blank" rel="noreferrer" className="hero__cta-button primary" style={{ textDecoration: 'none', background: 'var(--color-accent-primary)', color: 'var(--color-background)', padding: '0.8rem 1.5rem', borderRadius: '6px', fontWeight: 'bold', display: 'inline-block' }}>
                Launch Vespera <i className="fa-solid fa-rocket" style={{ marginLeft: '10px' }}></i>
              </a>
            </div>
            <div style={{ fontSize: '6rem', color: 'var(--color-accent-primary)', opacity: '0.5' }}>
              <i className="fa-solid fa-infinity"></i>
            </div>
          </div>
        </div>

        {/* Daily Goals */}
        <GoalWidget activeTasks={activeTasks} toggleTaskCompletion={toggleTaskCompletion} />

        {/* Habit Tracker */}
        <div className="glass-card">
          <h3 style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
            Daily Habits
            <i className="fa-solid fa-check-double" style={{ color: 'var(--color-accent-secondary)' }}></i>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {habits.map(habit => {
              const completedCount = habit.history.filter(Boolean).length;
              const percentage = Math.round((completedCount / 7) * 100);
              return (
                <div key={habit.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input 
                        type="checkbox" 
                        checked={habit.doneToday} 
                        onChange={() => toggleHabitToday(habit.id)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-accent-secondary)', cursor: 'pointer' }}
                      />
                      <span style={{ color: 'var(--color-text-primary)', fontWeight: '500' }}>{habit.name}</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-accent-secondary)' }}>{habit.streak}d streak</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--color-background-secondary)', borderRadius: '3px' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--color-accent-secondary)', borderRadius: '3px' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardPage;
