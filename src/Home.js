import logo from './logo.svg'; // Assuming you will use it somewhere else
import './App.css';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import VideoTextComponent from './VideoTextComponent';
import { Swiper } from 'swiper/react';
import SwiperComponent from './SwiperContainer';
import { JackInTheBox } from 'react-awesome-reveal';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
// import DisclaimerPage from './Disclaimer';
import Statistics from './stats';
import IconGrid from './OurCommitment';

function Home() {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("Indranil")


  // useEffect(() => {
  //   const onScroll = () => {
  //     if (window.scrollY > 50) { // Trigger animation after scrolling down 50 pixels
  //       setIsActive(true);
  //     } else {
  //       setIsActive(false);
  //     }
  //   };

  //   window.addEventListener('scroll', onScroll);
  //   return () => window.removeEventListener('scroll', onScroll);
  // }, []);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) { // Trigger animation after scrolling down 50 pixels
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.location.href = '/register';

  }

  return (
    <>
      <div className={isActive ? 'slideScreen active' : 'slideScreen'}>

        <div className="hero">
          <div className="background-image"></div>

          <div className="centered-text">

            <div className='title-text'>
              <b>
              JODISURE
                </b> 
            </div>
            <div className='title-text' id='subtext'>
            Your Personal
            Matchmaker for Lasting Love
            </div>
            <div className='arapey-text'>

              Tired of swiping through endless profiles? Jodisure offers a truly personalized matchmaking experience. With a dedicated personal matchmaker assigned to every user, we redefine the way you find love.

            </div>
            <div>
              <Button variant="contained" style={{  backgroundColor:"#f2ce80", color: "#592618", borderColor: "#FFD700", borderRadius: "25px", borderWidth: "3px", display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }} onClick={handleClick}>
                <img src="logo.png" alt="Logo" className="logo" />
                <div className='fredoka-text'>

                  Register Now
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: "#FAE4E3", alignSelf: 'center', justifyContent: 'center' }}>

          <div className='hero-banner'>
            <div style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
              <div className='alice-text'>India’s  most secure and personalized matchmaking platform </div>
            </div>
          </div>
        </div>
      </div>
      <VideoTextComponent />
      <Statistics />

      <IconGrid />
      {/* <div className='swiper-side-content'>
          <JackInTheBox>
            <p>
            OUR 
            COMMITMENTS
            </p>
          </JackInTheBox>
        </div>
        
        <SwiperComponent /> */}

      <Footer />


    </>
  );
}

export default Home;
