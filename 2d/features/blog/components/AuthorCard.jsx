import React from 'react';

const AuthorCard = ({ author }) => {
  return (
    <section className="blog-author-card">
      <img src={author.photo} alt={author.name} />
      <div>
        <p className="eyebrow">Author</p>
        <h3>{author.name}</h3>
        <p className="author-role">{author.role}</p>
        <p>{author.bio}</p>
        <div className="author-links">
          {author.socials.github && (
            <a href={author.socials.github} target="_blank" rel="noreferrer">GitHub</a>
          )}
          {author.socials.linkedin && (
            <a href={author.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          )}
          {author.socials.twitter && (
            <a href={author.socials.twitter} target="_blank" rel="noreferrer">Twitter</a>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthorCard;
