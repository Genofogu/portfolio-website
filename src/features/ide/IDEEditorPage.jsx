import React from 'react';
import { Link } from 'react-router-dom';
import CodePlayground from './CodePlayground';

function IDEEditorPage() {
  return (
    <div className="ide-editor-page g-section">
      <div className="g-container">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/ide" style={{ color: 'var(--color-text-secondary)' }}>
            <i className="fa-solid fa-arrow-left"></i> Back to CortexIDE Overview
          </Link>
        </div>
        <CodePlayground />
      </div>
    </div>
  );
}

export default IDEEditorPage;
