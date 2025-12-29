import { Link } from "react-router-dom";
import { CartContext, CurrencyContext } from "../Context";
import { useContext, useState } from "react";

function Header() {
  const { cartData } = useContext(CartContext);
  const { CurrencyData, setCurrencyData } = useContext(CurrencyContext);

  // LOGIN STATE
  const isCustomerLogged = localStorage.getItem("customer_login") === "true";
  const isVendorLogged = localStorage.getItem("vendor_login") === "true";

  const cartItems = cartData ? cartData.length : 0;

  // DROPDOWN STATE
  const [showAccount, setShowAccount] = useState(false);
  const [showVendor, setShowVendor] = useState(false);

  const changeCurrency = (e) => {
    localStorage.setItem("currency", e.target.value);
    setCurrencyData(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Programming Market Place
        </Link>

        <ul className="navbar-nav ms-auto align-items-center">

          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/categories">Category</Link>
          </li>

          {/* ================= ACCOUNT DROPDOWN ================= */}
          {!isVendorLogged && (
            <li className="nav-item position-relative">
              <button
                type="button"
                className="nav-link btn btn-link text-white"
                onClick={() => {
                  setShowAccount(!showAccount);
                  setShowVendor(false);
                }}
              >
                Account ▾
              </button>

              {showAccount && (
                <ul className="dropdown-menu show position-absolute">
                  {!isCustomerLogged ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/customer/register">
                          Register
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/customer/login">
                          Login
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/customer/dashboard">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/customer/logout">
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </li>
          )}

          {/* ================= VENDOR DROPDOWN ================= */}
          {!isCustomerLogged && (
            <li className="nav-item position-relative">
              <button
                type="button"
                className="nav-link btn btn-link text-white"
                onClick={() => {
                  setShowVendor(!showVendor);
                  setShowAccount(false);
                }}
              >
                Vendor Panel ▾
              </button>

              {showVendor && (
                <ul className="dropdown-menu show position-absolute">
                  {!isVendorLogged ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/vendor/register">
                          Register
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/vendor/login">
                          Login
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/vendor/dashboard">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/vendor/logout">
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </li>
          )}

          {/* ================= VENDOR ORDERS ================= */}
          {isVendorLogged && (
            <li className="nav-item">
              <Link className="nav-link" to="/vendor/orders">
                New Orders
              </Link>
            </li>
          )}

          {/* ================= CART ================= */}
          <li className="nav-item">
            <Link className="nav-link" to="/checkout">
              Cart ({cartItems})
            </Link>
          </li>

          {/* ================= CURRENCY ================= */}
          <li className="nav-item">
            <select
              className="form-select form-select-sm"
              value={CurrencyData || "npr"}
              onChange={changeCurrency}
            >
              <option value="npr">NPR</option>
              <option value="usd">USD</option>
            </select>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Header;
