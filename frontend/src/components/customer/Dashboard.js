import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Dashboard() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    var customer_id = localStorage.getItem('customer_id');
    const [CountList, setCountList] = useState({
        'totalOrders': 0,
        'totalWishlist': 0,
        'totalAddress': 0,
    });

    useEffect(() => {
        fetchData(baseUrl + '/customer/dashboard/' + customer_id + '/');
    }, [customer_id]);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.result);
                setCountList({
                    'totalOrders': data.totalOrders,
                    'totalWishlist': data.totalWishlist,
                    'totalAddress': data.totalAddress,
                });
            });
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 col-12 mb-3">
                    <Sidebar />
                </div>

                {/* Dashboard Cards */}
                <div className="col-md-9 col-12">
                    <div className="row g-4">
                        {/* Total Orders */}
                        <div className="col-md-4 col-sm-6">
                            <div className="card shadow-lg border-0 rounded-3 h-100">
                                <div className="card-body text-center p-4 bg-gradient bg-light">
                                    <h5 className="fw-bold text-primary mb-2">Total Orders</h5>
                                    <h2>
                                        <Link
                                            to={`/customer/orders`}
                                            style={{ textDecoration: 'none' }}
                                            className="text-dark fw-bold"
                                        >
                                            {CountList.totalOrders}
                                        </Link>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Total Wishlist */}
                        <div className="col-md-4 col-sm-6">
                            <div className="card shadow-lg border-0 rounded-3 h-100">
                                <div className="card-body text-center p-4 bg-gradient bg-light">
                                    <h5 className="fw-bold text-danger mb-2">Total Wishlist</h5>
                                    <h2>
                                        <Link
                                            to={`/customer/wishlist`}
                                            style={{ textDecoration: 'none' }}
                                            className="text-dark fw-bold"
                                        >
                                            {CountList.totalWishlist}
                                        </Link>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Total Addresses */}
                        <div className="col-md-4 col-sm-6">
                            <div className="card shadow-lg border-0 rounded-3 h-100">
                                <div className="card-body text-center p-4 bg-gradient bg-light">
                                    <h5 className="fw-bold text-success mb-2">Total Addresses</h5>
                                    <h2>
                                        <Link
                                            to={`/customer/addresses`}
                                            style={{ textDecoration: 'none' }}
                                            className="text-dark fw-bold"
                                        >
                                            {CountList.totalAddress}
                                        </Link>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
