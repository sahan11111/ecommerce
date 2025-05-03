import Sidebar from './Sidebar';
import { CurrencyContext } from '../../Context';

//Packages
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState,useEffect,useContext } from 'react';
function Wishlist(){
    const baseUrl='http://127.0.0.1:8000/api';
    const customerId=localStorage.getItem('customer_id');
    const [WishItems, setWishItems] = useState([]);
    const {CurrencyData}=useContext(CurrencyContext);
    
    useEffect(() => {
        fetchData(baseUrl+'/customer/'+customerId+"/wishitems");
    },[customerId]);
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setWishItems(data.results);
        });
    }

    function removeFromWishList(wishlist_id){
        const formData = new FormData();
        formData.append('wishlist_id', wishlist_id);
        // console.log('form:', formData.data);
    
        // Submit wishlist data to the backend
        axios.post(baseUrl + '/remove-from-wishlist/', formData)
            .then(function (response) {
                // console.log(response);
                if(response.data.bool===true){
                    // alert('Deleted');
                    document.getElementById('row'+wishlist_id).remove();
                }
            })
            .catch(function (error) {
                console.log('Error during remove wishlist confirmation:', error);
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
                    <div className='table-responsive'>
                        <table className="table table-striped">
                            <thead className='text-center'>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    WishItems.map((item,index)=>{
                                        console.log('item:',item.product.image);
                                        return(                                  
                                            <tr id={`row${item.id}`}>
                                                <td className='text-center'>{index+1}</td>
                                                <td>
                                                    <Link to={`/product/${item.product.title}/${item.product.id}`}>
                                                    <img
                                                        src={`http://127.0.0.1:8000${item.product.image}`}
                                                        className='img-thumbnail'
                                                        width={80}
                                                        alt={item.product.title}
                                                        />
                                                        </Link>
                                                    <Link className='text-dark' to={`/product/${item.product.title}/${item.product.id}`}><label>{item.product.title}</label></Link>
                                                </td>
                                                { (CurrencyData==='npr'|| CurrencyData===undefined) &&
                                                    <td className='text-center'>Rs. {item.product.price}</td>
                                                }   
                                                { (CurrencyData==='usd') &&
                                                    <td className='text-center'>$ {item.product.usd_price}</td>
                                                }
                                                <td className='text-center'><button onClick={()=>removeFromWishList(item.id)} className="btn btn-danger btn-sm">Remove</button></td>
                                                </tr>
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
export default Wishlist;