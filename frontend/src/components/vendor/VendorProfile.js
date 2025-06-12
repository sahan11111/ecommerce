import VendorSidebar from './VendorSidebar';
import axios from 'axios';
import { useState,useEffect } from 'react';

function VendorProfile(){
    const baseUrl='http://127.0.0.1:8000/api';
    const [ProfileData,setProfileData]=useState({
        'user_id':'',
        'first_name':'',
        'last_name':'',
        'username':'',
        'email':'',
        'address':'',
        'mobile':'',
        'profile_img':'',
    });

    var vendor_id=localStorage.getItem('vendor_id');
    console.log(vendor_id);
    useEffect(() => {
        fetchData(`${baseUrl}/vendor/${vendor_id}/`);
    }, [vendor_id]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setProfileData({
                'user_id':data.user.id,
                'first_name':data.user.first_name,
                'last_name':data.user.last_name,
                'username':data.user.username,
                'email':data.user.email,
                'address':data.address,
                'mobile':data.mobile,
                'profile_img':data.profile_img,
            });
        });
    }
    const inputHandler = (event) => {
        setProfileData({
            ...ProfileData,
            [event.target.name]: event.target.value
        });
    };
    const handelFileChange = (event) => {
        setProfileData({
            ...ProfileData,
            [event.target.name]: event.target.files[0]
        });
    };
    const submitHandler = (event) => {
        // event.preventDefault(); // Prevent form reload
        
        
        const formData = new FormData();
        formData.append('user', ProfileData.user_id);
        formData.append('address', ProfileData.address);
        formData.append('mobile', ProfileData.mobile);
        formData.append('profile_img', ProfileData.profile_img);
        
        // Submit data
        axios.put(baseUrl + '/vendor/'+vendor_id+'/', formData,{
            
            headers:{
                'content-type':'multipart/form-data'
            }
        }).then(function(response) {
            console.log(response);   
            window.location.reload();
        })
        .catch(function(error) {
            console.error('Login Error:', error);
        });
        
        const formUserData = new FormData();
        formUserData.append('first_name', ProfileData.first_name);
        formUserData.append('last_name', ProfileData.last_name);
        formUserData.append('username', ProfileData.username);
        formUserData.append('email', ProfileData.email);

        axios.put(baseUrl + '/user/'+ProfileData.user_id+'/', formUserData,{
        }).then(function(response) {
                console.log(response);   
            })
            .catch(function(error) {
                console.error('Login Error:', error);
            });
    };

    return(
        <div className="container mt-4">
        <div className="row ">
            <div className="col-md-3 col-12 mb-2">
                <VendorSidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
                <h3 className='mb-3'>Welcome <span className='text-primary '>{ProfileData.username}</span></h3>
                    <div className='card'>
                        <h4 className='card-header'>Update Profile</h4>
                        <div className='card-body'>
                        <form>                        
                                <div className="mb-3">
                                    <label for="firstName" className="form-label">First Name</label>
                                    <input type="text" name='first_name' onChange={inputHandler} value={ProfileData.first_name} className="form-control" id='firstName'/>
                                </div>
                                <div className="mb-3">
                                    <label for="lastName" className="form-label">Last Name</label>
                                    <input type="text" name='last_name' onChange={inputHandler} value={ProfileData.last_name} className="form-control" id='lastName'/>
                                </div>
                                <div className="mb-3">
                                    <label for="username" className="form-label">Username</label>
                                    <input type="text" name='username' onChange={inputHandler} value={ProfileData.username} className="form-control" id='username'/>
                                </div>                       
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" name='email' onChange={inputHandler} value={ProfileData.email} className="form-control" id='email'/>
                                </div>
                                <div className="mb-3">
                                    <label for="address" className="form-label">Address</label>
                                    <input type="text" name='address' onChange={inputHandler} value={ProfileData.address} className="form-control" id='address'/>
                                </div>                                
                                <div className="mb-3">
                                    <label for="mobile" className="form-label">Mobile</label>
                                    <input type="number" name='mobile' onChange={inputHandler} value={ProfileData.mobile} className="form-control" id='mobile'/>
                                </div>
                                <div className="mb-3">
                                <p>
                                    <img src={ProfileData.profile_img} width={100} className='mt-2 rounded' />
                                </p>
                                <label for="profileImg" className="form-label">Profile Image</label>
                                <input type="file"  name='profile_img' onChange={handelFileChange}  className="form-control" id='profileImg' accept="image/*"/>
                                </div>
                                    <button type="button" onClick={submitHandler} className="btn btn-primary">Submit</button>
                        </form>
                        </div>
                    </div>
            </div>     
        </div>
    </div>

    )
}
export default VendorProfile;