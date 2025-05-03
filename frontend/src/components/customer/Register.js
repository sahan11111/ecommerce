import { useState } from "react";
import axios from "axios";
function Register(props){
    const baseUrl='http://127.0.0.1:8000/api';
    // const [formError, setformError]=useState(false);
    const [errorMsg, seterrorMsg]=useState('');
    const [successMsg, setsuccessMsg]=useState('');
    const [registerFormData, setregisterFormData] = useState(
        {
            'first_name':'',
            'last_name':'',
            'username':'',
            'email':'',
            'mobile':'',
            'password':'',

        }
    );
    const inputHandler = (event) => {
        setregisterFormData({
            ...registerFormData,
            [event.target.name]: event.target.value
        });
    };
    const submitHandler = (event) => {
        event.preventDefault(); // Prevent form reload
    
        const formData = new FormData();
        formData.append('first_name', registerFormData.first_name);
        formData.append('last_name', registerFormData.last_name);
        formData.append('username', registerFormData.username);
        formData.append('email', registerFormData.email);
        formData.append('mobile', registerFormData.mobile);
        formData.append('password', registerFormData.password);
    
        // Submit data
        axios.post(baseUrl + '/customer/register/', formData)
            .then(function(response) {
                if (response.data.bool===false){
                    seterrorMsg(response.data.msg)
                    setsuccessMsg('');
                }
                else{
                    setregisterFormData(
                        {
                            'first_name':'',
                            'last_name':'',
                            'username':'',
                            'email':'',
                            'mobile':'',
                            'password':'',
                
                        });
                    console.log(response.data);
                    seterrorMsg("");
                    setsuccessMsg(response.data.msg) ;   
                }
                
            })
            .catch(function(error) {
                console.error('Login Error:', error);
            });
    };

    const buttonEnable=(registerFormData.first_name !=='')&&(registerFormData.last_name !=='')&&(registerFormData.username !=='')&&(registerFormData.password !=='')&&(registerFormData.email !=='')&&(registerFormData.mobile !=='')
    return(
        <div className="container mt-4">
            <div className='col-md-8 col-12 offset-2'>
                <div className='card'>
                    <h4 className='card-header'>Register</h4>
                    <div className='card-body'>
                    <form>
                        {errorMsg &&
                            <p className="text-danger">{errorMsg}</p>
                        }
                        {successMsg &&  <p className="text-success">{successMsg}</p>

                        }
                        <div className="mb-3">
                            <label for="firstName" className="form-label">First Name</label>
                            <input type="text" name="first_name" value={registerFormData.first_name} onChange={inputHandler} className="form-control" id='firstName'/>
                        </div>
                        <div className="mb-3">
                            <label for="lastName" className="form-label">Last Name</label>
                            <input type="text" name="last_name" value={registerFormData.last_name} onChange={inputHandler} className="form-control" id='lastName'/>
                        </div>
                        <div className="mb-3">
                            <label for="username" className="form-label">Username</label>
                            <input type="text" name="username" value={registerFormData.username} onChange={inputHandler} className="form-control" id='username'/>
                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" name="email" value={registerFormData.email} onChange={inputHandler} className="form-control" id='email'/>
                        </div>                        
                        <div className="mb-3">
                            <label for="mobile" className="form-label">Mobile</label>
                            <input type="number" name="mobile" maxLength="10" value={registerFormData.mobile} onChange={inputHandler} className="form-control" id='mobile'/>
                        </div>                          
                        <div className="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" name="password" value={registerFormData.password} onChange={inputHandler} className="form-control" id='password'/>
                        </div>
                            <button type="button" disabled={!buttonEnable} onClick={submitHandler} className="btn btn-primary">Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;