import './App.css';
import { Routes, Route } from 'react-router-dom';
// Assets
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
// Website
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Categories from './components/Categories';
import AllProducts from './components/AllProducts';
import ProductDetail from './components/ProductDetail';
import CategoryProducts from './components/CategoryProducts';
import TagProducts from './components/TagProducts';
import Checkout from './components/Checkout';
import ConfirmOrder from './components/ConfirmOrder';
import OrderSuccess from './components/OrderSuccess';
import OrderFailure from './components/OrderFailure';
import AllVendors from './components/AllVendors';
import VendorDetail from './components/VendorDetail';
// Customer Panel
import Register from './components/customer/Register';
import Login from './components/customer/Login';
import CustomerLogout from './components/customer/CustomerLogout';
import Dashboard from './components/customer/Dashboard';
import Orders from './components/customer/Orders';
import Wishlist from './components/customer/Wishlist';
import Profile from './components/customer/Profile';
import ChangePassword from './components/customer/ChangePassword';
import AddressList from './components/customer/AddressList';
import AddAddress from './components/customer/AddAddress';
import UpdateAddress from './components/customer/UpdateAddress';
import AddReview from './components/customer/AddReview';
// Vendor Panel
import VendorRegister from './components/vendor/VendorRegister';
import VendorLogin from './components/vendor/VendorLogin';
import VendorLogout from './components/vendor/VendorLogout';
import VendorDashboard from './components/vendor/VendorDashboard';
import VendorProducts from './components/vendor/VendorProducts';
import AddProduct from './components/vendor/AddProduct';
import UpdateProduct from './components/vendor/UpdateProduct';
import VendorOrders from './components/vendor/VendorOrders';
import Customers from './components/vendor/Customers';
import CustomerOrders from './components/vendor/CustomerOrders';
import Reports from './components/vendor/Reports';
import DailyReport from './components/vendor/DailyReport';
import MonthlyReport from './components/vendor/MonthlyReport';
import YearlyReport from './components/vendor/YearlyReport';
import VendorProfile from './components/vendor/VendorProfile';
import VendorChangePassword from './components/vendor/VendorChangePassword';

import { CartContext, CurrencyContext } from './Context';
import { useState } from 'react';
import ProductRating from './components/ProductRating';

const checkCart = localStorage.getItem('cartData');
const currentCurrency = localStorage.getItem('currency');
function App() {
  const [cartData, setCartData] = useState(JSON.parse(checkCart) );
  const [CurrencyData, setCurrencyData] = useState(currentCurrency);


  return (
    <>
      <CurrencyContext.Provider value={{CurrencyData,setCurrencyData}}>
      <CartContext.Provider value={{ cartData, setCartData }}>
        <Header />
        <Routes>
          {/* Home Page Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:category_slug/:category_id" element={<CategoryProducts />} />
          <Route path="/products/:tag" element={<TagProducts />} />
          <Route path="/product/:product_slug/:product_id" element={<ProductDetail />} />
          <Route path="/product-rating/:product_id" element={<ProductRating />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirm-order" element={<ConfirmOrder />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/order/failure" element={<OrderFailure />} />
          <Route path="/vendors" element={<AllVendors />} />
          <Route path="/vendor/:vendor_id" element={<VendorDetail />} />



          {/* Customer Panel Routes */}
          <Route path="/customer/register" element={<Register />} />
          <Route path="/customer/login" element={<Login />} />
          <Route path="/customer/logout" element={<CustomerLogout />} />
          <Route path="/customer/dashboard" element={<Dashboard />} />
          <Route path="/customer/orders" element={<Orders />} />
          <Route path="/customer/wishlist" element={<Wishlist />} />
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/customer/change-password" element={<ChangePassword />} />
          <Route path="/customer/addresses" element={<AddressList />} />
          <Route path="/customer/add-address" element={<AddAddress />} />
          <Route path="/customer/update-address/:address_id" element={<UpdateAddress />} />
          <Route path="/customer/add-review/:product_id" element={<AddReview />} />

          {/* Vendor Panel Routes */}
          <Route path="/vendor/register" element={<VendorRegister />} />
          <Route path="/vendor/login" element={<VendorLogin />} />
          <Route path="/vendor/logout" element={<VendorLogout />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/products" element={<VendorProducts />} />
          <Route path="/vendor/add-product" element={<AddProduct />} />
          <Route path="/vendor/update-product/:product_id" element={<UpdateProduct />} />
          <Route path="/vendor/orders" element={<VendorOrders />} />
          <Route path="/vendor/customers" element={<Customers />} />
          <Route path="/customer/:customer_id/orderitems" element={<CustomerOrders />} />
          <Route path="/vendor/reports" element={<Reports />} />
          <Route path="/vendor/daily-report" element={<DailyReport />} />
          <Route path="/vendor/monthly-report" element={<MonthlyReport />} />
          <Route path="/vendor/yearly-report" element={<YearlyReport />} />
          <Route path="/vendor/profile" element={<VendorProfile />} />
          <Route path="/vendor/change-password" element={<VendorChangePassword />} />
        </Routes>
        <Footer />
      </CartContext.Provider>
      </CurrencyContext.Provider>
    </>
  );
}

export default App;
