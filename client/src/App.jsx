// pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Store from "./pages/Store";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Category from "./pages/Category";
import Order from "./pages/seller/Order";
import OpenStore from "./pages/OpenStore";
import Products from "./pages/seller/Products";
import Address from "./pages/customer/Address";
import SearchResult from "./pages/SearchResult";
import ProductDetail from "./pages/ProductDetail";
import ShopSettings from "./pages/seller/Settings";
import ProductCategory from "./pages/ProductCategory";
import Transaction from "./pages/customer/Transaction";
import Notification from "./pages/seller/Notification";
import CustomerSettings from "./pages/customer/Settings";

// support

import MainLayout from "./components/layout/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import SellerLayout from "./components/layout/SellerLayout";
import CustomerLayout from "./components/layout/CustomerLayout";
import AuthRoute from "./middleware";

function App() {
  return (
    <>
      <AuthRoute>
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path=":storename" element={<Store />} />
            <Route path="category" element={<Category />} />
            <Route path="open-shop" element={<OpenStore />} />
            <Route path="search" element={<SearchResult />} />
            <Route path="cart/checkout" element={<Checkout />} />
            <Route path=":storename/:slug" element={<ProductDetail />} />
            <Route path="category/:slug" element={<ProductCategory />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* customer */}
          <Route path="user" element={<CustomerLayout />}>
            {/* Redirect from /user to /user/setting */}
            <Route path="address" element={<Address />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="settings" element={<CustomerSettings />} />
            <Route index element={<Navigate to="settings" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* seller */}
          <Route path="/shop" element={<SellerLayout />}>
            <Route path="order" element={<Order />} />
            <Route path="products" element={<Products />} />
            <Route path="notification" element={<Notification />} />
            <Route index path="settings" element={<ShopSettings />} />
            <Route index element={<Navigate to="settings" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthRoute>
    </>
  );
}

export default App;
