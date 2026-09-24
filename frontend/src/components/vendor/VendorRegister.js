import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function VendorRegister(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const navigate = useNavigate();

    const [errorMsg, seterrorMsg] = useState('');
    const [successMsg, setsuccessMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [usedPasswords, setUsedPasswords] = useState([]); // frontend simulation

    const initialFormState = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        mobile: '',
        address: '',
        password: '',
    };

    const [registerFormData, setregisterFormData] = useState(initialFormState);

    const inputHandler = (event) => {
        seterrorMsg('');
        setregisterFormData({
            ...registerFormData,
            [event.target.name]: event.target.value
        });
    };

    const validateForm = () => {
        const { email, mobile, password } = registerFormData;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^\d{10}$/;

        if (!emailRegex.test(email)) {
            seterrorMsg("Please enter a valid email address.");
            return false;
        }

        if (!mobileRegex.test(mobile)) {
            seterrorMsg("Mobile number must be exactly 10 digits.");
            return false;
        }

        if (usedPasswords.includes(password)) {
            seterrorMsg("Password must be unique. Try a different one.");
            return false;
        }

        return true;
    };

    const submitHandler = (event) => {
        event.preventDefault(); // Prevent form reload

        if (!validateForm()) return;

        setIsSubmitting(true);

        const formData = new FormData();
        Object.entries(registerFormData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        axios.post(baseUrl + '/vendor/register/', formData)
            .then(function (response) {
                if (response.data.bool === false) {
                    seterrorMsg(response.data.msg);
                    setsuccessMsg('');
                } else {
                    setUsedPasswords([...usedPasswords, registerFormData.password]);
                    setregisterFormData(initialFormState);
                    seterrorMsg('');
                    setsuccessMsg(response.data.msg);
                    navigate('/vendor/login');
                }
            })
            .catch(function (error) {
                console.error('Register Error:', error);
                seterrorMsg("An unexpected error occurred. Please try again.");
                setsuccessMsg('');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const buttonEnable = Object.values(registerFormData).every(val => val.trim() !== '');

    return (
        <div className="container mt-4">
            <div className='col-md-8 col-12 offset-2'>
                <div className='card'>
                    <h4 className='card-header'>Register</h4>
                    <div className='card-body'>
                        <form>
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            {successMsg && <p className="text-success">{successMsg}</p>}

                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" name="first_name" value={registerFormData.first_name} onChange={inputHandler} className="form-control" id='firstName' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" name="last_name" value={registerFormData.last_name} onChange={inputHandler} className="form-control" id='lastName' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" name="username" value={registerFormData.username} onChange={inputHandler} className="form-control" id='username' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name="email" value={registerFormData.email} onChange={inputHandler} className="form-control" id='email' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className="form-label">Mobile</label>
                                <input type="number" name="mobile" maxLength="10" value={registerFormData.mobile} onChange={inputHandler} className="form-control" id='mobile' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea name="address" value={registerFormData.address} onChange={inputHandler} className="form-control" id='address'></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" value={registerFormData.password} onChange={inputHandler} className="form-control" id='password' />
                            </div>
                            <button type="button" disabled={!buttonEnable || isSubmitting} onClick={submitHandler} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorRegister;
