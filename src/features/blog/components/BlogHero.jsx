import React from 'react';
import { Link } from 'react-router-dom';

const BlogHero = ({ featured }) => {
  return (
    <section className="blog-hero">
      <div className="blog-hero__content">
        <span className="eyebrow">Knowledge. Learning. Building.</span>
        <h1>Sharing everything I learn while building AI systems, developer tools, cloud projects and future technologies.</h1>
        <p>Premium insights, practical guides, and build logs for builders who want to go deeper.</p>
        <div className="blog-hero__actions">
          <Link to="/blog/search" className="button button--primary">Search Articles</Link>
          <Link to="#featured" className="button button--secondary">Explore Featured</Link>
        </div>
      </div>

      <div className="blog-hero__grid" aria-hidden="true">
        {featured.slice(0, 3).map((post) => (
          <article key={post.slug} className="blog-hero__card">
            <div className="blog-hero__image" style={{ backgroundImage: `url(${post.coverImage})` }} />
            <div className="blog-hero__overlay">
              <span>{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogHero;
