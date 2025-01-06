// page
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
import Address from "./pages/customer/Address";
import SearchResult from "./pages/SearchResult";
import ShopSettings from "./pages/seller/Settings";
import ProductCategory from "./pages/ProductCategory";
import Transaction from "./pages/customer/Transaction";
import Notification from "./pages/seller/Notification";
import CustomerSettings from "./pages/customer/Settings";

// layout
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import SellerLayout from "./components/layout/SellerLayout";
import CustomerLayout from "./components/layout/CustomerLayout";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path=":storename" element={<Store />} />
          <Route path="category" element={<Category />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="/open-shop" element={<OpenStore />} />
          <Route path="cart/checkout" element={<Checkout />} />
          <Route path=":storename/:product" element={<ProductDetail />} />
          <Route path="category/:category" element={<ProductCategory />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/user" element={<CustomerLayout />}>
          {/* Redirect from /user to /user/setting */}
          <Route path="address" element={<Address />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="settings" element={<CustomerSettings />} />
          <Route index element={<Navigate to="settings" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/shop" element={<SellerLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route path="order" element={<Order />} />
          <Route path="notification" element={<Notification />} />
          <Route index path="settings" element={<ShopSettings />} />
          <Route index element={<Navigate to="settings" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
