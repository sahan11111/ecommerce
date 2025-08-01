//Packages
import { Link } from 'react-router-dom';
//Assets
import { useContext,useEffect,useState } from 'react';
import { UserContext,CurrencyContext,CartContext } from '../Context';
import axios from 'axios';

function SingleProduct(props){
    const {CurrencyData}=useContext(CurrencyContext);
    const baseUrl='http://127.0.0.1:8000/api';
    const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
    const [productInWishlist, setproductInWishlist] = useState(false);
    const {setCartData} = useContext(CartContext);
    const userContext = useContext(UserContext);
    const product_id=props.product.id;
    const productData=props.product;
    useEffect(() => {
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
    return(
        <div className="col-12 col-md-3 mb-4" >
            <div className="card shadow h-100 d-flex flex-column" >
                <Link to={`/product/${props.product.title}/${props.product.id}`}>
                    <img src={props.product.image} className="card-img-top" style={{ height: "180px", objectFit: "cover" }}  alt={props.product.title}/>
                </Link>
                <div className="card-body">
                    <h4 className="card-title"><Link to={`/product/${props.product.title}/${props.product.id}`}><lable>{props.product.title}</lable></Link></h4>
                    {
                        CurrencyData !=='usd' && <h5 className="card-title text-muted">Price :Rs {props.product.price}</h5>
                    }
                                                {
                        CurrencyData ==='usd' && <h5 className="card-title text-muted">Price :$ {props.product.usd_price}</h5>
                    }
                </div>
                <div className='card-footer'>
                    {!cartButtonClickStatus &&
                        <button title='Add to Cart' type='button' onClick={cartAddButtonHandler} className='btn btn-primary btn-sm ms-1'>
                            <i className="fa-solid fa-cart-plus "></i>
                        </button>
                    }                            
                    {cartButtonClickStatus &&
                        <button title='Remove from Cart ' type='button' onClick={cartRemoveButtonHandler} className='btn btn-warning btn-sm ms-1'>
                            <i className="fa-solid fa-cart-plus "></i>
                        </button>
                    }
                    {
                        (userContext && !productInWishlist) && <button onClick={saveInWishList} title='Add to Wistlist' className='btn btn-danger  btn-sm ms-1'><i className="fa fa-heart "></i></button>
                    }
                    {
                        (userContext && productInWishlist) && <button onClick={saveInWishList} title='Add to Wistlist' className='btn btn-danger  btn-sm ms-1 disabled'><i className="fa fa-heart "></i></button>
                    }                              
                    {
                        userContext ===null && <button title='Add to Wistlist' className='btn btn-danger  btn-sm ms-1 disabled'><i className="fa fa-heart "></i></button>
                    }
                    
                    <h7 className='text-muted'>Downloads : {props.product.downloads}</h7>
        </div>
            </div>
        </div>
    )
}
export default SingleProduct;