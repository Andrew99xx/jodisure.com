import React, { useState } from 'react';
import './IconGrid.css';

const IconGrid = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const icons = [
    {
        icon: "manual-screen.png",
        title: "Manually screened",
        content: "We manually check from Government verified ID by confirming from Aadhaar, Pan, or Driving License. Authenticate professional and Qualification background. For profile verification, we use a small video of our happy user connecting with us."
    },
    {
        icon: "mutual-connection.png",
        title: "Mutual Family & Friend ties",
        content: "Let your family and friends help you in finding your perfect match. Make family and friends join JODISURE to sync their contacts for creating a bigger circle to search mutuals with your match. We ensure full security of your data, so find your partner with complete peace of mind."
    },
    {
        icon: "security.png",
        title: "100% Security & Privacy",
        content: "Love with a Lock. 100% data security 100% Privacy, India's completely protected matrimony app with 100% chance to connect. We promise you a safe search for your perfect match with zero chances of fake or unauthorized profiles."
    },
    {
        icon: "pay-money.png",
        title: "Pay per Meet",
        content: "No Risk. Cost Efficient. Unique approach where you only pay when both bride and groom want to meet. Your money is secure and efficiently used by matchmakers to find you the most suitable match according to your needs and preferences.  Pay when you want to connect and meet."
    }
  ];

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center', margin: '20px' }}>OUR COMMITMENTS</h1>
      
      <div className="content-container">
        {icons.map((icon, index) => (
          <div className="icon-box" key={index} style={isMobile ? {} : (index === 1 || index === 2 ? { marginTop: '100px' } : {})}>
            <div className="icon-circle">
              <img src={icon.icon} alt={`Icon ${index + 1}`} style={{ width: '50px', height: '50px' }} />
            </div>
            <h2 style={{textAlign:'center'}}>{icon.title}</h2>
            <p style={{fontSize:isMobile?'2vh':'1vw', textAlign:'center'}}>{icon.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconGrid;
