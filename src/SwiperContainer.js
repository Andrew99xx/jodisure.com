import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import './App.css';
import { EffectCards } from 'swiper/modules';
import { Slide } from 'react-awesome-reveal';
const features = [
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
        icon: "security.svg",
        title: "100% Security & Privacy",
        content: "Love with a Lock. 100% data security 100% Privacy, India's completely protected matrimony app with 100% chance to connect. We promise you a safe search for your perfect match with zero chances of fake or unauthorized profiles."
    },
    {
        icon: "pay-money.png",
        title: "Pay per Meet",
        content: "No Risk. Cost Efficient. Unique approach where you only pay when both bride and groom want to meet. Your money is secure and efficiently used by matchmakers to find you the most suitable match according to your needs and preferences. We believe in Quality over Quantity: Prioritize meaningful connections, Pay when you want to connect and meet."
    }
];
function SwiperComponent() {
    return (
        <Slide>

        <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
        >
            {features.map((feature, index) => (
                <SwiperSlide key={index}>
                    <img className="swiper-icon" src={feature.icon} />
                    <h2 className='swiper-heading'>{feature.title}</h2>
                    <p className='swiper-content'>{feature.content}</p>
                </SwiperSlide>
            ))}
        </Swiper>
        </Slide>
    );
}

export default SwiperComponent;
