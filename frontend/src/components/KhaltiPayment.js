import React, { useEffect } from 'react';
import KhaltiCheckout from "khalti-checkout-web";

const KhaltiPayment = () => {
    useEffect(() => {
        let config = {
            publicKey: "live_public_key_abcd1234efgh5678ijkl", 
            productIdentity: "1234567890", 
            productName: "Ecommerce Website", 
            productUrl: "http://localhost:3000", 
            eventHandler: {
                onSuccess(payload) {
                    console.log("Payment success:", payload);
                    alert('Payment Successful!');
                },
                onError(error) {
                    console.log("Payment error:", error);
                    alert('Payment Failed!');
                },
                onClose() {
                    console.log('Khalti widget is closing');
                }
            },
            paymentPreference: [
                "KHALTI",
                "EBANKING",
                "MOBILE_BANKING",
                "CONNECT_IPS",
                "SCT",
            ],
        };

        let checkout = new KhaltiCheckout(config);

        // Open Khalti popup
        checkout.show({ amount: 1000 }); // 1000 paisa = 10 rupees
    }, []);

    return (
        <div className="text-center mt-5">
            <h4>Redirecting to Khalti Payment Gateway...</h4>
        </div>
    );
};

export default KhaltiPayment;
