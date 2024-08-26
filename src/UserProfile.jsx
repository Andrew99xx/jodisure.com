import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>Indranil Chakraborty</h2>
        <p>ID: 4DFG6</p>
        <p>🗓️ 24 yrs | 🧍‍♂️ 5.7 ft</p>
        <p>📍 Kolkata, West Bengal, India</p>
      </div>
      <div className="profile-summary">
        <div className="summary-column">
          <p>Profile detail 1</p>
          <p>Profile detail 2</p>
          <p>Profile detail 3</p>
          <p>Profile detail 4</p>
        </div>
        <div className="summary-column">
          <p>Profile detail 5</p>
          <p>Profile detail 6</p>
          <p>Profile detail 7</p>
          <p>Profile detail 8</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
