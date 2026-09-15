import React from 'react';

const BlogTableOfContents = ({ headings }) => {
  if (!headings.length) return null;

  return (
    <nav className="blog-toc">
      <h3>On this page</h3>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} className={`toc-level-${heading.level}`}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BlogTableOfContents;
