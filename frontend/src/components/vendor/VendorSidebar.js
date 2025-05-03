//Packages
import { Link } from 'react-router-dom';
function VendorSidebar(){
    return(
                <div className="list-group">
                    <Link to="/vendor/dashboard" className="list-group-item list-group-item-action active " >Dashboard</Link>
                    <Link to="/vendor/products" className="list-group-item list-group-item-action">Products</Link>
                    <Link to="/vendor/add-product" className="list-group-item list-group-item-action">Add Product</Link>
                    <Link to="/vendor/orders" className="list-group-item list-group-item-action">Orders</Link>
                    <Link to="/vendor/customers" className="list-group-item list-group-item-action">Customers</Link>
                    <Link to="/vendor/reports" className="list-group-item list-group-item-action">Reports</Link>
                    <Link to="/vendor/profile" className="list-group-item list-group-item-action">Profile</Link>
                    <Link to="/vendor/change-password" className="list-group-item list-group-item-action">Change Password</Link>
                    <Link to="/vendor/login" className="list-group-item list-group-item-action text-danger">Logout</Link>
                </div>
    )
}
export default VendorSidebar;