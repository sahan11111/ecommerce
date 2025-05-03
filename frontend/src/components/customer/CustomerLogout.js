
import { useEffect } from "react";

function CustomerLogout() {
    useEffect(() => {
        localStorage.removeItem('customer_login');
        localStorage.removeItem('customer_id');
        localStorage.removeItem('customer_username');
        window.location.href = '/customer/login';
    }, []);

    return null; // or return a simple loading message
}

export default CustomerLogout;
