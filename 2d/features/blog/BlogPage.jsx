import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogHero from './components/BlogHero';
import BlogCard from './components/BlogCard';
import BlogSidebar from './components/BlogSidebar';
import JournalView from './components/JournalView';
import { blogPosts, categories, getFeaturedPosts, getRecentPosts, getPopularPosts, getCategoryCounts, getAllTags } from './data/blogPosts';

const BlogPage = () => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('blog_mode') || 'engineering';
  });

  const handleModeChange = (newMode) => {
    setMode(newMode);
    localStorage.setItem('blog_mode', newMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featured = getFeaturedPosts();
  const recentPosts = getRecentPosts();
  const popularPosts = getPopularPosts();
  const categoryCounts = getCategoryCounts();
  const tags = getAllTags();

  return (
    <div className="blog-page">
      {/* Segmented Mode Switcher */}
      <div className="blog-mode-container">
        <div className="blog-mode-switch">
          <button 
            type="button" 
            className={`blog-mode-btn ${mode === 'engineering' ? 'active' : ''}`}
            onClick={() => handleModeChange('engineering')}
          >
            <i className="fa-solid fa-code"></i> Engineering
          </button>
          <button 
            type="button" 
            className={`blog-mode-btn ${mode === 'journal' ? 'active' : ''}`}
            onClick={() => handleModeChange('journal')}
          >
            <i className="fa-solid fa-book-open"></i> Journal
          </button>
        </div>
      </div>

      {mode === 'engineering' ? (
        <div className="animate-fade-in">
          <BlogHero featured={featured} />
          
          <section className="blog-page__main">
            <div className="blog-page__content">
              <section className="blog-section" id="featured">
                <div className="section-header">
                  <span className="eyebrow">Featured</span>
                  <h2>Highlighted insights</h2>
                </div>
                <div className="blog-grid">
                  {featured.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>

              <section className="blog-section">
                <div className="section-header">
                  <span className="eyebrow">Latest</span>
                  <h2>New from the knowledge hub</h2>
                </div>
                <div className="blog-grid blog-grid--articles">
                  {recentPosts.slice(0, 6).map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>

              <section className="blog-section blog-section--tags">
                <div className="section-header">
                  <span className="eyebrow">Categories</span>
                  <h2>Browse by topic</h2>
                </div>
                <div className="tag-grid">
                  {categories.slice(0, 18).map((category) => (
                    <Link key={category} to={`/blog/category/${encodeURIComponent(category)}`} className="tag-pill tag-pill--soft">
                      {category}
                    </Link>
                  ))}
                </div>
              </section>

              <section className="blog-section blog-section--tag-cloud">
                <div className="section-header">
                  <span className="eyebrow">Tags</span>
                  <h2>Explore related topics</h2>
                </div>
                <div className="tag-cloud">
                  {tags.slice(0, 18).map((tag) => (
                    <Link key={tag} to={`/blog/search`} className="tag-pill tag-pill--cloud">
                      {tag}
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <BlogSidebar categories={categoryCounts} tags={tags} recentPosts={recentPosts} popularPosts={popularPosts} />
          </section>
        </div>
      ) : (
        <JournalView />
      )}
    </div>
  );
};

export default BlogPage;
