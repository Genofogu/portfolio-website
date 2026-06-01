import React, { useEffect, useState } from 'react';

const StatsPage = () => {
  const [taskStats, setTaskStats] = useState({ total: 0, completed: 0, active: 0, rate: 0 });
  const [habitStats, setHabitStats] = useState([]);

  useEffect(() => {
    // Load Tasks
    const savedTasks = localStorage.getItem('geno-tasks');
    const tasks = savedTasks ? JSON.parse(savedTasks) : [];
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    setTaskStats({ total, completed, active, rate });

    // Load Habits
    const savedHabits = localStorage.getItem('geno-habits');
    const habits = savedHabits ? JSON.parse(savedHabits) : [
      { id: 1, name: 'Read Research Papers', doneToday: true, streak: 4, history: [true, false, true, true, true, false, true] },
      { id: 2, name: 'Cloud Certification Prep', doneToday: false, streak: 2, history: [false, true, false, true, false, false, false] }
    ];
    setHabitStats(habits);
  }, []);

  // Static mock weekly data for visual presentation
  const weeklyTrend = [
    { day: 'Mon', completed: 3 },
    { day: 'Tue', completed: 5 },
    { day: 'Wed', completed: 2 },
    { day: 'Thu', completed: 6 },
    { day: 'Fri', completed: 4 },
    { day: 'Sat', completed: 1 },
    { day: 'Sun', completed: 3 }
  ];

  const maxWeeklyCompleted = Math.max(...weeklyTrend.map(w => w.completed), 1);

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Productivity Analytics</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Visual review of your focus habits and accomplishments.</p>
      </header>

      {/* Numerical Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Completion Rate</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-accent-primary)', margin: '0.5rem 0' }}>{taskStats.rate}%</div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Tasks completed successfully</p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Total Tasks</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-accent-secondary)', margin: '0.5rem 0' }}>{taskStats.total}</div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{taskStats.completed} completed / {taskStats.active} pending</p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Habit Consistency</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-accent-tertiary)', margin: '0.5rem 0' }}>
            {habitStats.length > 0 ? Math.round((habitStats.reduce((acc, h) => acc + h.history.filter(Boolean).length, 0) / (habitStats.length * 7)) * 100) : 0}%
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Average weekly check-ins</p>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h4 style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Longest Streak</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', margin: '0.5rem 0' }}>
            {habitStats.length > 0 ? Math.max(...habitStats.map(h => h.streak), 0) : 0} Days
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Current active streak</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Weekly Trend Bar Chart */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-chart-column" style={{ color: 'var(--color-accent-primary)' }}></i>
            Weekly Accomplishments
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '200px', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
            {weeklyTrend.map((w, index) => {
              const heightPct = (w.completed / maxWeeklyCompleted) * 80 + 10; // offset for minimum height visibility
              return (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '0.8rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-primary)', fontWeight: '600' }}>{w.completed}</span>
                  <div style={{
                    width: '60%',
                    maxWidth: '40px',
                    height: `${heightPct}%`,
                    background: 'linear-gradient(to top, var(--color-accent-primary), var(--color-accent-secondary))',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 10px var(--color-glow)'
                  }}></div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{w.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Habit breakdown */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-calendar-check" style={{ color: 'var(--color-accent-secondary)' }}></i>
            Habit Breakdown
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {habitStats.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No habits registered.</p>
            ) : (
              habitStats.map(h => {
                const completedCount = h.history.filter(Boolean).length;
                const percentage = Math.round((completedCount / 7) * 100);
                return (
                  <div key={h.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--color-text-primary)', fontWeight: '500' }}>{h.name}</span>
                      <span style={{ color: 'var(--color-accent-primary)' }}>{completedCount}/7 Days ({percentage}%)</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--color-background-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', background: 'linear-gradient(to right, var(--color-accent-secondary), var(--color-accent-tertiary))', borderRadius: '4px' }}></div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', marginTop: '0.6rem' }}>
                      {h.history.map((day, idx) => (
                        <div 
                          key={idx} 
                          style={{
                            flex: 1,
                            height: '6px',
                            background: day ? 'var(--color-accent-primary)' : 'var(--color-border)',
                            borderRadius: '2px',
                            opacity: day ? 0.9 : 0.4
                          }}
                          title={day ? "Done" : "Missed"}
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsPage;
