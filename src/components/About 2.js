import React, { useEffect } from 'react';
import ImageCarousel from './ImageCarousel';

const About = () => {
  useEffect(() => {
    try {
      // Check if IntersectionObserver is available
      if (!window.IntersectionObserver) {
        // Fallback: just show elements immediately
        const aboutElements = document.querySelectorAll('.about-text, .about-image');
        aboutElements.forEach(item => {
          if (item) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }
        });
        return;
      }

      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);

      const aboutElements = document.querySelectorAll('.about-text, .about-image');
      aboutElements.forEach(item => {
        if (item) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(30px)';
          item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(item);
        }
      });

      return () => {
        try {
          observer.disconnect();
        } catch (error) {
          console.warn('Error disconnecting observer:', error);
        }
      };
    } catch (error) {
      console.warn('Error setting up About animations:', error);
    }
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>I moved from Israel to Miami when I was just 8 years old. Ever since, I've carried with me the flavors, traditions, and a longing of home. BOMA'LE was born from that longing to share a piece of my culture with my new community. Bourekas are a simple, yet deeply satisfying pastry, and they were without a doubt one of my favorite foods growing up in Israel. Here in Miami, I saw an opportunity to introduce them in a way that feels both familiar and new: honoring the classics like cheese and potato while creating flavors no one has tried before! To me, BOMA'LE is more than just a food truck, it's my way of sharing my culture with everyone in an authentic, approachable and delicious way.</p>
          </div>
          <div className="about-image">
            <div className="boureka-illustration"></div>
          </div>
        </div>
        
        {/* Image Carousel */}
        <div className="about-carousel">
          <ImageCarousel />
        </div>
      </div>
    </section>
  );
};

export default About;
