// halaman-halaman utama
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import OpenStore from "./pages/OpenStore";
import ProductDetail from "./pages/ProductDetail";
import ProductsPreview from "./pages/ProductsPrevew";
import PageLoading from "./components/loading/PageLoading";

// halaman shop
import ShopInfo from "./pages/shop/ShopInfo";
import ShopProducts from "./pages/shop/ShopProducts";
import ShopLayout from "./components/shop/ShopLayout";

// halaman user
import Address from "./pages/user/Address";
import Account from "./pages/user/Account";
import UserOrders from "./pages/user/UserOrders";
import Transactions from "./pages/user/Transactions";
import UserLayout from "./components/user/UserLayout";
import UserOrderDetail from "./components/user/orders/UserOrderDetail";
import TransactionDetail from "./components/user/transactions/TransactionDetail";

// halaman store untuk seller
import Orders from "./pages/store/Orders";
import Profile from "./pages/store/Profile";
import Products from "./pages/store/Products";
import Statistics from "./pages/store/Statistics";
import Notifications from "./pages/store/Notifications";
import OrderDetail from "./components/dashboard/orders/OrderDetail";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import ProductsAdd from "./components/dashboard/products/ProductsAdd";
import ProductsList from "./components/dashboard/products/ProductsList";

// middleware and hooks
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import useAuthChecking from "./hooks/useAuthChecking";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminRoute, AuthRoute, NonAuthRoute, SellerRoute } from "./middleware";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminShipment from "./pages/admin/AdminShipment";
import AdminLayout from "./components/admin/AdminLayout";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCategories from "./pages/admin/AdminCategories";

function App() {
  const { checkingAuth, location, background } = useAuthChecking();

  if (checkingAuth) return <PageLoading />;

  return (
    <>
      <Toaster />
      <Routes location={background || location}>
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
          <Route path="products" element={<ProductsPreview />} />
          <Route path=":shopname/:slug" element={<ProductDetail />} />
          <Route
            path="user"
            element={
              <AuthRoute>
                <UserLayout />
              </AuthRoute>
            }
          >
            <Route path="address" element={<Address />} />
            <Route path="settings" element={<Account />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="transactions" element={<Transactions />} />
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
          <Route index element={<Statistics />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />}>
            <Route index element={<ProductsList />} />
            <Route path="add" element={<ProductsAdd />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="shipments" element={<AdminShipment />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/store/orders/:orderId" element={<OrderDetail />} />
          <Route path="/user/orders/:orderId" element={<UserOrderDetail />} />
          <Route
            path="/user/transactions/:transactionId"
            element={<TransactionDetail />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
