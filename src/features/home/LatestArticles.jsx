import React from 'react';
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { getRecentPosts } from '../blog/data/blogPosts';

function LatestArticles() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const latestPosts = getRecentPosts().slice(0, 3);

  return (
    <section
      id="latest-articles"
      className={`latest-articles g-section ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="latest-articles__header">
        <h2 className="latest-articles__title">Latest Articles</h2>
        <p className="latest-articles__subtitle">Sharing insights on AI, cloud engineering, development logs and future systems.</p>
        <svg className="latest-articles__connector" width="100" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 50,0 Q 50,50 90,50 T 50,100" stroke="var(--color-accent-primary)" fill="none" strokeWidth="2" />
        </svg>
      </div>

      <div className="latest-articles__grid">
        {latestPosts.map((post, index) => (
          <article
            className="article-card glass-card"
            key={post.slug}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Link to={`/blog/${post.slug}`} className="article-card__image-link">
              <div
                className="article-card__image"
                style={{ backgroundImage: `url(${post.coverImage})` }}
              />
            </Link>
            <div className="article-card__content">
              <div className="article-card__meta">
                <span className="article-card__category">{post.category}</span>
                <span className="article-card__dot">•</span>
                <span className="article-card__time">{post.readingTime}</span>
              </div>
              <Link to={`/blog/${post.slug}`} className="article-card__title-link">
                <h3 className="article-card__title">{post.title}</h3>
              </Link>
              <p className="article-card__desc">{post.description}</p>
              <div className="article-card__footer">
                <span className="article-card__date">
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <Link to={`/blog/${post.slug}`} className="article-card__link">
                  Read Article →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="latest-articles__actions">
        <Link to="/blog" className="btn-view-all">
          View All Articles
        </Link>
      </div>
    </section>
  );
}

export default LatestArticles;
