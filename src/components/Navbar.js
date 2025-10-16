import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (path) => {
    // Close mobile menu when clicking a link
    setIsMenuOpen(false);
    // If clicking on the current page, scroll to top
    if (location.pathname === path) {
      window.scrollTo(0, 0);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          navbar.style.backdropFilter = 'blur(10px)';
        } else {
          navbar.style.backgroundColor = '#FFFFFF';
          navbar.style.backdropFilter = 'none';
        }
      }
      // Close mobile menu when scrolling
      setIsMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" onClick={() => handleNavClick('/')}>
            <h1>BOMA'LE</h1>
          </Link>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => handleNavClick('/')}>Home</Link></li>
          <li><Link to="/menu" onClick={() => handleNavClick('/menu')}>Menu</Link></li>
          <li><Link to="/our-story" onClick={() => handleNavClick('/our-story')}>Our Story</Link></li>
          <li><Link to="/gallery" onClick={() => handleNavClick('/gallery')}>Gallery</Link></li>
          <li><Link to="/reviews" onClick={() => handleNavClick('/reviews')}>Reviews</Link></li>
          <li><Link to="/contact" onClick={() => handleNavClick('/contact')}>Contact Us</Link></li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
