import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.slug}`} className="blog-card__cover-link">
        <div className="blog-card__cover" style={{ backgroundImage: `url(${post.coverImage})` }}>
          <span className="blog-card__category">{post.category}</span>
        </div>
      </Link>
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span>{post.readingTime}</span>
          <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <Link to={`/blog/${post.slug}`} className="blog-card__title-link">
          <h3>{post.title}</h3>
        </Link>
        <p>{post.description}</p>
        <div className="blog-card__footer">
          <span className="blog-card__author">{post.author.name}</span>
          <Link to={`/blog/${post.slug}`} className="blog-card__button">Read Article</Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
