import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Input, Button, Row, Col, Form, notification, Flex } from 'antd';
import { CSSTransition } from 'react-transition-group';
import './OtpRegistration.css';
import Register from './Register';
import OtpInput from 'react-otp-input';
import { signInWithPhone } from './services/Auth.service';
import { PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signInWithPhoneNumber } from 'firebase/auth';
import { auth, db } from './firebase-config';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import logo from './images/logo.png'
const OtpRegistration = ({ onSubmit }) => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [showOtpForm, setShowOtpForm] = useState(true);
    const [confirmResult, setConfirmResult] = useState();
    const [loading, setLoading] = useState(false);
    const [otpStatus, setOtpStatus] = useState("pending");
    const [timerCount, setTimer] = useState(30);
    const [verificationId, setVerificationId] = useState(null);
    const [otpSending, setOtpSending] = useState(false)
    useEffect(() => {
        console.log(auth.currentUser?.uid)
    }, [])
    useEffect(() => {
        console.log("The current value of the input: ", otp);
    }, [otp]);
    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'recaptcha-container',
            {
                size: 'invisible', // or 'normal' if you want to display it
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber
                    console.log('reCAPTCHA solved');
                },
            },

        );
    };

    const handleSendOtp = () => {
        setOtpSending(true)
        const formattedPhone = '+' + phone;  // Prepend the '+' to the phone number
        // Reinitialize the reCAPTCHA
        if (!window.recaptchaVerifier) {
            // console.log("am i sexual???");
            setUpRecaptcha();
        }


        const appVerifier = window.recaptchaVerifier;
        console.log("P H O N  E ", +formattedPhone);
        signInWithPhoneNumber(auth, formattedPhone, appVerifier)
            .then((confirmationResult) => {
                setIsOtpSent(true);
                setVerificationId(confirmationResult.verificationId);
                notification.success({
                    message: 'Success',
                    description: 'OTP sent to: ' + formattedPhone,
                });
                console.log('OTP sent to:', formattedPhone);
            })
            .catch((error) => {
                console.error('Error during sign-in:', error);
                notification.error({
                    message: 'Error',
                    description: error,
                });
            }).finally(() => {
                setOtpSending(false)
            });
    };
    const sendOTP = () => {
        // if (!toggleCheckBox) {
        //   alert("You must agree to our terms and conditions.");
        //   return;
        // }
        setLoading(true);
        setOtpStatus("pending");
        setTimer(30);
        signInWithPhone(phone, true)
            .then((confirmResult) => {
                console.log("Check for Confirm Result", confirmResult);
                setConfirmResult(confirmResult);
                setOtpStatus("sent");
            })
            .catch((err) => {
                console.log(err);
                notification.error({
                    message: 'Failed to send OTP',
                    description: 'There are something that went wrong',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleOtpSubmit = () => {
        if (otp.length === 6) {
            //   onSubmit(phone, otp);
            // setShowOtpForm(false); // Trigger the slide transition

            notification.success({
                message: 'OTP Verified',
                description: 'Your phone number has been verified successfully.',
            });
            setShowOtpForm(false); // Trigger the slide transition
        } else {
            notification.error({
                message: 'Error',
                description: 'Please enter a valid 6-digit OTP.',
            });
        }
    };
    const handleVerifyOtp = async () => {
        if (!verificationId) {
            notification.error({
                message: 'Error',
                description: 'No OTP request was made. Please request an OTP first.',
            });
            return;
        }

        try {
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            const result = await signInWithCredential(auth, credential);
            const user = result.user;

            // Check if the user's uid exists in the Firestore users collection
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();

                if (userData.UUID && userData.onboarded) {
                    notification.info({
                        message: 'Account Exists',
                        description: 'Your account is already created. Redirecting',
                    });

                    // Wait for 1 second before redirecting
                    setTimeout(() => {
                        window.location.href = 'profile';
                    }, 1000);
                }
                else {
                    notification.success({
                        message: 'Success',
                        description: 'OTP verified successfully! Proceed with account creation.',
                    });
                    // Proceed with account creation or other actions
                    console.log('Proceed with account creation');
                    setShowOtpForm(false); // Trigger the slide transition

                }
            } else {
                notification.success({
                    message: 'Success',
                    description: 'OTP verified successfully! Proceed with account creation.',
                });
                // Proceed with account creation or other actions
                console.log('Proceed with account creation');
                setShowOtpForm(false); // Trigger the slide transition

            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            notification.error({
                message: 'Error',
                description: error.message,
            });
        }
    };


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <CSSTransition
                    in={showOtpForm}
                    timeout={500}
                    classNames="slide"
                    unmountOnExit
                >
                    <div className="otp-registration-container">
                        <div className="left-section-otp">
                            <div className="logo-container">
                                <img src={logo} alt="Logo" className="logo-image" />
                            </div>
                            <div className="quote-container">
                                <p className="quote-text" style={{ fontSize: 'large' }}>Welcome</p>
                                {/* <p className="quote-text" >Formerly known as Rivayatt</p> */}
                                <p className="quote-text">Login to your account to get connected</p>

                            </div>
                        </div>

                        <div className="right-section-otp">
                            <Form layout="vertical" onFinish={handleVerifyOtp}>
                                <Form.Item label="Phone Number">
                                    <PhoneInput
                                        country={'in'}
                                        value={phone}
                                        onChange={setPhone}
                                        inputStyle={{ width: '100%' }}
                                        containerClass="phone-input-container"
                                    />
                                </Form.Item>

                                <Button
                                    type="primary"
                                    onClick={handleSendOtp}
                                    disabled={otpSending}
                                    className="send-otp-btn"
                                    style={{ backgroundColor: '#D483AF' }}
                                >
                                    <div id="recaptcha-container"></div>
                                    {otpSending ? 'Sending' : (isOtpSent ? 'Resend OTP' : 'Send OTP')}
                                </Button>

                                {isOtpSent && (
                                    <Form.Item label="Enter OTP">
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            renderSeparator={<span>-</span>}
                                            renderInput={(props) => <input {...props} />}
                                            isInputNum
                                            inputStyle="otp-input"
                                            containerStyle="otp-container"

                                        />
                                        <Button type="primary" style={{ backgroundColor: '#D483AF' }} htmlType="submit" className="submit-otp-btn">
                                            Submit OTP
                                        </Button>
                                    </Form.Item>
                                )}
                            </Form>
                        </div>
                    </div>


                </CSSTransition>
                <CSSTransition
                    in={!showOtpForm}
                    timeout={500}
                    classNames="slide"
                    unmountOnExit
                >
                    <Register />
                </CSSTransition>
            </div>
        </>
    );
};

export default OtpRegistration;
