import Sidebar from './Sidebar';
//Packages
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

function AddressList(){
    const baseUrl='http://127.0.0.1:8000/api';
    var customer_id=localStorage.getItem('customer_id');
    const [AddressList, setAddressList] = useState([]);

    useEffect(() => {
        fetchData(baseUrl+'/customer/'+customer_id+'/address-list/');
    },[customer_id]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setAddressList(data.results);
        });
    }
    // console.log(AddressList);

    function DefaultAddressHandler(address_id){
        const formData = new FormData();
        formData.append('address_id', address_id);
        axios.post(baseUrl + '/mark-default-address/'+address_id+'/', formData, {
        })
        .then(function(response) {
            // console.log(response.status);
            if(response.data.bool===true){
                window.location.reload();
            }else{
            }
        })
        .catch(function(error) {
            console.error(error);
        });
    }
    function deleteAddress(address_id){
        const formData = new FormData();
        formData.append('address_id', address_id);
        // console.log('form:', formData.data);
    
        // Submit wishlist data to the backend
        axios.post(baseUrl + '/delete-address/'+address_id+'/', formData)
            .then(function (response) {
                // console.log(response);
                if(response.data.bool===true){
                    window.location.reload();
                    alert('Deleted');
                    document.getElementById('row'+address_id).remove();
                }
            })
            .catch(function (error) {
                console.log('Error during deleting address confirmation:', error);
            });
    }
    return(
        <div className="container mt-4">
        <div className="row ">
            <div className="col-md-3 col-12 mb-2">
                <Sidebar/>
            </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className='row'>
                        <div className='col-12'>
                            <Link to='/customer/add-address' className='btn btn-outline-success mb-4 float-end '><i className='fa fa-plus-circle'></i>Add Address</Link>
                        </div>
                    </div>
                    <div className='row'>
                    {AddressList.map((address,index)=>{
                        return(
                                <div className='col-4 mb-4'>
                                    <div className='card '>
                                        <div className='card-body text-muted  '>
                                            <h6>
                                                {address.default_address===true && <><span  className='badge bg-success mb-2 '><i className='fa fa-check-circle'></i></span><br/></>}
                                                {!address.default_address && 
                                                <>
                                                    <span onClick={()=>DefaultAddressHandler(address.id)} role='button'  className='badge bg-secondary mb-2 '>Mark Default</span>
                                                    <span className='image-box d-inline  p-3 my-2'  onClick={()=>deleteAddress(address.id)}><i className='fa fa-trash text-danger'style={styles.deleteBtn} role='button'></i></span>
                                                    <br/>
                                                </>
                                                }
                                                <Link to={`/customer/update-address/${address.id}`}><label>{address.address}</label></Link>
                                            </h6>
                                        </div>
                                    </div>
                                </div> 
                        )

                    })}                     

                    </div>
                </div>      
        </div>
    </div>

    )
}
const styles={
    'deleteBtn':{
        'position':'absolute',

    }
};

export default AddressList;