import { useEffect } from "react";

function VendorLogout() {
    useEffect(() => {
        localStorage.removeItem('vendor_login');
        localStorage.removeItem('vendor_username');
        localStorage.removeItem('vendor_id');
        window.location.href = '/vendor/login';
    }, []);

    return null; // or return a simple loading message
}

export default VendorLogout;