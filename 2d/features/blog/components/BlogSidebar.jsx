import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterCard from './NewsletterCard';

const BlogSidebar = ({ categories, tags, recentPosts, popularPosts }) => {
  return (
    <aside className="blog-sidebar">
      <section className="blog-sidebar__section">
        <h2>Search</h2>
        <p>Find content by topic, difficulty, or keyword.</p>
        <Link to="/blog/search" className="button button--secondary">Open search</Link>
      </section>

      <section className="blog-sidebar__section">
        <h2>Categories</h2>
        <div className="blog-sidebar__tags">
          {categories.slice(0, 10).map((category) => (
            <Link key={category.category} to={`/blog/category/${encodeURIComponent(category.category)}`} className="tag-pill">
              {category.category} <span>{category.count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="blog-sidebar__section">
        <h2>Popular Posts</h2>
        {popularPosts.slice(0, 3).map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="sidebar-post-link">
            <span>{post.title}</span>
            <small>{post.readingTime}</small>
          </Link>
        ))}
      </section>

      <section className="blog-sidebar__section">
        <h2>Recent Posts</h2>
        {recentPosts.slice(0, 3).map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="sidebar-post-link">
            <span>{post.title}</span>
            <small>{new Date(post.publishDate).toLocaleDateString()}</small>
          </Link>
        ))}
      </section>

      <NewsletterCard />
    </aside>
  );
};

export default BlogSidebar;
