import React from 'react';
import './stats.css';  // Ensure the CSS file is linked

const Statistic = () => {
  return (
    <div className="download-banner">
      <h2>Download Now</h2>
      <div className="download-buttons">
        <a href="https://play.google.com/store" target="_blank" id='google' rel="noopener noreferrer" >
          <img src="google-play.png" alt="Download from Google Play" className="download-logo google-play-logo"  />
        </a>
        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" >
          <img src="app-store.png" alt="Download on the App Store" className="download-logo app-store-logo"/>
        </a>
      </div>
    </div>
  );
};

export default Statistic;
