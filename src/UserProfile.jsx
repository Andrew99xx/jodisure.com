import React, { useEffect, useState } from 'react';
import './ProfileCard.css';
import { Button, Carousel, Menu, notification, Skeleton } from 'antd';
import { auth } from './firebase-config';
import { CalendarOutlined, EnvironmentOutlined, IdcardFilled, IdcardOutlined, LogoutOutlined } from '@ant-design/icons';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuth } from './context/Auth.context';
import { useNavigate } from 'react-router';
import { LiaRulerVerticalSolid } from "react-icons/lia";
import { fetchUserImages, getRecomendations } from './services/Auth.service';
import moment from 'moment';
import { RiSpeakLine } from "react-icons/ri";

const ProfileCard = ({ user }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log("user", JSON.stringify(user, null, 2));
    const unsubscribe = fetchUserImages(user.id, (fetchedImages) => {
      console.log(" I M A G E S",fetchedImages);
      setImages(fetchedImages);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [user])


  const years = moment().diff(moment(user?.dob, 'DD/MM/YYYY'), 'years');
  const Religion = user.religion

  const myReligion = Religion.split(" ");
  let religion = myReligion[0];
  const subsection = myReligion[2]
  const marital = user.marital_status.charAt(0).toUpperCase() + user.marital_status.slice(1);
    const m = marital.split(" ")
    const married = m[0]
    const status = m[2]
  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={images[0]?.url} alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>
        <span className="blur-text">{user.first_name}</span> {user.last_name}</h2>
        <p><IdcardOutlined /> {user.UUID}</p>
        <p><CalendarOutlined /> {years} yrs | <LiaRulerVerticalSolid />
         {user.height} | <RiSpeakLine />
         {user?.personal_info_language}</p>
         
        <p><EnvironmentOutlined /> {user.city}</p>
      </div>
      <div className="profile-summary">
        <div className="summary-column">
          <p><span className="label">Profession</span> 
          <br></br>
          {user.profession}</p>
          <p><span className="label">Eating Habits</span> 
          <br></br>
          {user.eating_habits}</p>
          <p><span className="label">Highest Qualification</span> 
          <br></br>
          {user.carrer_info}</p>
          <p><span className="label">Profile Created By</span>
          <br></br>
          {user.profile_created_by}</p>
          <p><span className="label">University Name</span> 
          <br></br>
          {user.university}</p>
          <p><span className="label">Company Name</span> 
          <br></br>
          {user.company_name}</p>
          <p><span className="label">Health issues</span> 
          <br></br>
          {user.health_issue}</p>


        </div>
        <div className="summary-column">
          <p><span className="label">Post Marriage Plan</span> 
          <br></br>
          {user.post_marriage_plan}</p>
          <p><span className="label">City</span> 
          <br></br>
          {user.city}</p>
          <p><span className="label">Religion</span>
          <br></br> 
          {religion}</p>
          <p><span className="label">Sub-Religion </span>
          <br></br> 
          {subsection}</p>
          <p><span className="label">Hobbies & Interest </span> 
          <br></br>
          {user.hobbies}</p>
          <p><span className="label">Marital Status </span> 
          <br></br>
          {married} {status}</p>
          <p><span className="label">Weight </span> 
          <br></br>
          {user.weight}</p>


        </div>
      </div>
    </div>
  );
}


const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <Menu mode="horizontal" theme="dark">
        
        <Menu.Item key="logout" style={{ marginLeft: 'auto' }}>
          <Button type="primary" danger icon={<LogoutOutlined />} onClick={onLogout}>
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </div>
  );
};


const CarouselComponent = () => {
  const { currentUser, loadingAuth } = useAuth();
  const [uid, setUid] = useState()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      notification.success({
        message: 'Sucess',
        description: 'You have been logged out',
      });
      setTimeout(() => {
        navigate("/register"); // Use navigate function to redirect
      }, 2000);    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // setUid(user.uid);
        console.log("User ID:", user.uid);
        setUid(user.uid)
        const fetchedUser = await getRecomendations(uid)
    setUsers(fetchedUser)
        setLoading(false);
      } else {
        // setUid(null);
        console.log("User ID in else:");
        notification.error({
          message: 'Error',
          description: 'You are not logged in, please log in',
        });
        setTimeout(() => {
          navigate("/register"); // Use navigate function to redirect
        }, 2000);
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // useEffect(async () => {
  //   console.log("U I D",uid);
  //   const fetchedUser = await getRecomendations(uid)
  //   setUsers(fetchedUser)
  // }, [uid])


  return (
    <Skeleton loading={loading} active={true}>
      <Navbar onLogout={handleLogout}/>

      <Carousel arrows={true}  draggable={true} infinite={true}>

      {users.map((user) => (
        <ProfileCard key={user.id} user={user} />
      ))}

      </Carousel>
    </Skeleton>
  )
}
export default CarouselComponent;
