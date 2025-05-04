import VendorSidebar from './VendorSidebar';
//Packages
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api';
function VendorProducts(props){
    const vendor_id = localStorage.getItem('vendor_id');
    const [ProductData,setProductData]=useState([]);

    useEffect(() => {
        fetchData(baseUrl+'/products/');
    },[]);
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data);
            setProductData(data.results);
        });
    }
    function showConfirm(product_id) {
        var _confirm = window.confirm('Are you sure to delete this product?');
        if (_confirm === true) {
            fetch(baseUrl + '/product/' + product_id + '/', {
                method: 'DELETE'
            })
            .then((response) => {
                if (response.status === 204) {
                    window.location.href = 'http://localhost:3000/vendor/products';
                } else {
                    alert('Failed to delete product.');
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
                        <div className='col-12'>
                            <Link to='/vendor/add-product' className='btn btn-outline-success mb-4 float-end '><i className='fa fa-plus-circle'></i>Add Product</Link>
                        </div>
                    </div>
                    <div className='table-responsive'>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Product Id</th>
                                    <th>Product</th>
                                    <th>NRP Price</th>
                                    <th>USD Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ProductData.map((product,index)=>
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>
                                            <Link to={`/vendor/update-product/${product.id}`}><img  src={product.image} className="img-thumbnail" width={80} alt="..."/></Link>
                                            <Link className='text-dark'to={`/vendor/update-product/${product.id}`}><label>{product.title}</label></Link>
                                            </td>
                                            <td>Rs. {product.price}</td>
                                            <td>$. {product.usd_price}</td>
                                            <td>
                                                {!product.published_status &&
                                                <>
                                                <i className='fa fa-spinner fa-spin text-danger'></i>
                                                <span className='text-danger'>
                                                Pending</span>
                                                </>
                                                }
                                                {product.published_status &&
                                                <>
                                                <i className='fa fa-check-circle text-success'></i>
                                                <span className='text-success'>
                                                Published</span>
                                                </>
                                                }    
                                            </td>
                                            {/* <td><button className="btn btn-primary btn-sm">Download</button></td> */}
                                            <td>
                                                <Link to={`/vendor/update-product/${product.id}`} className='btn btn-warning ms-1'>Edit</Link>
                                                <Link to={`/vendor/delete-product/${product.id}`}  onClick={()=>showConfirm(product.id)} className='btn btn-danger ms-1'>Delete</Link>
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default VendorProducts;