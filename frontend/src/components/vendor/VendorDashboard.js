import VendorSidebar from './VendorSidebar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function VendorDashboard(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    var vendor_id = localStorage.getItem('vendor_id');
    const [CountList, setCountList] = useState({
        'totalProducts': 0,
        'totalOrders': 0,
        'totalCustomers': 0,
    });

    useEffect(() => {
        fetchData(baseUrl + '/vendor/dashboard/' + vendor_id + '/');
    }, [vendor_id]);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.result);
                setCountList({
                    'totalProducts': data.totalProducts,
                    'totalOrders': data.totalOrders,
                    'totalCustomers': data.totalCustomers,
                });
            });
    }

    console.log(CountList);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    <VendorSidebar />
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className='row'>

                        {/* Total Products */}
                        <div className='col-md-4 mb-3'>
                            <div className='card shadow-sm border-0 h-100 hover-card'>
                                <div className='card-body text-center'>
                                    <i className="bi bi-box-seam fs-1 text-primary mb-2"></i>
                                    <h5 className="text-muted">Total Products</h5>
                                    <h3>
                                        <Link to={`/vendor/products`} className="text-decoration-none text-dark fw-bold">
                                            {CountList.totalProducts}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className='col-md-4 mb-3'>
                            <div className='card shadow-sm border-0 h-100 hover-card'>
                                <div className='card-body text-center'>
                                    <i className="bi bi-cart-check fs-1 text-success mb-2"></i>
                                    <h5 className="text-muted">Total Orders</h5>
                                    <h3>
                                        <Link to={`/vendor/orders`} className="text-decoration-none text-dark fw-bold">
                                            {CountList.totalOrders}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Total Customers */}
                        <div className='col-md-4 mb-3'>
                            <div className='card shadow-sm border-0 h-100 hover-card'>
                                <div className='card-body text-center'>
                                    <i className="bi bi-people fs-1 text-info mb-2"></i>
                                    <h5 className="text-muted">Total Customers</h5>
                                    <h3>
                                        <Link to={`/vendor/customers`} className="text-decoration-none text-dark fw-bold">
                                            {CountList.totalCustomers}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style>{`
                .hover-card:hover {
                    transform: translateY(-5px);
                    transition: transform 0.2s ease-in-out;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
}

export default VendorDashboard;
