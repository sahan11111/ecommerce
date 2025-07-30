import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState,useEffect,useContext } from 'react';
import SingleRelatedProduct from './SingleRelatedProduct';
import axios from "axios";
import { UserContext,CartContext, CurrencyContext } from '../Context';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useNavigate } from 'react-router-dom';


function ProductDetail(){
    const baseUrl='http://127.0.0.1:8000/api';
    const [productData, setproductData] = useState([]);
    const [productImgs, setproductImgs] = useState([]);
    const [productTags, setproductTags] = useState([]);
    const [relatedProducts, setrelatedProducts] = useState([]);
    const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
    const [productInWishlist, setproductInWishlist] = useState(false);
    const {setCartData} = useContext(CartContext);
    const {CurrencyData}=useContext(CurrencyContext);
    const userContext = useContext(UserContext);



    const {product_id} = useParams();
         
    useEffect(() => {
        fetchData(`${baseUrl}/product/${product_id}/`);
        fetchRelatedData(`${baseUrl}/related-products/${product_id}/`);
        checkProductInCart(product_id);
        checkProductInWishlist(`${baseUrl}/check-in-wishlist/`,product_id);
    }, [product_id]); 

    function checkProductInCart(product_id) {
        const previousCart = localStorage.getItem('cartData');
        const cartJson = JSON.parse(previousCart);
        const numericProductId = parseInt(product_id);
    
        if (cartJson !== null) {
            for (let cart of cartJson) {
                if (cart !== null && cart.product.id === numericProductId) {
                    setcartButtonClickStatus(true);
                    break;
                }
            }
        }
    }
    
    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data) => {
            setproductData(data);
            setproductImgs(data.product_imgs);
            setproductTags(data.tag_list); 
        });
    }
    function fetchRelatedData(baseurl){
        fetch(baseurl)
        .then((response) => response.json())
        .then((data)=> {
            setrelatedProducts(data.results);
        });
    }
    // console.log('Product Data:', productData); 
    // console.log('Product Images:', productImgs);
    console.log('Product Tag',productTags);
    const tagLinks=[]
    for(let i=0;i<productTags.length;i++){
        let tag=productTags[i].trim();
        tagLinks.push(<Link to={`/products/${tag}`}className='badge bg-secondary trxt-white me-1' >{tag}</Link>)
    }
    const cartAddButtonHandler = () => {
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
    
        var cartData = {
            'product': {
                'id': productData.id,
                'title': productData.title,
                'price': productData.price,
                'usd_price':productData.usd_price,
                'image': productData.image,
            },
            'user': {
                'id': 1,
            },
            'total_amount':10,
            'usd_total_amount':10
        };
    
        var cartString = "";
    
        if (cartJson != null) {
            cartJson.push(cartData);
            cartString = JSON.stringify(cartJson); 
            localStorage.setItem('cartData', cartString);
            setCartData(cartJson);
        } else {
            var newCartList = [];
            newCartList.push(cartData);
            cartString = JSON.stringify(newCartList); 
            localStorage.setItem('cartData', cartString);
        }
    
        setcartButtonClickStatus(true);
    };
    
 const cartRemoveButtonHandler = () => {
    var previousCart = localStorage.getItem('cartData'); 
    var cartJson = JSON.parse(previousCart);
    cartJson.map((cart, index) => {
        if (cart !== null && cart.product.id === productData.id) {
            // delete cartJson[index];
            cartJson.splice(index,1); 
        }
        return cart; 
    });
    var cartString = JSON.stringify(cartJson);
    localStorage.setItem('cartData', cartString);
    setcartButtonClickStatus(false);
    setCartData(cartJson);
};

//save in Wishlist
function saveInWishList(){
    const customerId=localStorage.getItem('customer_id');
    const formData = new FormData();
    formData.append('customer', customerId);
    formData.append('product', productData.id);
    // console.log('form:', formData.data);

    // Submit wishlist data to the backend
    axios.post(baseUrl + '/wishlist/', formData)
        .then(function (response) {
            // console.log(response);
            if(response.data.id){
                setproductInWishlist(true);
            }
        })
        .catch(function (error) {
            console.log('Error during order confirmation:', error);
        });
}
//check in Wishlist
function checkProductInWishlist(baseUrl,product_id){
    const customerId=localStorage.getItem('customer_id');
    const formData = new FormData();
    formData.append('customer', customerId);
    formData.append('product', product_id);
    // console.log('form:', formData.data);

    // Submit wishlist data to the backend
    axios.post(baseUrl , formData)
        .then(function (response) {
            // console.log(response);
            if (response.data.bool===true){
                setproductInWishlist(true);
            }else{
                setproductInWishlist(false);
            }
        })
        .catch(function (error) {
            console.log('Error during order confirmation:', error);
        });
   
}
const navigate = useNavigate();

const buyNowHandler = () => {
  const previousCart = localStorage.getItem('cartData');
  const cartJson = JSON.parse(previousCart) || [];

  const existsInCart = cartJson.some(item => item?.product?.id === productData.id);

  if (!existsInCart) {
    const cartDataItem = {
      product: {
        id: productData.id,
        title: productData.title,
        price: productData.price,
        usd_price: productData.usd_price,
        image: productData.image,
      },
      user: { id: 1 },
      total_amount: 10,
      usd_total_amount: 10,
    };

    cartJson.push(cartDataItem);
    localStorage.setItem('cartData', JSON.stringify(cartJson));
    setCartData(cartJson);
    setcartButtonClickStatus(true);
  }

  navigate('/checkout');  // ✅ Go to checkout
//   navigate('/confirm-order');
};
    return(
           <section className="container mt-4">
                <div className="row">
                    <div className="col-4">
                    <div id="productThumbnailSlider" className="carousel carousel-dark slide carousel-fade" data-bs-ride="true">
                        <div className="carousel-indicators">
                                {
                                productImgs.map((img, index) => {
                                    if (index === 0) {
                                    return (
                                        <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#productThumbnailSlider"
                                        data-bs-slide-to={index}
                                        className="active"
                                        aria-current="true"
                                        aria-label="Slide 1"
                                        ></button>
                                    );
                                    } else {
                                    return (
                                        <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#productThumbnailSlider"
                                        data-bs-slide-to={index}
                                        aria-label={`Slide ${index + 1}`}
                                        ></button>
                                    );
                                    }
                                })
                                }
                            </div>

                            <div className="carousel-inner">
                                {
                                productImgs.map((img, index) => {
                                    if (index === 0) {
                                    return (
                                        <div className="carousel-item active" key={index}>
                                        <img src={img.image} className="img-thumbnail mb-5 " alt={`Slide ${index + 1}`} />
                                        </div>
                                    );
                                    } else {
                                    return (
                                        <div className="carousel-item" key={index}>
                                        <img src={img.image} className="img-thumbnail mb-5 " alt={`Slide ${index + 1}`} />
                                        </div>
                                    );
                                    }
                                })
                                }
                        </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>
                        <div className="col-8">
                            <h3>{productData.title}</h3>
                            <p>{productData.detail}</p>
                            {
                                CurrencyData !=='usd' && <h5 className="card-title text-muted">Price :Rs {productData.price}</h5>
                            }
                                                        {
                                CurrencyData ==='usd' && <h5 className="card-title text-muted">Price :$ {productData.usd_price}</h5>
                            }
                            <p className='mt-3'>
                            <Link title='Demo' to={`${productData.demo_url}`} target='_blank' className='btn btn-dark'><i className="fa-solid fa-cart-plus "></i>Demo</Link>
                            {!cartButtonClickStatus &&
                                <button title='Add to Cart' type='button' onClick={cartAddButtonHandler} className='btn btn-primary ms-1'>
                                    <i className="fa-solid fa-cart-plus "></i>Add to Cart
                                </button>
                            }                            
                            {cartButtonClickStatus &&
                                <button title='Remove from Cart ' type='button' onClick={cartRemoveButtonHandler} className='btn btn-warning ms-1'>
                                    <i className="fa-solid fa-cart-plus "></i>Remove from Cart
                                </button>
                            }
                            <button onClick={buyNowHandler} className='btn btn-success ms-1'>
                                <i className="fa-solid fa-bag-shopping "></i>Buy Now
                            </button>
                            {
                                (userContext && !productInWishlist) && <button onClick={saveInWishList} title='Add to Wistlist' className='btn btn-danger  ms-1'><i className="fa fa-heart "></i>Wishlist</button>
                            }
                            {
                                (userContext && productInWishlist) && <button onClick={saveInWishList} title='Add to Wistlist' className='btn btn-danger  ms-1 disabled'><i className="fa fa-heart "></i>Wishlist</button>
                            }                              
                            {
                                userContext ===null && <button title='Add to Wistlist' className='btn btn-danger  ms-1 disabled'><i className="fa fa-heart "></i>Wishlist</button>
                            }
                            
                            </p>
                            <div className='producttags mt-4'>
                                <h5>Product Tags</h5>
                                <p className='mt-3'>
                                    {tagLinks}
                                </p>
                            </div>
                        </div>

                    
                </div>
               {/* Related Product */}
               
               <h3 className='mt-5 mb-2 text-center'>Related Product</h3><br/>
                {relatedProducts.length > 0 && 
                <OwlCarousel className="owl-theme" items={3} loop margin={10} >
                    {relatedProducts.map((product,index) =>{
                    return <div className="item">
                        <SingleRelatedProduct key={index} product={product} />
                    </div>
                    } 
                    )}
                </OwlCarousel>
                }
                            {/* End Related Product */}
                        </section>
                    )
                }
export default ProductDetail;