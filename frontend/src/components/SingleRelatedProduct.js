//Packages
import { Link } from 'react-router-dom';
//Assets
import { useContext, useEffect, useState } from 'react';
import { UserContext, CurrencyContext, CartContext } from '../Context';
import axios from 'axios';

function SingleRelatedProduct(props) {
    const { CurrencyData } = useContext(CurrencyContext);
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
    const [productInWishlist, setproductInWishlist] = useState(false);
    const { setCartData } = useContext(CartContext);
    const userContext = useContext(UserContext);
    const product_id = props.product.id;
    const productData = props.product;
    
    useEffect(() => {
        if (product_id) {
            checkProductInCart(product_id);
            checkProductInWishlist(`${baseUrl}/check-in-wishlist/`, product_id);
        }
    }, [product_id]);

    function checkProductInCart(product_id) {
        const previousCart = localStorage.getItem('cartData');
        const cartJson = previousCart ? JSON.parse(previousCart) : [];
        const numericProductId = parseInt(product_id);

        const inCart = cartJson.some(cart => 
            cart && cart.product.id === numericProductId
        );
        setcartButtonClickStatus(inCart);
    }

    const cartAddButtonHandler = () => {
        const previousCart = localStorage.getItem('cartData');
        const cartJson = previousCart ? JSON.parse(previousCart) : [];

        const cartData = {
            'product': {
                'id': productData.id,
                'title': productData.title,
                'price': productData.price,
                'usd_price': productData.usd_price,
                'image': productData.image,
            },
            'user': {
                'id': 1,
            },
            'total_amount': 10,
            'usd_total_amount': 10
        };

        const updatedCart = [...cartJson, cartData];
        localStorage.setItem('cartData', JSON.stringify(updatedCart));
        setCartData(updatedCart);
        setcartButtonClickStatus(true);
    };

    const cartRemoveButtonHandler = () => {
        const previousCart = localStorage.getItem('cartData');
        const cartJson = previousCart ? JSON.parse(previousCart) : [];
        
        // FIXED: Use filter instead of map+splice
        const updatedCart = cartJson.filter(cart => 
            cart && cart.product.id !== productData.id
        );
        
        localStorage.setItem('cartData', JSON.stringify(updatedCart));
        setcartButtonClickStatus(false);
        setCartData(updatedCart);
    };

    //save in Wishlist
    function saveInWishList() {
        const customerId = localStorage.getItem('customer_id');
        const formData = new FormData();
        formData.append('customer', customerId);
        formData.append('product', productData.id);

        // Submit wishlist data to the backend
        axios.post(baseUrl + '/wishlist/', formData)
            .then(function (response) {
                if (response.data.id) {
                    setproductInWishlist(true);
                }
            })
            .catch(function (error) {
                console.log('Error during order confirmation:', error);
            });
    }

    //check in Wishlist
    function checkProductInWishlist(baseUrl, product_id) {
        const customerId = localStorage.getItem('customer_id');
        const formData = new FormData();
        formData.append('customer', customerId);
        formData.append('product', product_id);

        // Submit wishlist data to the backend
        axios.post(baseUrl, formData)
            .then(function (response) {
                if (response.data.bool === true) {
                    setproductInWishlist(true);
                } else {
                    setproductInWishlist(false);
                }
            })
            .catch(function (error) {
                console.log('Error during order confirmation:', error);
            });
    }

    const index = props.index;

    let _class = '';
    if (index === 0) {
        _class = 'active';
    }

    // Use product avg_rating directly
    const avg_rating = props.product?.avg_rating || 0;
    var _stars = [];
    for (let i = 0; i < avg_rating; i++) {
        _stars.push(<i key={i} className="fa fa-star text-warning"></i>);
    }

    return (
        <div className="card shadow h-100 d-flex flex-column" >
            <Link to={`/product/${props.product.title}/${props.product.id}`}>
                <img src={props.product.image} className="card-img-top" style={{ height: "180px", objectFit: "cover" }} alt={props.product.title} />
            </Link>

            <div className="card-body">
                <h4 className="card-title"><Link to={`/product/${props.product.title}/${props.product.id}`}>{props.product.title}</Link></h4>
                <div>{_stars}</div>
                {
                    CurrencyData !== 'usd' && <h5 className="card-title text-muted">Price :Rs {props.product.price}</h5>
                }
                {
                    CurrencyData === 'usd' && <h5 className="card-title text-muted">Price :$ {props.product.usd_price}</h5>
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
                    userContext === null && <button title='Add to Wistlist' className='btn btn-danger  btn-sm ms-1 disabled'><i className="fa fa-heart "></i></button>
                }
            </div>
        </div>
    )
}

export default SingleRelatedProduct;