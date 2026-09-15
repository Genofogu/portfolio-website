import React, { useEffect, useState } from 'react';

const BlogReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('.blog-post__content');
      if (!article) return;
      const { top, height } = article.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = height - windowHeight;
      const current = Math.min(Math.max(-top, 0), total);
      setProgress(total > 0 ? Math.round((current / total) * 100) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="blog-progress">
      <span>{progress}% read</span>
      <div className="blog-progress__bar">
        <div className="blog-progress__fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default BlogReadingProgress;
