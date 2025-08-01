import React, { useEffect } from 'react';
import KhaltiCheckout from "khalti-checkout-web";

const KhaltiPayment = () => {
  useEffect(() => {
    let config = {
      publicKey: "test_public_key_abcdef1234567890abcdef1234567890",  // Replace with your test/live key
      productIdentity: "1234567890",
      productName: "Ecommerce Website",
      productUrl: "http://localhost:3000",
      eventHandler: {
        onSuccess(payload) {
          console.log("Payment success:", payload);
          alert("Payment Successful!");
        },
        onError(error) {
          console.log("Payment error:", error);
          alert("Payment Failed!");
        },
        onClose() {
          console.log("Khalti widget is closing");
        },
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

    // Amount must be in paisa (e.g., 1000 paisa = 10 NPR)
    const amount = 1000;

    if (amount > 0) {
      checkout.show({ amount });
    } else {
      console.error("Amount must be a positive integer in paisa.");
    }
  }, []);

  return (
    <div className="text-center mt-5">
      <h4>Redirecting to Khalti Payment Gateway...</h4>
    </div>
  );
};

export default KhaltiPayment;
