import logo from '../../logo.svg';
import VendorSidebar from './VendorSidebar';
//Packages
import { Link } from 'react-router-dom';
function Customers(){
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
                                    <th>Customer ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        Sahan Takhachhen
                                    </td>
                                    <td>takhachhensahan@gmail.com</td>
                                    <td>9746457862</td>
                                    <td>
                                        <button className='btn btn-primary btn-sm '>Orders</button>
                                        <button className='btn btn-danger btn-sm ms-2'>Remove from list</button>
                                    </td>
                                </tr>                                
                                <tr>
                                    <td>2</td>
                                    <td>
                                        John Rai
                                    </td>
                                    <td>johnrai@gmail.com</td>
                                    <td>9741111111</td>
                                    <td>
                                        <button className='btn btn-primary btn-sm '>Orders</button>
                                        <button className='btn btn-danger btn-sm ms-2'>Remove from list</button>
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
export default Customers;