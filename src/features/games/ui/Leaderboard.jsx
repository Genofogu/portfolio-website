import React from 'react';

function Leaderboard() {
  const players = [
    { rank: 1, name: "Geno (Developer)", score: 9540, date: "2026-05-30" },
    { rank: 2, name: "AlphaCoder", score: 8710, date: "2026-05-29" },
    { rank: 3, name: "ByteCrusher", score: 7600, date: "2026-05-28" },
    { rank: 4, name: "DeepNode", score: 6200, date: "2026-05-25" },
    { rank: 5, name: "RAGAssistant", score: 5800, date: "2026-05-24" }
  ];

  return (
    <div className="glass-card leaderboard-widget" style={{ padding: '1.5rem', flex: 1 }}>
      <h3 style={{ marginBottom: '1.2rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-primary)' }}>
        <i className="fa-solid fa-ranking-star" style={{ color: 'var(--color-accent-primary)' }}></i>
        Global Leaderboard
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
            <th style={{ padding: '0.5rem' }}>Rank</th>
            <th style={{ padding: '0.5rem' }}>Player</th>
            <th style={{ padding: '0.5rem', textAlign: 'right' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, idx) => (
            <tr key={idx} style={{ borderBottom: idx < players.length - 1 ? '1px solid var(--color-border)' : 'none', color: 'var(--color-text-secondary)' }}>
              <td style={{ padding: '0.6rem 0.5rem', fontWeight: 'bold', color: idx === 0 ? 'var(--color-accent-primary)' : 'inherit' }}>#{p.rank}</td>
              <td style={{ padding: '0.6rem 0.5rem' }}>{p.name}</td>
              <td style={{ padding: '0.6rem 0.5rem', textAlign: 'right', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{p.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
