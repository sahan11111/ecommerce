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

// ⭐ CHANGED: Use avg_rating from productData instead of props
const avg_rating = productData?.avg_rating || 0;

// ⭐ CHANGED: Create star icons based on avg_rating
let _stars = [];
for (let i = 0; i < Math.floor(avg_rating); i++) {
    _stars.push(<i key={i} className="fa fa-star text-warning"></i>);
}


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
                                            {/* ⭐ CHANGED: wrapped in img-wrapper to keep size fixed */}
                                            <div className="img-wrapper mb-5 rounded shadow-sm">
                                                <img src={img.image} className="img-fluid hover-zoom" alt={`Slide ${index + 1}`} />
                                            </div>
                                        </div>
                                    );
                                    } else {
                                    return (
                                        <div className="carousel-item" key={index}>
                                            {/* ⭐ CHANGED: wrapped in img-wrapper to keep size fixed */}
                                            <div className="img-wrapper mb-5 rounded shadow-sm">
                                                <img src={img.image} className="img-fluid hover-zoom" alt={`Slide ${index + 1}`} />
                                            </div>
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
                              
                    <div className="mt-2">
                    <Link
                        to={`/product-rating/${productData.id}`}
                        className="text-decoration-none"
                    >
                        {/* ⭐ CHANGED: styled rating pill */}
                        <div className="d-inline-flex align-items-center bg-light px-3 py-2 rounded-pill shadow-sm rating-link">
                            <strong className="me-2 text-dark">Rating:</strong>
                            <span className="me-2 text-warning">{_stars}</span>
                            <i className="fa fa-chevron-right text-secondary small"></i>
                        </div>
                    </Link>
                </div>

                    </div>
                        <div className="col-8">
                            {/* ⭐ CHANGED: bold title + muted description */}
                            <h2 className="fw-bold text-dark">{productData.title}</h2>
                            <p className="text-muted">{productData.detail}</p>

                            {/* ⭐ CHANGED: highlighted price */}
                            {
                                CurrencyData !=='usd' && <h4 className="text-success fw-bold">Price : Rs {productData.price}</h4>
                            }
                            {
                                CurrencyData ==='usd' && <h4 className="text-success fw-bold">Price : $ {productData.usd_price}</h4>
                            }

                            {/* ⭐ CHANGED: consistent buttons with rounded-pill + icons */}
                            <p className='mt-3 d-flex flex-wrap gap-2'>
                                <Link title='Demo' to={`${productData.demo_url}`} target='_blank' className='btn btn-dark shadow-sm rounded-pill'>
                                    <i className="fa fa-desktop me-1"></i> Demo
                                </Link>

                                {!cartButtonClickStatus &&
                                    <button title='Add to Cart' type='button' onClick={cartAddButtonHandler} className='btn btn-primary shadow-sm rounded-pill'>
                                        <i className="fa fa-cart-plus me-1"></i> Add to Cart
                                    </button>
                                }                            
                                {cartButtonClickStatus &&
                                    <button title='Remove from Cart ' type='button' onClick={cartRemoveButtonHandler} className='btn btn-warning shadow-sm rounded-pill'>
                                        <i className="fa fa-times me-1"></i> Remove
                                    </button>
                                }
                                <button onClick={buyNowHandler} className='btn btn-success shadow-sm rounded-pill'>
                                    <i className="fa fa-bag-shopping me-1"></i> Buy Now
                                </button>
                                {
                                    (userContext && !productInWishlist) && <button onClick={saveInWishList} title='Add to Wistlist' className='btn btn-danger shadow-sm rounded-pill'><i className="fa fa-heart me-1"></i> Wishlist</button>
                                }
                                {
                                    (userContext && productInWishlist) && <button onClick={saveInWishList} title='Add to Wistlist' className='btn btn-danger shadow-sm rounded-pill disabled'><i className="fa fa-heart me-1"></i> Wishlist</button>
                                }                              
                                {
                                    userContext ===null && <button title='Add to Wistlist' className='btn btn-danger shadow-sm rounded-pill disabled'><i className="fa fa-heart me-1"></i> Wishlist</button>
                                }
                            </p>

                            {/* ⭐ CHANGED: better tags */}
                            <div className='producttags mt-4'>
                                <h5 className="fw-bold">Product Tags</h5>
                                <div className='d-flex flex-wrap gap-2 mt-2'>
                                    {tagLinks}
                                </div>
                            </div>
                        </div>

                    
                </div>
               {/* Related Product */}
               
               {/* ⭐ CHANGED: styled related heading */}
                <h3 className="mt-4 mb-5 text-center fw-bold">
                    <span className="border-bottom border-3 border-primary pb-1">
                    Related Products
                    </span>
                </h3>
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