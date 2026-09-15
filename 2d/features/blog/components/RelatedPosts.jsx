import React from 'react';
import { Link } from 'react-router-dom';

const RelatedPosts = ({ posts }) => {
  return (
    <section className="blog-related">
      <h2>Related Articles</h2>
      <div className="related-grid">
        {posts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="related-card">
            <div className="related-card__image" style={{ backgroundImage: `url(${post.coverImage})` }} />
            <div>
              <span>{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.readingTime} · {new Date(post.publishDate).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
