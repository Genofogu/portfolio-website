import React from 'react';

const NewsletterCard = () => {
  return (
    <section className="blog-newsletter-card">
      <span className="eyebrow">Newsletter</span>
      <h2>Stay updated with new articles</h2>
      <p>Join the Genofogu newsletter to get the latest insights on AI, cloud, dev tools and learning journeys.</p>
      <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" type="email" placeholder="you@domain.com" aria-label="Newsletter email" />
        <button type="submit">Notify me</button>
      </form>
      <p className="newsletter-note">No spam. Just thoughtful updates when new content goes live.</p>
    </section>
  );
};

export default NewsletterCard;
