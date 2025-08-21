import { Link } from 'react-router-dom';
import { UserContext , CartContext , CurrencyContext } from '../Context';
import { useContext } from 'react';

function Header(){
  const userContext = useContext(UserContext);
  const {cartData} = useContext(CartContext);
  const {CurrencyData, setCurrencyData}=useContext(CurrencyContext);
  const checkVendor = localStorage.getItem('vendor_login');
  console.log('check vendor :',checkVendor);
  if (cartData == null) {
    var cartItems=0;
  } else {
    var cartItems=cartData.length;
  }
  const changeCurrency=(e)=>{
    console.log(e.target.value);
    var _currency=e.target.value;
    localStorage.setItem('currency',_currency);
    setCurrencyData(_currency);
  }
    return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <div className="container">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand" to="/">Programming Market Place</Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/categories">Category</Link>
          </li>
          {checkVendor !== 'true' &&
        
          <li className="nav-item dropdown">
          <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Account
          </button>
            <ul className="dropdown-menu">
              {userContext !== 'true' &&
                <>
                  <li><Link className="dropdown-item" to="/customer/register">Register</Link></li>
                  <li><Link className="dropdown-item" to="/customer/login">Login</Link></li>
                  </>
              }
              {userContext === 'true' &&
              <>
                <li><Link className="dropdown-item" to="/customer/dashboard">Dashboard</Link></li>
                <li><Link className="dropdown-item" to="/customer/logout">Logout</Link></li>
              </>
            }
            </ul>
          </li>
          }
          {userContext !=='true' &&

          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Vendor Pannel
            </button>
              <ul className="dropdown-menu">
                {checkVendor=== 'true' && 
                <>
                  <li><Link className="dropdown-item" to="/vendor/dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/vendor/logout">Logout</Link></li>
                </>

                }
                {checkVendor!== 'true' &&
                <>
                  <li><Link className="dropdown-item" to="/vendor/register">Register</Link></li>
                  <li><Link className="dropdown-item" to="/vendor/login">Login</Link></li>
                </>

                }
              </ul>
          </li>         
          }
          { checkVendor === 'true'&&(userContext !== 'true' ||checkVendor === 'false' )  &&
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/vendor/orders">New Orders</Link>
          </li>
          }
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/checkout"> Cart ({cartItems})</Link>
          </li>
          <li className="nav-item">
            <div className="nav-link">
              <select
                onChange={changeCurrency}
                className="form-select form-select-sm w-auto text-success fw-semibold shadow-sm border-primary"
              >
                {
                  CurrencyData !== 'usd' &&
                  <>
                    <option value='npr' selected>NPR</option>
                    <option value='usd'>USD</option>
                  </>
                }
                {
                  CurrencyData === 'usd' &&
                  <>
                    <option value='npr'>NPR</option>
                    <option value='usd' selected>USD</option>
                  </>
                }
              </select>
            </div>

          </li>
        </ul>
       
      </div>
    </div>
  </nav>
  )
}
export default Header;