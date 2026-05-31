import React from 'react';

function SocialLinks() {
  const links = [
    { href: "https://github.com/genofogu", label: "GitHub", icon: "fa-brands fa-github" },
    { href: "https://linkedin.com/in/genofogu", label: "LinkedIn", icon: "fa-brands fa-linkedin" },
    { href: "https://instagram.com/genofogu", label: "Instagram", icon: "fa-brands fa-instagram" },
    { href: "mailto:genofogu@gmail.com", label: "Email", icon: "fa-solid fa-envelope" }
  ];

  return (
    <div className="glass-card social-links">
      <h3>Connect</h3>
      <div className="social-grid">
        {links.map((link, idx) => (
          <a key={idx} href={link.href} target="_blank" rel="noreferrer">
            <i className={link.icon}></i> {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default SocialLinks;
