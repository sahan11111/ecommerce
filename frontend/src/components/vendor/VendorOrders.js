import logo from '../../logo.svg';
import VendorSidebar from './VendorSidebar';
//Packages
import { Link } from 'react-router-dom';
function VendorOrders(){
    return(
        <div className="container mt-4">
        <div className="row ">
            <div className="col-md-3 col-12 mb-2">
                <VendorSidebar/>
            </div>
            <div className="col-md-9 col-12 mb-2">
                <div className='row'>
                    <div className='table-responsive'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        <Link><img src={logo} className="img-thumbnail" width={80} alt="..."/>Django</Link>
                                    </td>
                                    <td>Rs. 500</td>
                                    <td><span className='text-success'><i className='fa fa-check-circle'></i>Completed</span></td>
                                    <td>
                                    <div class="dropdown">
                                        <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Change Status
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Approve</a></li>
                                            <li><a class="dropdown-item" href="#">Sent</a></li>
                                            <li><a class="dropdown-item" href="#">Completed</a></li>
                                        </ul>
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>
                                        <Link><img src={logo} className="img-thumbnail" width={80} alt="..."/>Python</Link>
                                    </td>
                                    <td>Rs. 500</td>
                                    <td><span className='text-success'><i className='fa fa-check-circle'></i>Completed</span></td>
                                    <td>
                                    <div class="dropdown">
                                        <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Change Status
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Approve</a></li>
                                            <li><a class="dropdown-item" href="#">Sent</a></li>
                                            <li><a class="dropdown-item" href="#">Completed</a></li>
                                        </ul>
                                    </div>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    )
}
export default VendorOrders;