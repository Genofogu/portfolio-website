import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogCard from './components/BlogCard';
import BlogSidebar from './components/BlogSidebar';
import { getPostsByCategory, getRecentPosts, getPopularPosts, getCategoryCounts, getAllTags } from './data/blogPosts';

const BlogCategoryPage = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const posts = getPostsByCategory(decodedCategory);
  const recentPosts = getRecentPosts();
  const popularPosts = getPopularPosts();
  const categoryCounts = getCategoryCounts();
  const tags = getAllTags();

  return (
    <div className="blog-page blog-page--category">
      <section className="blog-landing-panel">
        <div>
          <span className="eyebrow">Category</span>
          <h1>{decodedCategory}</h1>
          <p>Articles and resources curated for the {decodedCategory} topic.</p>
          <Link to="/blog" className="button button--secondary">Back to Blog Home</Link>
        </div>
      </section>
      <section className="blog-page__main">
        <div className="blog-page__content">
          <section className="blog-section">
            <div className="section-header">
              <span className="eyebrow">Results</span>
              <h2>{posts.length} articles in {decodedCategory}</h2>
            </div>
            <div className="blog-grid">
              {posts.length ? posts.map((post) => <BlogCard key={post.slug} post={post} />) : (
                <div className="empty-state">
                  <p>No posts found for this category yet.</p>
                  <Link to="/blog/search" className="button button--primary">Search all articles</Link>
                </div>
              )}
            </div>
          </section>
        </div>
        <BlogSidebar categories={categoryCounts} tags={tags} recentPosts={recentPosts} popularPosts={popularPosts} />
      </section>
    </div>
  );
};

export default BlogCategoryPage;
