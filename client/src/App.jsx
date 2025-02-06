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
import SearchResult from "./pages/SearchResult";
import ProductDetail from "./pages/ProductDetail";
import ProductCategory from "./pages/ProductCategory";
import Notification from "./pages/seller/Notification";
import StoreSettings from "./pages/seller/StoreSettings";
import AddressLayout from "./pages/customer/AddressLayout";
import ProfileLayout from "./pages/customer/ProfileLayout";
import TransactionLayout from "./pages/customer/TransactionLayout";
import NotificationLayout from "./pages/customer/NotificationLayout";
// support
import MainLayout from "./components/layout/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import SellerLayout from "./components/layout/SellerLayout";
import CustomerLayout from "./components/layout/CustomerLayout";
import { AuthRoute, NonAuthRoute, SellerRoute } from "./middleware";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="signin"
          element={
            <NonAuthRoute>
              <SignIn />
            </NonAuthRoute>
          }
        />
        <Route
          path="signup"
          element={
            <NonAuthRoute>
              <SignUp />
            </NonAuthRoute>
          }
        />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path=":storename" element={<Store />} />
          <Route path="category" element={<Category />} />
          <Route path="search" element={<SearchResult />} />
          <Route path=":storename/:slug" element={<ProductDetail />} />
          <Route path="category/:slug" element={<ProductCategory />} />

          <Route
            path="cart"
            element={
              <AuthRoute>
                <Cart />
              </AuthRoute>
            }
          />
          {/* <Route
            path="open-store"
            element={
              <AuthRoute>
                <OpenStore />
              </AuthRoute>
            }
          /> */}
          <Route path="open-store" element={<OpenStore />} />

          <Route
            path="cart/checkout"
            element={
              <AuthRoute>
                <Checkout />
              </AuthRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* customer */}
        <Route
          path="user"
          element={
            <AuthRoute>
              <CustomerLayout />
            </AuthRoute>
          }
        >
          <Route path="profile" element={<ProfileLayout />} />
          <Route path="address" element={<AddressLayout />} />
          <Route path="transaction" element={<TransactionLayout />} />
          <Route path="notification" element={<NotificationLayout />} />
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* seller */}
        <Route
          path="/store"
          element={
            <SellerRoute>
              <SellerLayout />
            </SellerRoute>
          }
        >
          <Route path="order" element={<Order />} />
          <Route path="products" element={<Products />} />
          <Route path="notification" element={<Notification />} />
          <Route index path="settings" element={<StoreSettings />} />
          <Route index element={<Navigate to="settings" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
