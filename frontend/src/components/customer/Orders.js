import Sidebar from './Sidebar';
import OrderRow from './OrderRow';
import { useState,useEffect } from 'react';
//Packages
function Orders(){
    const baseUrl='http://127.0.0.1:8000/api';
    const customerId=localStorage.getItem('customer_id');
    const [OrderItems, setOrderItems] = useState([]);
    useEffect(() => {
        fetchData(baseUrl+'/customer/'+customerId+"/orderitems");
    },[customerId]);
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setOrderItems(data);
        });
    }
    console.log(OrderItems);

    return(
        <div className="container mt-4">
        <div className="row ">
            <div className="col-md-3 col-12 mb-2">
                <Sidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
                <div className='row'>
                    <div className='table-responsive'>
                        <table className="table table-striped">
                            <thead className='text-center'>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                
                            {OrderItems.results &&
                                OrderItems.results.map((item,index)=>{
                                return(
                                    <OrderRow item={item} key={index} index={index} />
                                )
                                })
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
export default Orders;