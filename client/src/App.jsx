// pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import OpenStore from "./pages/OpenStore";
import ProductDetail from "./pages/ProductDetail";
import SearchResult from "./pages/SearchResult";
import PageLoading from "./components/loading/PageLoading";

// halaman shop khusus masing2 toko
import ShopInfo from "./pages/shop/ShopInfo";
import ShopProducts from "./pages/shop/ShopProducts";
import ShopLayout from "./components/shop/ShopLayout";

// halaman user
import Address from "./pages/user/Address";
import Settings from "./pages/user/Settings";
import Transactions from "./pages/user/Transactions";
import UserLayout from "./components/user/UserLayout";

// halaman store untuk seller
import Sales from "./pages/store/Sales";
import Orders from "./pages/store/Orders";
import Profile from "./pages/store/Profile";
import Products from "./pages/store/Products";
import Notifications from "./pages/store/Notifications";
import ProductsAdd from "./components/dashboard/ProductsAdd";
import ProductsList from "./components/dashboard/ProductsList";
import DashboardLayout from "./components/dashboard/DashboardLayout";

import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import { useAuthStore } from "./store/useAuthStore";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthRoute, NonAuthRoute, SellerRoute } from "./middleware";
import { Toaster } from "react-hot-toast";

function App() {
  const { authCheck, checkingAuth } = useAuthStore();
  useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (checkingAuth) return <PageLoading />;

  return (
    <>
      <Toaster />
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
          <Route path=":shopname" element={<ShopLayout />}>
            <Route index element={<ShopInfo />} />
            <Route path="products" element={<ShopProducts />} />
          </Route>
          <Route path="search" element={<SearchResult />} />
          <Route path=":shopname/:slug" element={<ProductDetail />} />
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

        {/* store */}
        <Route
          path="/store"
          element={
            <SellerRoute>
              <DashboardLayout />
            </SellerRoute>
          }
        >
          <Route path="*" element={<NotFound />} />
          <Route path="sales" element={<Sales />} />
          <Route path="order" element={<Orders />} />
          <Route path="products" element={<Products />}>
            <Route path="add" element={<ProductsAdd />} />
            <Route index element={<ProductsList />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="notification" element={<Notifications />} />
          <Route index element={<Navigate to="sales" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
