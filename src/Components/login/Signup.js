import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signup.css";
import KarmikImage from '../../images/LogoContainer.png';
import SignUpImage from '../../images/SignUp.png'

const Signup = ({ setLoggedIn }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const nextStep = () => {
        setStep(step + 1);
    };

    const handleFirstFormSubmit = (event) => {
        event.preventDefault();
        // Add validation or API calls here if necessary
        setEmailError('');

        if (!email) {
            setEmailError('Please enter your email');
            console.log(emailError);
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            console.log(emailError);
            return;
        }

        nextStep(); // Move to the next step
    };

    const handleSecondFormSubmit = async (event) => {
        event.preventDefault();
        // Implement your signup or registration logic here
        console.log({ email, firstName, lastName, phone, password });
        setPasswordError('');

        if (!password) {
            setPasswordError('Please enter a password');
            console.log(passwordError);
            return;
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer');
            console.log(passwordError);
            return;
        }
        // Redirect or perform additional actions after registration
        // Implement the API request logic as per your backend
        try {
            const apiURL = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/api/auth/signup/`;
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    country_code: "+91",
                    phone_number: phone
                })
            });
            const data = await response.json();
        
            if (response.status === 201) {
                //navigate('/'); //Adjust the route as needed
                alert("User Registered successfully");

            } else {
                // It's better to check for errorData before trying to parse it again
                console.error('Signup failed:', data.message || "An error occurred during signup.");
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
        
    };  

    return (
        <div className="mainContainer">
            <div className="imageContainer">
                <img src={SignUpImage} alt="Login Visual"/>
            </div>
            <div className="loginContainer">
                <img src={KarmikImage} className="karmik-logo" alt="Karmik Visual"/>
                <h1>Welcome to Karmik Enterprise</h1>
                <div className="signupContainer">
                    {step === 1 && (
                        <form onSubmit={handleFirstFormSubmit}>
                        <p>Enter your email and name to continue</p>
                        <br />
                        <label htmlFor="email">Email address <span className="required">*</span></label>
                        <input
                            className='inputField'
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            required
                        />
                        <label className="errorLabel">{emailError}</label>
                        <br />
                        <div className="row">
                            <div className="col">
                                <label htmlFor="firstName">First Name <span className="required">*</span></label>
                                <input
                                    className='inputField'
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First name"
                                    required
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="lastName">Last Name <span className="required">*</span></label>
                                <input
                                    className='inputField'
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last name"
                                    required
                                />
                            </div>
                        </div> 
                        <br />
                        <button type="submit" className="inputButton">Next</button>
                    </form>
                    
                    )}
                    {step === 2 && (
                        <form onSubmit={handleSecondFormSubmit}>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        className='inputField'
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone number"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="password">Password <span className="required">*</span></label>
                                    <input
                                        className='inputField'
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                            </div>
                            <br />
                            <button type="submit" className="inputButton">Sign Up</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signup;
