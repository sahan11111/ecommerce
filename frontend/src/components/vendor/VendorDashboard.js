import VendorSidebar from './VendorSidebar';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
function VendorDashboard(props){
        const baseUrl='http://127.0.0.1:8000/api';
        var vendor_id=localStorage.getItem('vendor_id');
        const [CountList, setCountList] = useState({
            'totalProducts':0,
            'totalOrders':0,
            'totalCustomers':0,
        });
        useEffect(() => {
            fetchData(baseUrl+'/vendor/dashboard/'+vendor_id+'/');
        },[vendor_id]);
        function fetchData(baseurl){
            fetch(baseurl)
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data.result);
                setCountList({
                    'totalProducts':data.totalProducts,
                    'totalOrders':data.totalOrders,
                    'totalCustomers':data.totalCustomers,
                });
            });
        }
        console.log(CountList);
    return(
        <div className="container mt-4">
            <div className="row ">
                <div className="col-md-3 col-12 mb-2">
                    <VendorSidebar/>
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className='row'>                        
                        <div className='col-md-4  mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Product</h4>
                                    <h4><Link to={`/vendor/products`} style={{ textDecoration: 'none' }}>{CountList.totalProducts}</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4  mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Orders</h4>
                                    <h4><Link to={`/vendor/orders`} style={{ textDecoration: 'none' }}>{CountList.totalOrders}</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4  mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Customer</h4>
                                    <h4><Link to={`/vendor/customers`} style={{ textDecoration: 'none' }}>{CountList.totalCustomers}</Link></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default VendorDashboard;