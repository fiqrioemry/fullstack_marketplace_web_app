// pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Store from "./pages/Store";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Category from "./pages/Category";
import OpenStore from "./pages/OpenStore";
import SearchResult from "./pages/SearchResult";
import ProductDetail from "./pages/ProductDetail";
import ProductCategory from "./pages/ProductCategory";
import AddressLayout from "./pages/customer/AddressLayout";
import ProfileLayout from "./pages/customer/ProfileLayout";
import StoreOrderLayout from "./pages/seller/StoreOrderLayout";
import StoreProfileLayout from "./pages/seller/StoreProfileLayout";
import TransactionLayout from "./pages/customer/TransactionLayout";
import StoreProductsLayout from "./pages/seller/StoreProductsLayout";
import NotificationLayout from "./pages/customer/NotificationLayout";
import StoreDashboardLayout from "./pages/seller/StoreDashboardLayout";
import StoreNotificationLayout from "./pages/seller/StoreNotificationLayout";

// support
import MainLayout from "./components/layout/MainLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoute, NonAuthRoute, SellerRoute } from "./middleware";
import DashboardLayout from "./components/layout/DashboardLayout";
import TestingUI from "./pages/TestingUI";

function App() {
  return (
    <>
      <Routes>
        <Route path="testing" element={<TestingUI />} />
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
          <Route path="testing" element={<TestingUI />} />

          <Route
            path="cart"
            element={
              <AuthRoute>
                <Cart />
              </AuthRoute>
            }
          />

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
              <DashboardLayout />
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
              <DashboardLayout />
            </SellerRoute>
          }
        >
          <Route index element={<StoreDashboardLayout />} />
          <Route path="order" element={<StoreOrderLayout />} />
          <Route path="products" element={<StoreProductsLayout />} />
          <Route index path="profile" element={<StoreProfileLayout />} />
          <Route path="notification" element={<StoreNotificationLayout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
