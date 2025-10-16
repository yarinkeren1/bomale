import React, { useState } from 'react';

const Catering = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    type: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in required fields.');
      return;
    }
    alert('Thanks! We\'ll reach out to confirm details.');
    setFormData({ name: '', email: '', date: '', type: '', message: '' });
  };

  return (
    <section id="catering" className="catering">
      <div className="container">
        <h2>Catering / Booking</h2>
        <p className="catering-pitch">Planning something tasty? BOMA'LE caters private parties, corporate events, and festivals across South Florida.</p>
        <form className="catering-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          <input type="text" name="type" placeholder="Event type" value={formData.type} onChange={handleChange} />
          <textarea name="message" placeholder="Message" rows="4" value={formData.message} onChange={handleChange}></textarea>
          <button type="submit" className="btn btn-primary">Send Request</button>
        </form>
        <p className="catering-note">We’ll reach out to confirm details — no pressure, just good food.</p>
      </div>
    </section>
  );
};

export default Catering;
