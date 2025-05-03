import SellerSidebar from './VendorSidebar';
import axios from 'axios';
import { useState,useEffect } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api';
function AddProduct(){
    const [errorMsg, seterrorMsg]=useState('');
    const [successMsg, setsuccessMsg]=useState('');
    const vendor_id = localStorage.getItem('vendor_id');
    const [CategoryData,setCategoryData]=useState([]);
    const [ProductData,setProductData]=useState({
        'category':'',
        'vendor':'',
        'title':'',
        'slug':'',
        'detail':'',
        'price':'',
        'usd_price':'',
        'tags':'',
        'image':'',
        'demo_url':'',
        'product_file':'',
    });

    const [ImgUploadErrorMsg, setImgUploadErrorMsg]=useState('');
    const [ImgUploadSuccessMsg, setImgUploadSuccessMsg]=useState('');
    const [ProductImgs,setProductImgs]=useState([]);

    const inputHandler=(event)=>{
        setProductData({
            ...ProductData,
            [event.target.name]:event.target.value
        });
    };    
    const fileHandler=(event)=>{
        setProductData({
            ...ProductData,
            [event.target.name]:event.target.files[0]
        });   
    };
    const multiplefileHandler=(event)=>{
        var files=event.target.files;
        if(files.length>0){
            setProductImgs(files);
        }
    };
    // console.log(ProductData);

    const submitHandler=(event)=>{
        event.preventDefault(); // Prevent form reload
    
        const formData = new FormData();
        formData.append('category', ProductData.category);
        formData.append('vendor', ProductData.vendor);
        formData.append('title', ProductData.title);
        formData.append('slug', ProductData.slug);
        formData.append('detail', ProductData.detail);
        formData.append('price', ProductData.price);
        formData.append('usd_price', ProductData.usd_price);
        formData.append('tags', ProductData.tags);
        formData.append('image', ProductData.image);
        formData.append('demo_url', ProductData.demo_url);
        formData.append('product_file', ProductData.product_file);
    
        // Submit data
        axios.post(baseUrl + '/products/', formData,{
            headers:{
                'content-type':'multipart/form-data'
            }
        })
            .then(function(response) {
                if (response.status===201){
                    seterrorMsg('');
                    setsuccessMsg(response.statusText);
                    setProductData(
                        {
                            'category':'',
                            'vendor':'',
                            'title':'',
                            'slug':'',
                            'detail':'',
                            'price':'',
                            'usd_price':'',
                            'tags':'',
                            'image':'',
                            'demo_url':'',
                            'product_file':'',
                
                        });

                    for(let i=0;i<ProductImgs.length;i++){
                        const ImageFormData = new FormData();
                        ImageFormData.append('product',response.data.id);
                        ImageFormData.append('image',ProductImgs[i]);
                        //submit multiple images
                        axios.post(baseUrl + '/product-imgs/', ImageFormData)
                        .then(function(response) {
                            console.log(response);
                            
                        })
                        .catch(function(error) {
                            console.error('Login Error:', error);
                        });
                    }
                    setProductImgs('');
                }
                else{
                    console.log(response.data);
                    seterrorMsg(response.statusText);
                    setsuccessMsg('') ;   
                }
                
            })
            .catch(function(error) {
                console.error('Login Error:', error);
            });
    };

    useEffect(() => {
        setProductData({
            ...ProductData,
            'vendor':vendor_id,
        });
        fetchData(baseUrl+'/categories/');
    },[]);
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data);
            setCategoryData(data.results);
        });
    }
    return(

        <div className="container mt-4">
        <div className="row ">
            <div className="col-md-3 col-12 mb-2">
                <SellerSidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
                    <div className='card'>
                        <h4 className='card-header'>Add Product</h4>
                        <div className='card-body'>
                            <form>
                                {errorMsg &&
                                <p className="text-danger">{errorMsg}</p>
                                }
                                {successMsg &&  <p className="text-success">{successMsg}</p>

                                }                                
                                <div className="mb-3">
                                    <label for="Title" className="form-label">Category</label>
                                    <select className='form-control' name='category' onChange={inputHandler}>
                                        {CategoryData.map((item,index)=><><option value={item.id}>{item.title}</option></>)}
                                    </select>
                                </div>                                
                                <div className="mb-3">
                                    <label for="Title" className="form-label">Title</label>
                                    <input type="text"  name='title' value={ProductData.title} onChange={inputHandler} className="form-control" id='Title'/>
                                </div>
                                <div className="mb-3">
                                    <label for="Slug" className="form-label">Slug</label>
                                    <input type="text"  name='slug' value={ProductData.slug} onChange={inputHandler} className="form-control" id='Slug'/>
                                </div>                                 
                                <div className="mb-3">
                                    <label for="NPR_Price" className="form-label">NPR Price</label>
                                    <input type="number"  name='price' value={ProductData.price} onChange={inputHandler} className="form-control" id='NPR_Price'/>
                                </div>                                
                                <div className="mb-3">
                                    <label for="USD_Price" className="form-label">USD Price</label>
                                    <input type="number"  name='usd_price' value={ProductData.usd_price} onChange={inputHandler} className="form-control" id='USD_Price'/>
                                </div>                         
                                <div className="mb-3">
                                    <label for="Detail" className="form-label">Detail</label>
                                    <textarea name='detail' value={ProductData.detail} onChange={inputHandler}  className="form-control" rows='6' id='Detail'></textarea>
                                </div>                                
                                <div className="mb-3">
                                    <label for="Tags" className="form-label">Tags</label>
                                    <textarea name='tags' value={ProductData.tags} onChange={inputHandler} className="form-control" rows='6' id='Tags'></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="Demo_URL" className="form-label">Demo URL </label>
                                    <input type="url"  name='demo_url' value={ProductData.demo_url} onChange={inputHandler} className="form-control" id='Demo_URL'/>
                                </div> 
                                <div className="mb-3">
                                    <label for="ProductImg" className="form-label">Featured Image</label>
                                    <input type="file" name='image' onChange={fileHandler} className="form-control" id='ProductImg' accept="image/*"/>
                                </div>
                                <div className="mb-3">
                                    <label for="Product_Imgs" className="form-label">Product Images</label>
                                    <input type="file" name='product_imgs' onChange={multiplefileHandler} className="form-control" id='Product_Imgs' accept="image/*"  multiple />
                                </div>
                                <div className="mb-3">
                                    <label for="Product_File" className="form-label">Product File</label>
                                    <input type="file" name='product_file' onChange={fileHandler} className="form-control" id='Product_File' accept="product_file/*"/>
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
export default AddProduct;