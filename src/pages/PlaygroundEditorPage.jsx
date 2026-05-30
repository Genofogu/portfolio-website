import React from 'react';
import { Link } from 'react-router-dom';
import CodePlayground from '../components/CodePlayground';

function PlaygroundEditorPage() {
  return (
    <div className="playground-editor-page g-section">
      <div className="g-container">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/playground" style={{ color: 'var(--color-text-secondary)' }}>
            <i className="fa-solid fa-arrow-left"></i> Back to Showcase
          </Link>
        </div>
        <CodePlayground />
      </div>
    </div>
  );
}

export default PlaygroundEditorPage;
