//Packages
import { Link } from 'react-router-dom';
//Assets
import { useContext,useState } from 'react';
import { CartContext, CurrencyContext } from '../Context';

function Checkout(props){
    const {cartData}=useContext(CartContext);
    const {setCartData} = useContext(CartContext);    
    const [productData, setproductData] = useState([]);
    const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
    const {CurrencyData}=useContext(CurrencyContext);

    
    if (cartData == null) {
        var cartItems=0;
      } else {
        var cartItems=cartData.length;
      }
    console.log (cartData);

    var sum=0;
    if(cartItems>0){
        cartData.map((item,index)=>{
            if (CurrencyData==='npr'|| CurrencyData===undefined){
                sum+=parseFloat(item.product.price);
            }else if(CurrencyData==='usd'){
                sum+=parseFloat(item.product.usd_price);
            }
        });
    }

    const cartRemoveButtonHandler = (product_id) => {
        var previousCart = localStorage.getItem('cartData'); 
        var cartJson = JSON.parse(previousCart);
        cartJson.map((cart, index) => {
            if (cart !== null && cart.product.id === product_id) {
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
    return(
    <div className='container mt-4'>
            {cartItems > 0 ? (
        <h3 className='mb-4'>All Items ({cartItems})</h3>
    ) : (
        <h3 className='mb-4'>Your cart is empty</h3>
    )}
        {cartItems > 0  &&
        <div className='row'>
            <div className='col-md-8 col-12'>
      
                <div className='table-responsive'>
                    <table className='table table-striped'>
                        <thead className='text-center'>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartData &&
                            cartData.map((item,index)=>{
                                return(

                                <tr>
                                    <td className='text-center'>{index+1}</td>
                                    <td>
                                        <Link to={`/product/${item.product.title}/${item.product.id}`}><img  src={item.product.image} className='img-thumbnail' width={80} alt={item.product.title}/></Link>
                                        <Link className='text-dark' to={`/product/${item.product.title}/${item.product.id}`}><label>{item.product.title}</label></Link>
                                    </td>
                                    { (CurrencyData==='npr'|| CurrencyData===undefined) &&
                                        <td className='text-center'>Rs. {item.product.price}</td>
                                    }   
                                    { (CurrencyData==='usd') &&
                                        <td className='text-center'>$ {item.product.usd_price}</td>
                                    }
                                    <td className='text-center'>                            
                                        <button title='Remove from Cart ' type='button' onClick={()=>cartRemoveButtonHandler(item.product.id)} className='btn btn-warning ms-1'>
                                            <i className="fa-solid fa-cart-plus "></i>Remove from Cart
                                        </button>
                                    </td>
                                </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                { (CurrencyData==='npr'|| CurrencyData===undefined) &&
                                    <td colSpan={4}>Total Price: Rs. {sum}</td>
                                }
                                { CurrencyData==='usd' &&
                                    <td colSpan={4}>Total Price: $. {sum}</td>
                                }
                            </tr>
                            <tr>
                                <td colSpan={4} align='right'>
                                    <Link to="/categories" className='btn btn-secondary'>Continue Shopping</Link>
                                    <Link to="/confirm-order" className='btn btn-success ms-1'>Proceed to Payment</Link>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div> 
        </div>
    }
    { !cartItems &&
        <Link to="/categories" className='btn btn-success'>Home</Link>

    }
    </div>
    )
}
export default Checkout;