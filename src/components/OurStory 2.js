import React, { useEffect } from 'react';

const OurStory = () => {
  useEffect(() => {
    try {
      // Check if IntersectionObserver is available
      if (!window.IntersectionObserver) {
        // Fallback: just show elements immediately
        const storyElements = document.querySelectorAll('.our-story-content');
        storyElements.forEach(item => {
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

      const storyElements = document.querySelectorAll('.our-story-content');
      storyElements.forEach(item => {
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
      console.warn('Error setting up OurStory animations:', error);
    }
  }, []);

  return (
    <section id="our-story" className="our-story">
      <div className="container">
        <div className="our-story-content">
          <h2>Our Story</h2>
          <p>I moved from Israel to Miami when I was 8 years old, and ever since, food has always represented people coming together. Whether it's to celebrate someone or something, joyous occasions were always surrounded by good food. For me, food creates space for laughter, connection, and those moments where everyone feels at home. Growing up, Friday night dinners with my family is the only time of the week we all got to sit at the table, catch up, laugh and connect.</p>
          <p>I've always loved hosting, and I find the greatest joy in seeing people enjoy themselves around a table I've set, with food that I made. Among all the foods I grew up with, bourekas were always the ones that seemed to disappear fastest at gatherings. Simple and satisfying, they were the kind of food people naturally gravitated towards.</p>
          <p>When I first came to Miami, I missed that sense of warmth and realized there was nothing here that gave me the same feeling. Miami celebrates many cultures beautifully, but I felt that the kind of food I grew up around was missing. That's when BOMA'LE came to life, not just as a food truck, but as a way to share the spirit of gathering and hosting that I love so much. My vision is to give people not just food that's comforting, satisfying, and worth coming back for, but also an interaction that they'll carry with them and get them through the day.</p>
          <p>To me, BOMA'LE is my way of opening the door to everyone, creating a place where people are guests at my table. Whether it's a late night bite, a midday meal, or a first taste of something new, I want each interaction to feel warm, inviting, and full of heart. At its core, BOMA'LE is about sharing food that brings people together and makes you feel at home, whether it's your first or hundredth time eating bourekas.</p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
