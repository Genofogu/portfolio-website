import React from 'react';
import { Link } from 'react-router-dom';

function SocialLinks() {
  const links = [
    { href: "/github", label: "GitHub", icon: "fa-brands fa-github" },
    { href: "https://linkedin.com/in/geno", label: "LinkedIn", icon: "fa-brands fa-linkedin" },
    { href: "https://instagram.com/geno", label: "Instagram", icon: "fa-brands fa-instagram" },
    { href: "mailto:geno@gmail.com", label: "Email", icon: "fa-solid fa-envelope" }
  ];

  return (
    <div className="glass-card social-links">
      <h3>Connect</h3>
      <div className="social-grid">
        {links.map((link, idx) => (
          link.href.startsWith('/') ? (
            <Link key={idx} to={link.href}>
              <i className={link.icon}></i> {link.label}
            </Link>
          ) : (
            <a key={idx} href={link.href} target="_blank" rel="noreferrer">
              <i className={link.icon}></i> {link.label}
            </a>
          )
        ))}
      </div>
    </div>
  );
}

export default SocialLinks;
