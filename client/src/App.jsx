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
import ProductPage from "./pages/ProductPage";
import ProductCategory from "./pages/ProductCategory";

// halaman user
import Address from "./pages/user/Address";
import Settings from "./pages/user/Settings";
import Transactions from "./pages/user/Transactions";

// halaman seller
import StoreOrderLayout from "./pages/seller/StoreOrderLayout";
import StoreProfileLayout from "./pages/seller/StoreProfileLayout";
import StoreProductsLayout from "./pages/seller/StoreProductsLayout";

import StoreDashboardLayout from "./pages/seller/StoreDashboardLayout";
import StoreNotificationLayout from "./pages/seller/StoreNotificationLayout";
import Layout from "./components/layout/Layout";
import PageLoading from "./components/loading/PageLoading";
import DashboardLayout from "./components/layout/DashboardLayout";

import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoute, NonAuthRoute, SellerRoute } from "./middleware";
import UserLayout from "./components/user/UserLayout";

function App() {
  const { authCheck, checkingAuth } = useAuthStore();
  useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (checkingAuth) return <PageLoading />;

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

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":storename" element={<Store />} />
          <Route path="category" element={<Category />} />
          <Route path="search" element={<SearchResult />} />

          <Route path=":storename/:slug" element={<ProductPage />} />
          <Route path="category/:slug" element={<ProductCategory />} />
          <Route
            path="user"
            element={
              <AuthRoute>
                <UserLayout />
              </AuthRoute>
            }
          >
            <Route path="*" element={<NotFound />} />
            <Route path="address" element={<Address />} />
            <Route path="settings" element={<Settings />} />
            <Route path="transaction" element={<Transactions />} />
            <Route index element={<Navigate to="settings" replace />} />
          </Route>

          <Route
            path="cart"
            element={
              <AuthRoute>
                <Cart />
              </AuthRoute>
            }
          />

          <Route
            path="cart/checkout"
            element={
              <AuthRoute>
                <Checkout />
              </AuthRoute>
            }
          />
          <Route
            path="open-store"
            element={
              <AuthRoute>
                <OpenStore />
              </AuthRoute>
            }
          />

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
