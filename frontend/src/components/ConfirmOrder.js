import { UserContext, CartContext,CurrencyContext } from "../Context";
import { useContext, useState } from 'react';
import KhaltiPayment from './KhaltiPayment';


// Third party
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api';

function ConfirmOrder() {
    const [confirmOrder, setconfirmOrder] = useState(false);
    const [orderId, setorderId] = useState('');
    const [orderAmount, setorderAmount] = useState(0);
    const [PayMethod, setPayMethod] = useState('');
    const [showPayPal, setShowPayPal] = useState(false); // 🛠️ NEW: Control PayPal showing
    const { setCartData } = useContext(CartContext);
    const userContext = useContext(UserContext);
    const {CurrencyData}=useContext(CurrencyContext);


    if (userContext == null) {
        console.log(userContext);
        window.location.href = '/customer/login';
    } else {
        if (confirmOrder === false) {
            addOrderInTable();
        }
    }

    function addOrderInTable() {
        const customerId = localStorage.getItem('customer_id');
        // console.log('id :', customerId);
        var total_amount=0;
        var usd_total_amount=0;
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        cartJson.map((cart, index) => {
          total_amount+=parseFloat(cart.product.price);
          usd_total_amount+=parseFloat(cart.product.usd_price)
        });

        const formData = new FormData();
        formData.append('customer', customerId);
        formData.append('total_amount', total_amount);
        formData.append('usd_total_amount', usd_total_amount);
        // console.log('form:', formData.data);

        // Submit order data to the backend
        axios.post(baseUrl + '/orders/', formData)
            .then(function (response) {
                var orderId = response.data.id;
                setorderId(orderId);
                if (CurrencyData==='usd'){
                setorderAmount(response.data.usd_total_amount);
                }else{
                setorderAmount(response.data.total_amount);
                }
                console.log('Order confirmed:', response.data);
                orderItems(orderId);
                setconfirmOrder(true);
            })
            .catch(function (error) {
                console.log('Error during order confirmation:', error);
            });
    }

    function updateOrderStatus(order_status){
            // Submit order data to the backend
            axios.post(baseUrl + '/update-order-status/'+orderId)
            .then(function (response) {
                console.log(response);
                window.location.href = '/order/success';
                // var orderId = response.data.id;
                // setorderId(orderId);
                // console.log('Order confirmed:', response.data);
                // orderItems(orderId);
                // setconfirmOrder(true);
            })
            .catch(function (error) {
                window.location.href = '/order/failure';
                console.log('Error during order confirmation:', error);
            });
    }

    function orderItems(order_id) {
        var previousCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(previousCart);
        // console.log(cartJson);

        if (cartJson !== null) {
            var sum=0;
            cartJson.map((cart, index) => {
                const formData = new FormData(); // ✅ Move inside the loop
                formData.append('order', order_id);
                formData.append('product', cart.product.id);
                formData.append('qty', 1);
                formData.append('price', cart.product.price);
                formData.append('usd_price', cart.product.usd_price);

                axios.post(baseUrl + '/orderitems/', formData)
                    .then(function (response) {
                        // remove cart item from local storage
                        cartJson.splice(index, 1);
                        localStorage.setItem('cartData', JSON.stringify(cartJson));
                        setCartData(cartJson);
                    })
                    .catch(function (error) {
                        console.log('Error during order item confirmation:', error);
                    });
            });
        }
    }

    function changePaymentMethod(payMethod) {
        setPayMethod(payMethod);
    }

    function PayNowButton() {
        if (PayMethod !== '') {
            if (PayMethod === 'paypal') {
                setShowPayPal(true); 
            } else if (PayMethod === 'khalti') {
                setShowPayPal(true);
            } else if (PayMethod === 'esewa') {
                setShowPayPal(true);
            }
        } else {
            alert('Select Payment Method');
        }
    }
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6 offset-3">
                    <div className="card py-3 text-center">
                        <h3 className=""><i className="fa fa-check-circle text-success"></i>Your Order has been Confirmed</h3>
                        <h5>Order id : {orderId}</h5>
                    </div>
                    <div className="card p-3 mt-4 ">
                        <form>
                            {
                                CurrencyData !=='usd' &&                            
                                <div className="form-group">
                                <label>
                                    <input type="radio" onChange={() => changePaymentMethod('khalti')} name="payMethod" />Khalti
                                </label>
                            </div>
                                
                            }
                            {
                                CurrencyData !=='usd' &&                            
                                <div className="form-group">
                                <label>
                                    <input type="radio" onChange={() => changePaymentMethod('esewa')} name="payMethod" />Esewa
                                </label>
                            </div>
                                
                            }
                            {
                                CurrencyData ==='usd' &&                            
                            <div className="form-group">
                                <label>
                                    <input type="radio" onChange={() => changePaymentMethod('paypal')} name="payMethod" /><i class="fa-brands fa-paypal"></i>Paypal
                                </label>
                            </div>
                            
                                
                            }
                            <button type="button" onClick={PayNowButton} className="btn btn-success mt-3">Next</button>
                        </form>

                        {/* 🛠️ FIXED: PayPal button now shows only after clicking "Next" */}
                        {/* EDZbA-dYmxjUwkc6Gl4Z8R-xhCb3TKsBfLq50pftZcGq71tMVxO0cSvvdH1QCiftWPh_hC9x30ev0wcA */}
                        {showPayPal && PayMethod === 'paypal' &&
                            <PayPalScriptProvider options={{ "client-id": 'AUllBqvBXdR81CXoFBo09eOg_eNkdXhZvyR7WSV6OrvB9iP-p05RTdVPBlDqqjoYxmhdg6eCcdKSieWo' }}>
                                <PayPalButtons className='mt-3'
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        currency_code: 'USD',
                                                        value: orderAmount.toString(), 
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            const name = details.payer.name.given_name;
                                            // alert(`Transaction completed by ${name}`);
                                            updateOrderStatus(true);
                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        }
                        {showPayPal && PayMethod === 'khalti' && <KhaltiPayment />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmOrder;
