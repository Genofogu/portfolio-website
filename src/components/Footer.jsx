import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__wrapper">
        <p className="site-footer__copyright">
          &copy; {currentYear} Genofogu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;