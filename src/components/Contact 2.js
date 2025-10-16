import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    inquiryType: ''
  });
  const [jiggleFields, setJiggleFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Remove this field from jiggle fields if it now has content
    if (value.trim() && jiggleFields.includes(name)) {
      setJiggleFields(prev => prev.filter(field => field !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Check for empty required fields
    const emptyFields = [];
    if (!formData.name.trim()) emptyFields.push('name');
    if (!formData.email.trim()) emptyFields.push('email');
    if (!formData.phone.trim()) emptyFields.push('phone');
    if (!formData.inquiryType.trim()) emptyFields.push('inquiryType');
    if (!formData.message.trim()) emptyFields.push('message');
    
    if (emptyFields.length > 0) {
      console.log('Empty fields detected:', emptyFields);
      // Clear any existing jiggle fields first, then set new ones to trigger animation
      setJiggleFields([]);
      setTimeout(() => {
        setJiggleFields(emptyFields);
      }, 10);
      setSubmitStatus('validation_error');
      setIsSubmitting(false);
      return;
    }
    
    // Name validation - no numbers allowed
    const nameRegex = /^[a-zA-Z\s'-]+$/;
    if (!nameRegex.test(formData.name)) {
      // Clear any existing jiggle fields first, then set new ones to trigger animation
      setJiggleFields([]);
      setTimeout(() => {
        setJiggleFields(['name']);
      }, 10);
      setSubmitStatus('name_error');
      setIsSubmitting(false);
      return;
    }
    
    // Email validation - must have valid domain and common extensions
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|edu|gov|io|net|co|uk|ca|au|de|fr|jp|in|br|mx|es|it|nl|se|no|dk|fi|pl|ru|cn|kr|tw|hk|sg|my|th|ph|id|vn|za|ng|eg|ma|ke|gh|tz|ug|rw|et|dz|tn|ly|sd|so|dj|km|mg|mu|sc|re|yt|bw|sz|ls|na|zm|mw|ao|mz|zw|il)$/i;
    if (!emailRegex.test(formData.email)) {
      // Clear any existing jiggle fields first, then set new ones to trigger animation
      setJiggleFields([]);
      setTimeout(() => {
        setJiggleFields(['email']);
      }, 10);
      setSubmitStatus('email_error');
      setIsSubmitting(false);
      return;
    }
    
    // Phone number validation - must be valid US phone number format
    const phoneRegex = /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$|^([0-9]{10})$/;
    if (!phoneRegex.test(formData.phone)) {
      // Clear any existing jiggle fields first, then set new ones to trigger animation
      setJiggleFields([]);
      setTimeout(() => {
        setJiggleFields(['phone']);
      }, 10);
      setSubmitStatus('phone_error');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // EmailJS configuration
      const serviceId = 'service_pfftcff';
      const templateId = 'template_default'; // Try default template first
      const publicKey = 'dc4tr-tHpuYVCQNuZ';
      
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        inquiry_type: formData.inquiryType,
        to_email: 'bomaleburekas@gmail.com' // Your email address
      };
      
      console.log('Sending email with params:', { serviceId, templateId, templateParams });
      
      // Send email using EmailJS
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('Email sent successfully:', result);
      
      setSubmitStatus('success');
      setJiggleFields([]);
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        message: '', 
        inquiryType: '' 
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug log
  console.log('Current jiggle fields:', jiggleFields);

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-header">
          <h2>Contact</h2>
          <p className="contact-intro">
            Questions, cravings, or looking for a caterer? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info-section">
            <h3>Contact Info</h3>
            <p><strong>Email:</strong> bomaleburekas@gmail.com</p>
          </div>

          <div className="contact-form-section">
            <h3>Contact Form</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleInputChange}
                className={jiggleFields.includes('name') ? 'jiggle' : ''}
              />
              <input
                type="email"
                name="email"
                placeholder="name@example.com *"
                value={formData.email}
                onChange={handleInputChange}
                className={jiggleFields.includes('email') ? 'jiggle' : ''}
              />
              <input
                type="tel"
                name="phone"
                placeholder="(972) 180-2626 *"
                value={formData.phone}
                onChange={handleInputChange}
                className={jiggleFields.includes('phone') ? 'jiggle' : ''}
              />
              <select
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleInputChange}
                className={jiggleFields.includes('inquiryType') ? 'jiggle' : ''}
              >
                <option value="">Select inquiry type *</option>
                <option value="General Question">General Question</option>
                <option value="General Feedback">General Feedback</option>
                <option value="Catering & Events">Catering & Events</option>
                <option value="Press & Collabs">Press & Collabs</option>
              </select>
              <textarea
                name="message"
                placeholder="Your Message *"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                className={jiggleFields.includes('message') ? 'jiggle' : ''}
              ></textarea>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="form-success">
                  <p>Thank you for your message! We'll get back to you soon.</p>
                </div>
              )}
              
              {submitStatus === 'validation_error' && (
                <div className="form-error">
                  <p>Please fill in all required fields.</p>
                </div>
              )}
              
              {submitStatus === 'name_error' && (
                <div className="form-error">
                  <p>Name can only contain letters, spaces, hyphens, and apostrophes.</p>
                </div>
              )}
              
              {submitStatus === 'email_error' && (
                <div className="form-error">
                  <p>Please enter a valid email address with a recognized domain (.com, .org, .edu, etc.).</p>
                </div>
              )}
              
              {submitStatus === 'phone_error' && (
                <div className="form-error">
                  <p>Please enter a valid phone number (e.g., (972) 180-2626, 972-180-2626, or 9721802626).</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="form-error">
                  <p>There was an error sending your message. Please try again or email us directly at bomaleburekas@gmail.com</p>
                </div>
              )}
            </form>
          </div>

          <div className="catering-info-section">
            <h3>Event & Catering Inquiry Details</h3>
            <p>
              We're available for private events, catering, and festivals. 
              Please reach out with your date, location, and guest count, and we'll work with you to create an unforgettable experience.
            </p>
          </div>

          <div className="social-section">
            <h3>Keep up with us!</h3>
            <div className="social-links">
              <a href="https://instagram.com/bomalebourekas" target="_blank" rel="noreferrer" className="social-link social-link-small">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
