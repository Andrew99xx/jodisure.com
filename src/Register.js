import React, { useEffect, useState } from 'react'
import './Register.css'
import CustomUpload from './ImageUpload'
import { Form, Input, Select, Switch, DatePicker, Button, notification } from 'antd';
// import 'antd/dist/antd.css';
// import  './antd.css'
const { Option } = Select;
import Autocomplete from 'react-google-autocomplete';
import { autoGenPreferences, genUUID, getPreferenceAndAbout, getReligions, updateProfile, uploadDisplayPic } from './services/Auth.service';
import { auth } from './firebase-config';
import moment from 'moment/moment';
import { TimePicker } from 'antd';


const Register = () => {
    const [form] = Form.useForm();
    const [isTotalPrivacyEnabled, setTotalPrivacy] = useState(false);
    const [isPhotoVisibilityEnabled, setPhotoVisibility] = useState(false);
    const [religions, setReligions] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [complexion, setComplexion] = useState()
    const [complexions, setComplexions] = useState([])


    useEffect(() => {
        async function fetchReligionsAndComplexion() {
            const { complexion } = await getPreferenceAndAbout()
            console.log("preference_and_about", complexion);
            setComplexions(complexion)

            const religionOptions = await getReligions();
            console.log("religionOptions", religionOptions);
            setReligions(religionOptions);
        }
        fetchReligionsAndComplexion();
    }, []);
    const handleFileListChange = (fileList) => {
        setFiles(fileList)
        console.log('Updated file list:', fileList);
    };

    const handleSubmit = async (values) => {
        if (files.length === 0) {
            alert('Please upload a photo.');
            return;
        }

        setLoading(true);

        try {
            // Assuming only one photo is uploaded
            try {

                const file = files[0].originFileObj;
                const filename = file.name;

                // Upload the photo and get the download URL
                const photoUrl = await uploadDisplayPic(auth.currentUser?.uid, filename, file);
            } catch (e) {
                console.error(e)
            }

            // Combine form values with the photo URL and privacy settings
            if (!values.profile_created_by) {
                notification.error({
                    message: 'Error',
                    description: 'Who created Field is required',
                });
                return;
            }

            if (!values.gender) {
                console.log(values.gender);
                notification.error({
                    message: 'Error',
                    description: 'Gender is required',
                });
                return;
            }
            if (!values.religion) {
                notification.error({
                    message: 'Error',
                    description: 'Religion is required',
                });
                return;
            }
            if (!values.city) {
                notification.error({
                    message: 'Error',
                    description: 'City is required',
                });
                return;
            }

            if (!values.marital_status) {
                notification.error({
                    message: 'Error',
                    description: 'Marital Status is required',
                });
                return;
            }

            if (!values.height) {
                notification.error({
                    message: 'Error',
                    description: 'Height is required',
                });
                return;
            }

            if (!values.religion) {
                notification.error({
                    message: 'Error',
                    description: 'Religion is required',
                });
                return;
            }
            if (!values.contact_email) {
                notification.error({
                    message: 'Error',
                    description: 'Contact email is required',
                });
                return;
            }
            if (!values.contact_name) {
                notification.error({
                    message: 'Error',
                    description: 'Contact name is required',
                });
                return;
            }
            if (!values.contact_no) {
                notification.error({
                    message: 'Error',
                    description: 'Contact no. is required',
                });
                return;
            }
            const selectedTime = values.time ? values.time.format('h:mm A') : null;
            const combinedValues = {
                ...values,
                isTotalPrivacyEnabled: isTotalPrivacyEnabled,
                isPhotoVisibilityEnabled: isPhotoVisibilityEnabled,
                isReligionInfoCompleted: true,
                birth_time: selectedTime,
                isDpCompleted: true,
                dob: moment(values.date).format('DD/MM/YYYY'),
                onboarded: true,
                status: 'pending',
                // photoUrl, // Adding the uploaded photo URL to the values
            };
            const filteredCombinedValues = Object.fromEntries(
                Object.entries(combinedValues).filter(([_, v]) => v !== undefined)
            );

            console.log('Selected time:', selectedTime);
            console.log('Form values:', filteredCombinedValues, auth.currentUser?.uid,);
            await updateProfile(filteredCombinedValues, auth.currentUser?.uid)
            await genUUID(auth.currentUser?.uid)
            console.log(await autoGenPreferences(auth.currentUser?.uid));

            // Here you would typically call another function to save `combinedValues` to Firestore or perform other actions.

            notification.success({
                message: 'Success',
                description: 'Profile Created Successfully',
            });
            setTimeout(() => {
                // window.location.href = 'https://play.google.com/store/apps/details?id=com.jodisure.app&invitedBy=HG20EI';
            }, 1000);
        } catch (error) {
            console.error('Error uploading photo or submitting form:', error);
            alert('Failed to submit form. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const handleTotalPrivacyChange = (checked) => {
        setTotalPrivacy(checked);
        if (checked) {
            setPhotoVisibility(false); // Turn off photo visibility when total privacy is on
        }
    };

    const handlePlaceSelected = (place) => {
        console.log('Selected place:', place);
        if (place.address_components) {
            const city = place.address_components.find(component =>
                component.types.includes('locality')
            );
            form.setFieldsValue({ city: city ? city.long_name : '' });
        }
    };

    const handlePhotoVisibilityChange = (checked) => {
        if (!isTotalPrivacyEnabled) {
            setPhotoVisibility(checked);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="containerRegister"
        >
            <div className="left-section">

                <Form.Item required label="First Name" name="first_name">
                    <Input required placeholder="First Name" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>

                <Form.Item required label="Last Name" name="last_name">
                    <Input required placeholder="Last Name" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>

                <Form.Item required label="Relation with profile" name="profile_created_by">
                    <Select placeholder="Select Relation" style={{ backgroundColor: '#d0e6ed' }} defaultValue={"self"} >
                        <Option value="self">Self</Option>
                        <Option value="family">Family</Option>
                        <Option value="relative">Relative</Option>
                        <Option value="friend">Friend</Option>
                        <Option value="others">Others</Option>
                    </Select>
                </Form.Item>



                <Form.Item required label="City" name="city">
                    <Autocomplete
                        apiKey="AIzaSyD39qDSSJ8WcS5nY0DKxhcAv25N0Pn97vo"
                        style={{ width: '100%', backgroundColor: '#d0e6ed', borderColor: '#d9d9d9', borderWidth: '1px', borderRadius: 4 }}
                        onPlaceSelected={handlePlaceSelected}
                        types={['(cities)']}
                        placeholder="Enter your city"
                        className="ant-input"
                    />
                </Form.Item>

                <Form.Item required label="Gender" name="gender" >
                    <Select placeholder="Select Gender" style={{ backgroundColor: '#d0e6ed' }}>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>
                </Form.Item>

                <Form.Item required label="Height" name="height">
                    <Select placeholder="Select Height" style={{ backgroundColor: '#d0e6ed' }}>
                        {Array.from({ length: 61 }, (_, i) => {
                            const feet = Math.floor(i / 12) + 3;
                            const inches = i % 12;
                            const height = `${feet}.${inches < 10 ? `0${inches}` : inches}`;
                            return (
                                <Option key={height} value={height}>
                                    {height}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Complexion" required name="complexion">
                    <Select placeholder="Select Complexion" showSearch={true} style={{ backgroundColor: '#d0e6ed' }}>
                        {complexions.map(complexion => (
                            <Option key={complexion} value={complexion}>
                                {complexion}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Religion" required name="religion">
                    <Select placeholder="Select Religion" showSearch={true} style={{ backgroundColor: '#d0e6ed' }}>
                        {religions.map(religion => (
                            <Option key={religion} value={religion.name} >
                                {religion.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item required label="Gotra" name="gotra">
                    <Input required placeholder="Gotra" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>
                <Form.Item required label="Marital Status" name="marital_status" >
                    <Select placeholder="Select Marital Status" style={{ backgroundColor: '#d0e6ed' }} defaultValue={"never_married"}>
                        <Option value="never_married">Never Married</Option>
                        <Option value="awaiting_divorce">Awaiting Divorce</Option>
                        <Option value="divorced">Divorced</Option>
                        <Option value="widowed">Widowed</Option>
                        <Option value="annulled">Annulled</Option>
                    </Select>
                </Form.Item>

                <Form.Item required label="Date of Birth" name="dob" >
                    <DatePicker required style={{ width: '100%' }} className='custom-date-picker' />
                </Form.Item>

                <Form.Item required label="Birth Place" name="place_of_birth">
                    <Input required placeholder="Birth Place" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>

                <Form.Item
                    required
                    label="Select Time"
                    name="time"
                    rules={[{ required: true, message: 'Please select a time' }]} // Validation rule
                >
                    <TimePicker
                        use12Hours // Enables 12-hour format with AM/PM
                        format="h:mm A" // 12-hour format with AM/PM
                        style={{ width: '100%', backgroundColor: '#d0e6ed' }}
                        placeholder="Select Time"
                    // defaultValue={moment('12:00 PM', 'h:mm A')}
                    />
                </Form.Item>

                <Form.Item required label="Profession" name="profession">
                    <Input required placeholder="Profession" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>

                <Form.Item required label="Company Name" name="company_name">
                    <Input required placeholder="Company/ Business Name" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>



                <Form.Item required label="Highest Qualification" name="carrer_info">
                    <Input required placeholder="Highest Qualification" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>

                <div className="toggle-group">
                    <Form.Item label="Total Privacy- Fully conceal your information in this app" name="isTotalPrivacyEnabled" valuePropName="checked">
                        <Switch checked={isTotalPrivacyEnabled} onChange={handleTotalPrivacyChange} />
                    </Form.Item>

                    <Form.Item label="Photo Visibility - Unveil your photo" name="isPhotoVisibilityEnabled" valuePropName="photoVisibility">
                        <Switch
                            checked={isPhotoVisibilityEnabled}
                            onChange={handlePhotoVisibilityChange}
                            disabled={isTotalPrivacyEnabled}
                        />
                    </Form.Item>
                </div>


                <Form.Item label="Eating Habit" name="eating_habits" >
                    <Select placeholder="Select Eating Habit" style={{ backgroundColor: '#d0e6ed' }}>
                        <Option value="Jain Vegetarian">Jain Vegetarian</Option>
                        <Option value="Vegan">Vegan</Option>
                        <Option value="Vegetarian">Vegetarian</Option>
                        <Option value="Non Vegetarian">Non Vegetarian</Option>
                        <Option value="Ovo Vegetarian">Ovo Vegetarian</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Weight" name="weight">
                    <Input type="number" placeholder="Weight" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>

                <Form.Item label="Post Marriage Plan" name="post_marriage_plan">
                    <Input placeholder="Post Marriage Plan" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>



                <Form.Item label="University Name" name="university">
                    <Input placeholder="University Name" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>

                <Form.Item label="Hobbies and Interest" name="hobbies">
                    <Input placeholder="Hobbies and Interest" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>

                <Form.Item label="Health Issues(if any)" name="health_issue">
                    <Input placeholder="Health Issues" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>

                <Form.Item label="Number of Siblings" name="sibling_count">
                    <Input type="number" placeholder="Number of Siblings" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>

                <Form.Item label="Mother Tongue" name="personal_info_language">
                    <Input placeholder="Mother Tongue" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>


            </div>

            <div className="right-section">
                <Form.Item required>
                    <CustomUpload

                        initialFileList={[]}
                        maxFiles={3}
                        actionUrl="https://example.com/upload"
                        onFileListChange={handleFileListChange}
                        rotationSlider={false}

                    />
                </Form.Item>
                <Form.Item required label="Father's Name" name="contact_name">
                    <Input required placeholder="Father's name" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>
                <Form.Item required label="Father's Occupation" name="father occupation">
                    <Input required placeholder="Father's Occupation" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>
                <Form.Item required label="Mother's Name" name="contact_email">
                    <Input required placeholder="Mother's Name" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>

                <Form.Item required label="Contact Number" name="contact_no" >
                    <Input type="tel" placeholder="Contact Number" style={{ backgroundColor: '#d0e6ed' }} />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={loading} style={{ width: '100%', backgroundColor: "#05626E" }}>
                        {loading ? 'Submitting' : "Submit"}
                    </Button>
                </Form.Item>
            </div>
        </Form>
    )
}

export default Register