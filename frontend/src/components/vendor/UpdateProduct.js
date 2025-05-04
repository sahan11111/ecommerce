import SellerSidebar from './VendorSidebar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api';
function UpdateProduct(){
    const [errorMsg, seterrorMsg]=useState('');

    const [IsImageDelete, setIsImageDelete]=useState(false);

    const [IsFeaturedImage, setIsFeaturedImage]=useState(false);
    const [IsProductFile, setIsProductFile]=useState(false);
    const [IsProductImagesSelected, setIsProductImagesSelected]=useState(false);
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
        'product_imgs':'',
        'product_file':'',
    });
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
        if(event.target.name==='image')  {
            setIsFeaturedImage(true);
        } 
        if(event.target.name==='product_file')  {
            setIsProductFile(true);
        } 
    };
    const multiplefileHandler=(event)=>{
        var files=event.target.files;
        if(files.length>0){
            setIsProductImagesSelected(true);
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
        if(IsFeaturedImage){
            formData.append('image', ProductData.image);
        }
        if(IsProductFile){
            formData.append('product_file', ProductData.product_file);
        }

        formData.append('demo_url', ProductData.demo_url);
    
        // Submit data
        axios.patch(baseUrl + '/product/'+product_id+'/', formData,{
            headers:{
                'content-type':'multipart/form-data'
            }
        })
            .then(function(response) {
                if (response.status===200){
                    seterrorMsg('');
                    setsuccessMsg(response.statusText);
                    if(IsProductImagesSelected){

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
                    }
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
    const {product_id} = useParams();
    useEffect(() => {
        setProductData({
            ...ProductData,
            'vendor':vendor_id,
        });
        fetchData(baseUrl+'/categories/');
        fetchProductData(baseUrl+'/product/'+product_id);
    },[]);
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data);
            setCategoryData(data.results);
        });
    }
    function fetchProductData(baseurl){
        fetch(baseurl)
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data);
            
            setProductData({
                'category':data.category,
                'vendor':data.vendor,
                'title':data.title,
                'slug':data.slug,
                'detail':data.detail,
                'price':data.price,
                'usd_price':data.usd_price,
                'tags':data.tags,
                'image':data.image,
                'demo_url':data.demo_url,
                'product_file':data.product_file,  
                'product_imgs':data.product_imgs,  
            });
        });
    }

    function deleteImage(image_id){
        axios.delete(baseUrl + '/product-img/'+image_id)
            .then(function(response) {
                if(response.status===204){
                    window.location.reload();
                }
            })
            .catch(function(error){
                console.log(error);
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
                        <h4 className='card-header'>Update Product</h4>
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
                                        {CategoryData.map((item,index)=><option selected={item.id===ProductData.category} value={item.id}>{item.title}</option>)}
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
                                <img src={ProductData.image} className='mt-2 rounded' width={150}/> 
                                </div>
                                <div className="mb-3">
                                    <label for="Product_Imgs" className="form-label">Product Images</label>
                                    <input type="file" name='product_imgs' onChange={multiplefileHandler} className="form-control mb-3" id='Product_Imgs' accept="image/*"  multiple />
                                    <>
                                    {
                                        ProductData.product_imgs && ProductData.product_imgs.map((img, index) =><>
                                            <span className='image-box d-inline  p-3 my-2'  onClick={()=>deleteImage(img.id)}>
                                                <i className='fa fa-trash text-danger'style={styles.deleteBtn} role='button'></i>
                                                <img key={index} src={img.image} className="my-4  rounded" width={200} alt={`Product Image ${index}`} />
                                            </span> 
                                            </>
                                        )
                                    }
                                    </>
                                </div>
                                <div className="mb-3">
                                    <label for="Product_File" className="form-label">Product File</label>
                                    <input type="file" name='product_file' onChange={fileHandler} className="form-control" id='Product_File' accept="product_file/*"/>
                                    <Link to={ProductData.product_imgs.file}>{ProductData.product_file}</Link>
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
const styles={
    'deleteBtn':{
        'position':'absolute',

    }
};

export default UpdateProduct;