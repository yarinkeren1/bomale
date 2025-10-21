import React, { useState } from 'react';
import './TermsOfUse.css';

const TermsOfUse = () => {
  const [activeSection, setActiveSection] = useState('terms');

  return (
    <div className="terms-container">
      <div className="terms-content">
        {/* Navigation Buttons */}
        <div className="section-navigation">
          <button 
            className={`nav-button ${activeSection === 'terms' ? 'active' : ''}`}
            onClick={() => setActiveSection('terms')}
          >
            Terms of Use
          </button>
          <button 
            className={`nav-button ${activeSection === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveSection('privacy')}
          >
            Privacy Policy
          </button>
        </div>

        {/* Terms of Use Section */}
        {activeSection === 'terms' && (
          <div className="section-content">
            <h1>Terms of Use</h1>
            <p className="last-updated">Last Updated: October 20, 2025</p>
        
        <p className="intro">
          Welcome to the website of Boma'le Bourekas ("we," "our," or "us"). By accessing or using our website, you agree to these Terms of Use ("Terms"). Please read them carefully before using any features or submitting any information.
        </p>

        <section className="terms-section">
          <h2>1. General Information</h2>
          <p>
            This website provides information about Boma'le Bourekas, including our location, hours of operation, menu items, and background. The content is for general informational purposes only and may change without notice.
          </p>
          <p>
            We make reasonable efforts to ensure accuracy but cannot guarantee that all information is current, complete, or error-free at all times.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Reviews</h2>
          <p>
            Our website features a customer review section to share experiences with Boma'le Bourekas. Reviews are collected via Google Forms and stored securely in Google Sheets, with data processed and displayed through Google APIs.
          </p>
          <ul>
            <li><strong>Display Policy:</strong> The six most recent five-star reviews may be displayed on our website. Older reviews are automatically replaced as new ones are received.</li>
            <li><strong>Content Standards:</strong> Reviews containing profanity, false claims, spam, or misleading content will not be published.</li>
            <li><strong>License:</strong> By submitting a review, you grant Boma'le Bourekas a non-exclusive, royalty-free, perpetual license to use, display, and reproduce your review for promotional or informational purposes.</li>
            <li><strong>Moderation:</strong> We reserve the right to remove or decline to display any review at our discretion.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>3. Contact Feature</h2>
          <p>
            Our "Contact Us" form is powered by EmailJS, which securely sends the information you provide—such as your name, email, and message—directly to our business email.
          </p>
          <p>
            By submitting the form, you consent to the collection and processing of your data for the purpose of responding to your inquiry. We do not sell or share this information with third parties, except as necessary to operate and maintain the website or communication systems.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Data Handling & Privacy</h2>
          <p>
            We use Google Forms, Google Sheets, and Google APIs to collect and manage customer reviews. These services are governed by Google's Privacy Policy and Terms of Service. By submitting data, you also agree to Google's applicable terms.
          </p>
          <p>
            We take reasonable steps to protect your personal data. However, no online system is 100% secure, and you acknowledge that you share information at your own risk.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. GDPR & CCPA Compliance</h2>
          <p>
            If you are a resident of the European Economic Area (EEA) or California, you have specific rights regarding your personal information, including:
          </p>
          <ul>
            <li>The right to access, correct, or delete your data</li>
            <li>The right to request a copy of your data</li>
            <li>The right to withdraw consent for data processing</li>
          </ul>
          <p>
            To exercise these rights, contact us at <a href="mailto:bomaleburekas@gmail.com">bomaleburekas@gmail.com</a>, and we will respond within a reasonable timeframe.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Intellectual Property</h2>
          <p>
            All website content—including text, images, menus, graphics, and branding—is the property of Boma'le Bourekas or its licensors. Unauthorized reproduction, modification, or distribution is prohibited.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Limitation of Liability</h2>
          <p>
            Boma'le Bourekas shall not be liable for any damages resulting from:
          </p>
          <ul>
            <li>The use or inability to use our website</li>
            <li>Errors, omissions, or interruptions in service</li>
            <li>Third-party services such as Google or EmailJS</li>
          </ul>
          <p>
            Use of the site is at your sole discretion and risk.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Changes to These Terms</h2>
          <p>
            We may update these Terms periodically. Any changes will be effective immediately upon posting on this page. Your continued use of the site signifies acceptance of the revised Terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Contact Us</h2>
          <p>
            For questions regarding these Terms or your data rights, please contact: <a href="mailto:bomaleburekas@gmail.com">bomaleburekas@gmail.com</a>
          </p>
        </section>
          </div>
        )}

        {/* Privacy Policy Section */}
        {activeSection === 'privacy' && (
          <div className="section-content">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last Updated: October 20, 2025</p>
        
        <p className="intro">
          This Privacy Policy explains how Boma'le Bourekas ("we," "our," or "us") collects, uses, and protects personal information submitted through our website's review and contact features.
        </p>
        <p className="intro">
          By using our website, you agree to this Privacy Policy.
        </p>

        <section className="terms-section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information directly from you when you interact with our website, including:
          </p>
          <p><strong>A. When submitting a review:</strong></p>
          <ul>
            <li>Name (displayed publicly unless you write "Anonymous" or request masking)</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Food item(s) tried</li>
            <li>Rating (1–5 stars)</li>
            <li>Written review (your feedback about Boma'le Bourekas)</li>
          </ul>
          <p><strong>B. When using the Contact Us form:</strong></p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Reason for contact (e.g., feedback, catering inquiry, general question)</li>
            <li>Message content</li>
          </ul>
          <p><strong>C. Automatically collected information:</strong></p>
          <ul>
            <li>Browser and device type</li>
            <li>IP address and general site usage data (e.g., pages visited, visit duration)</li>
          </ul>
          <p>
            We do not intentionally collect sensitive data such as payment details, government IDs, or health information.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Display submitted reviews and ratings on our website</li>
            <li>Respond to inquiries or messages sent through our contact form</li>
            <li>Improve our menu, products, and customer experience</li>
            <li>Maintain records of communications and feedback</li>
          </ul>
          <p>
            We do not sell or rent your personal information to third parties.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Review Display and Handling</h2>
          <p>
            Our review system uses Google Forms, Google Sheets, and Google APIs to automatically display reviews on the website.
          </p>
          <ul>
            <li>Reviews are automatically published in FIFO order (First In, First Out) with no manual moderation process.</li>
            <li>Only the six most recent five-star reviews appear publicly at any time; new five-star submissions automatically replace the oldest ones.</li>
            <li>The name entered in the review form is displayed publicly unless you:
              <ul>
                <li>Enter "Anonymous" as your name, or</li>
                <li>Request that your name be masked.</li>
              </ul>
            </li>
            <li>By submitting a review, you consent to the display of your name (unless masked), rating, and review text on our website.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. Contact Form Handling</h2>
          <p>
            Our Contact Us form is powered by EmailJS, which securely transmits your submission — including your name, email, phone number, reason for contact, and message — directly to our business email address.
          </p>
          <p>
            This data is not stored on our website or shared externally and is used solely to respond to your inquiry.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Data Storage and Security</h2>
          <p>
            We rely on the following secure third-party services:
          </p>
          <ul>
            <li>Google Forms / Google Sheets / Google APIs for review collection and management.</li>
            <li>EmailJS for direct message transmission.</li>
          </ul>
          <p>
            Each service operates under its own privacy policy:
          </p>
          <ul>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
            <li><a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">EmailJS Privacy Policy</a></li>
          </ul>
          <p>
            Data access is restricted to authorized personnel only, and reasonable security measures are taken to prevent unauthorized use or disclosure.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Data Retention</h2>
          <p>
            We retain review and contact information for as long as necessary to operate the website, maintain records, or comply with legal obligations.
          </p>
          <p>
            You may request deletion of your data at any time (see Section 9).
          </p>
        </section>

        <section className="terms-section">
          <h2>7. Cookies and Analytics</h2>
          <p>
            Our website may use cookies or analytics tools to understand general visitor activity (e.g., device type, visit duration, and site interactions).
          </p>
          <p>
            These do not collect personally identifiable information and can be disabled through your browser settings.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Data Sharing</h2>
          <p>
            We do not sell, rent, or share personal data with external parties.
          </p>
          <p>
            We may disclose limited information only when required by law or legal process.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Your Rights (GDPR & CCPA)</h2>
          <p>
            If you are a resident of the European Economic Area (EEA) or California, you have the right to:
          </p>
          <ul>
            <li>Access the data we hold about you</li>
            <li>Request correction or deletion of your information</li>
            <li>Withdraw consent for data use</li>
            <li>Request a copy of your stored data</li>
          </ul>
          <p>
            To exercise your rights, contact us at: <a href="mailto:bomaleburekas@gmail.com">bomaleburekas@gmail.com</a>
          </p>
          <p>
            We will respond within a reasonable timeframe consistent with applicable laws.
          </p>
        </section>

        <section className="terms-section">
          <h2>10. Children's Privacy</h2>
          <p>
            Our website is not directed toward children under 13 years old, and we do not knowingly collect personal information from minors.
          </p>
          <p>
            Because we have no way of monitoring users' ages, any personal data from a child under 13 will be deleted as soon as it is brought to our attention.
          </p>
        </section>

        <section className="terms-section">
          <h2>11. Updates to This Policy</h2>
          <p>
            We may revise this Privacy Policy periodically. Updates will be reflected by the "Last Updated" date above and take effect immediately upon posting.
          </p>
          <p>
            Your continued use of the website signifies acceptance of any changes.
          </p>
        </section>

        <section className="terms-section">
          <h2>12. Contact Us</h2>
          <p>
            For questions or requests about this Privacy Policy or your data, please contact: <a href="mailto:bomaleburekas@gmail.com">bomaleburekas@gmail.com</a>
          </p>
        </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsOfUse;
