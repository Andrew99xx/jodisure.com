import logo from './logo.svg'; // Assuming you will use it somewhere else
import './App.css';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import VideoTextComponent from './VideoTextComponent';
import { Swiper } from 'swiper/react';
import SwiperComponent from './SwiperContainer';
import { JackInTheBox } from 'react-awesome-reveal';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Switch, Link, Routes, RouterProvider } from 'react-router-dom';
import DisclaimerPage from './Disclaimer';
// import Statistics from './stat';
import router from './router';
import Home from './Home';
import { AuthProvider } from './context/Auth.context';

function App() {
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



  return (
    <>

      <AuthProvider>
        <RouterProvider router={router} >
          <Home />
          <Footer />
        </RouterProvider>
      </AuthProvider>
    </>
  );
}

export default App;
