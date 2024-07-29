import Lottie from 'lottie-web';
import React, { useState, useEffect, useRef } from 'react';
import { Fade } from 'react-awesome-reveal';
import './App.css';
import { Fieldset } from 'primereact/fieldset';
import { width } from 'dom-helpers';

function generateSparkles(count) {
    return Array.from({ length: count }).map((_, index) => ({
        id: index,
        style: {
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`, // random delay for more natural effect
        }
    }));
}


function VideoTextComponent() {
    const [isActive, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const refContainer = useRef(null);
    const animRef = useRef(null);
    const sparkles = generateSparkles(100); // Generate 100 sparkles

    const items = [
        { text: 'FAMILY TIES LEAD TO LASTING TIES', subtext: 'Discover shared friends and relatives with potential matches, fostering trust and transparency from the start.', videoUrl: '2.mp4' },
        { text: 'UNLIKE OTHER APPS', subtext: 'Enjoy unlimited profile viewing and interactions without any upfront costs. Pay only when you are ready to meet, with all arrangements handled by your personal matchmaker.', videoUrl: '3.mp4' },
        { text: 'VIP LIST OF LOVE', subtext: 'A dedicated matchmaker who truly gets YOU. We delve deep into your preferences, values, and dreams to find your perfect match.Your profile remains completely hidden. Your matchmaker handles everything, protecting your privacy every step of the way.', videoUrl: '4.mp4' },


    ];
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);




    // useEffect(() => {
    //     const anim = Lottie.loadAnimation({
    //         container: animRef.current, // reference to the container
    //         renderer: 'svg',
    //         loop: true,
    //         autoplay: true,
    //         animationData: require('./assets/Animation - 1720530444322.json') // the path to your animation file
    //     });

    //     return () => anim.destroy(); // optional clean up for unmounting
    // }, []);

    // Define styles here
    const containerStyle = {
        height: '100vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'space-around' : 'space-around',
        backgroundImage: `url('wave.svg')`,
        alignItems: 'center',
        backgroundSize: 'cover',
        padding: '20px'
    };

    const textStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'column',
        justifyContent: 'space-around',
        width: isMobile ? '100%' : 'initial',

    };

    const textItemStyle = (index) => ({
        padding: '20px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontFamily: 'Alice',
        color: "#FBE4E2",
        fontSize: isMobile ? '5vw' : '2vw',
        color: isActive === index ? 'red' : 'black',
        backgroundColor: '#BF8496',
        width:!isMobile?'80%':null,
        margin: isMobile ? "30px" : '50px'
    });

    const videoContainerStyle = {
        alignSelf: 'center',
        margin:'auto',
        marginRight:isMobile?'auto':'60px',
        width: isMobile ? '50%' : '480px',
        height: isMobile ? '400px' : '480px'
    };

    return (
        <>

            <div ref={refContainer} style={containerStyle}>
                {sparkles.map(sparkle => (
                    <div key={sparkle.id} className="sparkle" style={sparkle.style}></div>
                ))}

                <div style={textStyle}>
                    <Fade direction='down'>

                        {items.map((item, index) => (
                            <div key={index} style={textItemStyle(index)}
                                onClick={() => setActiveIndex(index)}>
                                <Fieldset legend={item.text}>
                                    <p style={{color:'black', fontSize:isMobile?"8px":"22px"}}>
                                       {item.subtext}
                                    </p>
                                </Fieldset>
                                {/* {item.text} */}
                            </div>
                        ))}
                    </Fade>
                </div>
                <Fade direction='up' style={{justifyContent:'center', alignContent:'center'}}>

                    <div style={videoContainerStyle}>
                        {isActive !== -1 && (
                            <video key={items[isActive].videoUrl} style={{ borderRadius: '10px', borderWidth: "10px", borderColor: "#592618", borderStyle: 'solid' }} width="100%" height="auto" controls autoPlay muted>
                                <source src={items[isActive].videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </Fade>
            </div>
        </>
    );
}

export default VideoTextComponent;
