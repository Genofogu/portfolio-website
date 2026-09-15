import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './components/BlogCard';
import BlogSidebar from './components/BlogSidebar';
import { getRecentPosts, getPopularPosts, getCategoryCounts, getAllTags, blogPosts } from './data/blogPosts';
import { useBlogSearch } from './hooks/useBlogSearch';

const BlogSearch = () => {
  const { query, setQuery, category, setCategory, tag, setTag, difficulty, setDifficulty, sortKey, setSortKey, results } = useBlogSearch();
  const recentPosts = getRecentPosts();
  const popularPosts = getPopularPosts();
  const categories = getCategoryCounts();
  const tags = getAllTags();

  return (
    <div className="blog-page blog-search-page">
      <section className="blog-search-hero">
        <div>
          <span className="eyebrow">Search</span>
          <h1>Find articles, categories, and insights.</h1>
          <p>Search by title, category, tag, description, or post content in real time.</p>
        </div>
      </section>

      <section className="blog-page__main">
        <div className="blog-page__content">
          <section className="blog-search-panel">
            <div className="blog-search-panel__controls">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles, tags, cloud, AI..."
                aria-label="Search articles"
              />
              <div className="filters-row">
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option>All</option>
                  {categories.map((item) => <option key={item.category}>{item.category}</option>)}
                </select>
                <select value={tag} onChange={(event) => setTag(event.target.value)}>
                  <option>All</option>
                  {tags.map((option) => <option key={option}>{option}</option>)}
                </select>
                <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
                  <option>All</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <select value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>Most Popular</option>
                  <option>Recently Updated</option>
                </select>
              </div>
            </div>

            <div className="blog-search-panel__summary">
              <p>{results.length} results found</p>
              <div className="tag-cloud">
                {tags.slice(0, 12).map((item) => (
                  <button key={item} type="button" className="tag-pill tag-pill--cloud" onClick={() => setTag(item)}>{item}</button>
                ))}
              </div>
            </div>
          </section>

          <section className="blog-section">
            <div className="blog-grid blog-grid--search-results">
              {results.length ? results.map((post) => <BlogCard key={post.slug} post={post} />) : (
                <div className="empty-state">
                  <h2>No matches yet</h2>
                  <p>Try a broader keyword or choose a different category.</p>
                  <Link to="/blog" className="button button--secondary">Browse the blog</Link>
                </div>
              )}
            </div>
          </section>
        </div>

        <BlogSidebar categories={categories} tags={tags} recentPosts={recentPosts} popularPosts={popularPosts} />
      </section>
    </div>
  );
};

export default BlogSearch;
