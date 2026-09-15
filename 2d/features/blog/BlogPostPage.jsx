import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import BlogReadingProgress from './components/BlogReadingProgress';
import BlogTableOfContents from './components/BlogTableOfContents';
import RelatedPosts from './components/RelatedPosts';
import AuthorCard from './components/AuthorCard';
import NewsletterCard from './components/NewsletterCard';
import { blogPosts, getPostBySlug, getRelatedPosts } from './data/blogPosts';
import { markdownToHtml, extractHeadings } from './utils/blogMarkdown';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Setup click handler for copy code buttons dynamically rendered
  useEffect(() => {
    if (!post) return;

    const copyButtons = document.querySelectorAll('.blog-copy-code-btn');
    
    const handleCopy = async (event) => {
      const button = event.currentTarget;
      const codeContainer = button.closest('.blog-code-container');
      if (!codeContainer) return;
      
      const codeElement = codeContainer.querySelector('code');
      if (!codeElement) return;

      try {
        await navigator.clipboard.writeText(codeElement.textContent);
        
        // Visual feedback
        const label = button.querySelector('span');
        const icon = button.querySelector('i');
        
        if (label && icon) {
          const oldText = label.textContent;
          label.textContent = 'Copied!';
          icon.className = 'fa-solid fa-check';
          button.classList.add('copied');
          
          setTimeout(() => {
            label.textContent = oldText;
            icon.className = 'fa-regular fa-copy';
            button.classList.remove('copied');
          }, 2000);
        }
      } catch (err) {
        console.error('Failed to copy code: ', err);
      }
    };

    copyButtons.forEach(button => {
      button.addEventListener('click', handleCopy);
    });

    return () => {
      copyButtons.forEach(button => {
        button.removeEventListener('click', handleCopy);
      });
    };
  }, [post, slug]);

  if (!post) {
    return (
      <div className="blog-page blog-page--missing">
        <section className="blog-page-error">
          <h1>Article not found</h1>
          <p>The article you are looking for might have moved or is not published yet.</p>
          <button className="button button--primary" onClick={() => navigate('/blog')}>Back to Blog</button>
        </section>
      </div>
    );
  }

  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(post, 3);

  // Previous and Next Post Logic
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  // Social Share Handlers
  const pageUrl = window.location.href;
  const pageTitle = encodeURIComponent(post.title);
  
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${pageTitle}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`, '_blank');
  };

  const copyPageLink = (event) => {
    navigator.clipboard.writeText(pageUrl);
    const btn = event.currentTarget;
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Link Copied';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.classList.remove('copied');
    }, 2000);
  };

  return (
    <div className="blog-post-page">
      <BlogReadingProgress />
      
      <article className="blog-post">
        {/* Hero Area */}
        <div 
          className="blog-post__hero" 
          style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(10, 10, 12, 0.95)), url(${post.coverImage})` }}
        >
          <div className="blog-post__hero-content">
            <Link to={`/blog/category/${encodeURIComponent(post.category)}`} className="blog-post__hero-category">
              {post.category}
            </Link>
            <h1 className="blog-post__hero-title">{post.title}</h1>
            <p className="blog-post__hero-desc">{post.description}</p>
            
            <div className="blog-post__hero-meta">
              <div className="author-info">
                <img src={post.author.photo} alt={post.author.name} className="author-photo-small" />
                <span>{post.author.name}</span>
              </div>
              <span className="separator">•</span>
              <span>Published {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              {post.updatedDate && post.updatedDate !== post.publishDate && (
                <>
                  <span className="separator">•</span>
                  <span>Updated {new Date(post.updatedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </>
              )}
              <span className="separator">•</span>
              <span>{post.readingTime} read</span>
              <span className="separator">•</span>
              <span className="difficulty-tag">{post.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="blog-post__layout">
          <main className="blog-post__main-content">
            {/* Tag List */}
            <div className="blog-post__tags">
              {post.tags.map((tag) => (
                <Link key={tag} to={`/blog/search`} className="tag-pill tag-pill--soft">
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Rendered HTML */}
            <div 
              className="blog-post__markdown" 
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }} 
            />

            {/* Social Sharing bar */}
            <section className="blog-post__share">
              <h4>Share this article</h4>
              <div className="share-buttons">
                <button onClick={shareOnTwitter} aria-label="Share on X" className="share-btn twitter">
                  <i className="fa-brands fa-x-twitter"></i> Share
                </button>
                <button onClick={shareOnLinkedIn} aria-label="Share on LinkedIn" className="share-btn linkedin">
                  <i className="fa-brands fa-linkedin"></i> Share
                </button>
                <button onClick={copyPageLink} aria-label="Copy Link" className="share-btn copy-link">
                  <i className="fa-regular fa-link"></i> Copy Link
                </button>
              </div>
            </section>

            {/* Post Navigation */}
            <nav className="blog-post__navigation">
              {prevPost ? (
                <Link to={`/blog/${prevPost.slug}`} className="nav-prev-link">
                  <span className="nav-label">← Previous Post</span>
                  <span className="nav-title">{prevPost.title}</span>
                </Link>
              ) : (
                <div className="nav-placeholder" />
              )}
              
              {nextPost ? (
                <Link to={`/blog/${nextPost.slug}`} className="nav-next-link">
                  <span className="nav-label">Next Post →</span>
                  <span className="nav-title">{nextPost.title}</span>
                </Link>
              ) : (
                <div className="nav-placeholder" />
              )}
            </nav>

            {/* Author Section */}
            <AuthorCard author={post.author} />

            {/* Related Posts */}
            <RelatedPosts posts={related} />

            {/* Comments Area Placeholder */}
            <section className="blog-comments-placeholder">
              <div className="comments-header">
                <h2>Discussion</h2>
                <span>0 comments</span>
              </div>
              <div className="comments-box">
                <textarea placeholder="Join the discussion... (Comments are currently offline)" disabled></textarea>
                <button className="button button--secondary" disabled>Post Comment</button>
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="blog-post__sidebar">
            <div className="sticky-sidebar-wrapper">
              <BlogTableOfContents headings={headings} />
              <NewsletterCard />
              <Link to="/blog" className="sidebar-back-link">
                <i className="fa-solid fa-arrow-left-long"></i> Back to All Articles
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
