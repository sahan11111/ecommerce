import VendorSidebar from './VendorSidebar';
import { useState ,useEffect } from 'react';
//Packages
import { Link } from 'react-router-dom';
function Customers(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id');
    const [CustomerList,setCustomerList]=useState([]);
        useEffect(() => {
            fetchData(baseUrl+'/vendor/'+vendor_id+'/customers/');
        },[]);
        function fetchData(baseurl){
            fetch(baseurl)
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data);
                setCustomerList(data.results);
            });
        }
    return(
        <div className="container mt-4">
        <div className="row ">
            <div className="col-md-3 col-12 mb-2">
                <VendorSidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
                <div className='row'>
                    <div className='table-responsive'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            {CustomerList.map((item, index) => (
                                <tr >
                                    <td>{index + 1}</td>
                                    <td>{item.order.customer.user.first_name} {item.order.customer.user.last_name}</td>
                                    <td>{item.order.customer.user.email}</td>
                                    <td>{item.order.customer.mobile}</td>
                                    <td>
                                        <button className='btn btn-primary btn-sm'>Orders</button>
                                        <button className='btn btn-danger btn-sm ms-2'>Remove from list</button>
                                    </td>
                                </tr>
                            ))}
                            
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    )
}
export default Customers;