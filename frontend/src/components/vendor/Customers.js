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
    function showConfirm(customer_id, order_id) {
        var _confirm = window.confirm('Are you sure to delete this order?');
        if (_confirm === true) {
            fetch(baseUrl + '/delete-customer-order/' + customer_id + '/' + order_id + '/', {
                method: 'DELETE',
            })
            .then((response) => response.json()) // Ensure we parse the response as JSON
            .then((data) => {
                if (data.bool === true) {
                    // Fetch the updated customer order list after deletion
                    fetchData(baseUrl+'/vendor/'+vendor_id+'/customer/'+customer_id+'/orderitems/');
                } else {
                    alert('Failed to delete the order.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred.');
            });
        }
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
                                    <th>Order Id</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            {CustomerList.map((item, index) => (
                                <tr >
                                    <td>{item.order.customer.id}</td>
                                    <td>{item.order.customer.user.first_name} {item.order.customer.user.last_name}</td>
                                    <td>{item.order.customer.user.email}</td>
                                    <td>{item.order.customer.mobile}</td>
                                    <td>{item.order.id}</td>
                                    <td>
                                        <Link to={`/customer/${item.order.customer.id}/orderitems/`} className='btn btn-primary btn-sm'>Orders</Link>
                                        {/* <button onClick={()=>showConfirm(item.order.customer.id,item.order.id)} className='btn btn-danger btn-sm ms-2'>Remove from list</button> */}
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