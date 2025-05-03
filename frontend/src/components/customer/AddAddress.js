import Sidebar from './Sidebar';
import axios from 'axios';
import { useState ,useEffect } from 'react';
function AddAddress(){
    const baseUrl='http://127.0.0.1:8000/api';
    const [ErrorMsg,setErrorMsg]=useState('');
    const [SuccessMsg,setSuccessMsg]=useState('');
    var customer_id=localStorage.getItem('customer_id');
    const [AddressFormData,setAddressFormData]=useState({
        'address':'',
        'customer':customer_id,
    });
    const inputHandler = (event) => {
        setAddressFormData({
            ...AddressFormData,
            [event.target.name]: event.target.value
        });
    };
    console.log(AddressFormData);

    const submitHandler = () => {
    
        const formData = new FormData();

        formData.append('address', AddressFormData.address);
        formData.append('customer', AddressFormData.customer);
        axios.post(baseUrl + '/address/', formData, {
        })
        .then(function(response) {
            // console.log(response.status);
            if(response.status!==201){
                setSuccessMsg('');
                setErrorMsg('Data Not Save');
            }else{
                setErrorMsg('');
                setSuccessMsg('Data Saved');
                setAddressFormData({
                    'address':'',
                });
            }
        })
        .catch(function(error) {
            if (error.response) {
                setErrorMsg('Data Not Saved');
            } else {
                // For network or unknown errors
                setErrorMsg('Something went wrong!');
            }
            setSuccessMsg('');
            console.error(error);
        });
    };
    
    const disabledBtn=(AddressFormData.address==='');
    return(

        <div className="container mt-4">
        <div className="row ">
            <div className="col-md-3 col-12 mb-2">
                <Sidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
                    <div className='card'>
                        <h4 className='card-header'>Add Address</h4>
                        <div className='card-body'>
                                <form> 
                                        {ErrorMsg &&<p className="text-danger">{ErrorMsg}</p>
                                        }
                                        {SuccessMsg &&  <p className="text-success">{SuccessMsg}</p>

                                        }                       
                                        <div className="mb-3">
                                            <label for="address" className="form-label">Address</label>
                                            <textarea  className="form-control" name='address' onChange={inputHandler} value={AddressFormData.address} id='address'></textarea>
                                        </div>
                                            <button  type="button" disabled={disabledBtn} onClick={submitHandler} className="btn btn-primary">Submit</button>
                                </form>
                        </div>
                    </div>
            </div>
            
        </div>
    </div>

    )
}
export default AddAddress;