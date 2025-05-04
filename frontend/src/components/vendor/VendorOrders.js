import { useState,useEffect,useContext } from 'react';
import { CurrencyContext } from '../../Context';
import VendorSidebar from './VendorSidebar';
//Packages
import { Link } from 'react-router-dom';
function VendorOrders(){
    const baseUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id');
    const {CurrencyData}=useContext(CurrencyContext);
    const [OrderItems,setOrderItems]=useState([]);
        useEffect(() => {
            fetchData(baseUrl+'/vendor/'+vendor_id+'/orderitems/');
        },[]);
        function fetchData(baseurl){
            fetch(baseurl)
            .then((response)=>response.json())
            .then((data)=>{
                // console.log(data);
                setOrderItems(data.results);
            });
        }
            console.log(OrderItems);
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
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { OrderItems.map((item,index)=>
                                            <tr>
                                            <td>{index+1}</td>
                                            <td>
                                            <Link to={`/vendor/update-product/${item.product.id}`}><img  src={item.product.image} className="img-thumbnail" width={80} alt="..."/></Link>
                                            <Link className='text-dark' to={`/vendor/update-product/${item.product.id}`}><label>{item.product.title}</label></Link>
                                            </td>
                                            { (CurrencyData==='npr'|| CurrencyData===undefined) &&
                                                <td className='text-center'>Rs. {item.product.price}</td>
                                            }   
                                            { (CurrencyData==='usd') &&
                                                <td className='text-center'>$ {item.product.usd_price}</td>
                                            }
                                            <td className='text-center'>
                                                <span>
                                                    {
                                                        item.order.order_status===true && <i className='fa fa-check-circle text-success'></i>
                                                    }
                                                    {
                                                        item.order.order_status===false && <i className='fa fa-spinner fa-spin text-dark'></i>
                                                    }
                                                    
                                                </span>
                                            </td>
                                            <td>
                                            <div class="dropdown">
                                                <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Change Status
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Approve</a></li>
                                                    <li><a class="dropdown-item" href="#">Sent</a></li>
                                                    <li><a class="dropdown-item" href="#">Completed</a></li>
                                                </ul>
                                            </div>
                                            </td>
                                        </tr>
                                        )

                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    )
}
export default VendorOrders;