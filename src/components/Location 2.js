import React from 'react';

const Location = () => {
  const schedule = [
    { day: 'Monday', spot: 'Brickell Lunch Lot', time: '11 AM – 2 PM' },
    { day: 'Wednesday', spot: 'Wynwood Night Market', time: '6 PM – 10 PM' },
    { day: 'Friday', spot: 'South Beach Late Night', time: '8 PM – 1 AM' },
    { day: 'Sunday', spot: 'Coconut Grove Farmers Market', time: '10 AM – 3 PM' }
  ];

  return (
    <section id="find" className="location">
      <div className="container">
        <h2>Find the Truck</h2>
        <div className="location-content">
          <div className="location-info">
            <h3>Weekly Schedule</h3>
            <div className="hours">
              {schedule.map((item, index) => (
                <div key={index} className="hours-item">
                  <span>{item.day}</span>
                  <span>{item.spot} — {item.time}</span>
                </div>
              ))}
            </div>
            <p>We post updates regularly — follow <a href="https://instagram.com/bomalebourekas" target="_blank" rel="noreferrer">@bomalebourekas</a> on Instagram.</p>
          </div>
          <div className="location-map">
            <div className="map-placeholder">
              <p>📍 Event schedule embed coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
