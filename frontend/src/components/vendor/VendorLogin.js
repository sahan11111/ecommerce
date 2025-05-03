import { useState } from "react";
import axios from "axios";
function VendorLogin(props){
    const baseUrl='http://127.0.0.1:8000/api';
    const [formError, setformError]=useState(false);
    const [errorMsg, seterrorMsg]=useState('');
    const [loginFormData, setloginFormData] = useState(
        {
            'username':'',
            'password':'',
        }
    );
    const inputHandler = (event) => {
        setloginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value
        });
    };
    const submitHandler = (event) => {
        event.preventDefault(); // Prevent form reload
    
        const formData = new FormData();
        formData.append('username', loginFormData.username);
        formData.append('password', loginFormData.password);
    
        // Submit data
        axios.post(baseUrl + '/vendor/login/', formData)
            .then(function(response) {
                if (response.data.bool===false){
                    setformError(true);
                    seterrorMsg(response.data.msg)
                }
                else{
                    console.log(response.data);
                    localStorage.setItem('vendor_id',response.data.id)
                    localStorage.setItem('vendor_login',true)
                    localStorage.setItem('vendor_username',response.data.user)
                    setformError(false);
                    seterrorMsg('')    
                }
                console.log('Login Success:', response.data);
            })
            .catch(function(error) {
                console.error('Login Error:', error);
            });
    };
    const checkVendor = localStorage.getItem('vendor_login');
    if (checkVendor) {
        window.location.href = '/vendor/dashboard';
    }
    
    
    const buttonEnable=(loginFormData.username !=='')&&(loginFormData.password !=='')
    // console.log('loginFormData :',loginFormData)
    return(
        <div className="container mt-4">
            <div className="row ">
                <div className='col-md-8 col-12 offset-2'>
                    <div className='card'>
                        <h4 className='card-header'>Login</h4>
                        <div className='card-body'>
                        <form>                            
                            {formError &&
                            <p className="text-danger">{errorMsg}</p>
                            }
                            <div className="mb-3">
                                <label for="username"  className="form-label">Username</label>
                                <input type="text" name='username' value={loginFormData.username} onChange={inputHandler} className="form-control" id='username'/>
                            </div>                       
                            <div className="mb-3">
                                <label for="pwd" className="form-label">Password</label>
                                <input type="password" name="password" value={loginFormData.password} onChange={inputHandler} className="form-control" id='pwd'/>
                            </div>
                                <button type="button" disabled={!buttonEnable} onClick={submitHandler} className="btn btn-primary">Submit</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VendorLogin;