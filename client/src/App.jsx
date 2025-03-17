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

// halaman customer
import Address from "./pages/customer/Address";
import Transactions from "./pages/customer/Transactions";
import CustomerOrders from "./pages/customer/CustomerOrders";
import CustomerProfile from "./pages/customer/CustomerProfile";
import CustomerLayout from "./components/customer/CustomerLayout";
import CustomerOrderDetail from "./components/customer/orders/CustomerOrderDetail";
import TransactionDetail from "./components/customer/transactions/TransactionDetail";

// halaman store untuk seller
import Statistics from "./pages/seller/Statistics";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerProfile from "./pages/seller/SellerProfile";
import SellerProducts from "./pages/seller/SellerProducts";
import SellerLayout from "./components/seller/SellerLayout";
import ProductsAdd from "./components/seller/products/ProductsAdd";
import ProductsList from "./components/seller/products/ProductsList";
import SellerNotifications from "./pages/seller/SellerNotifications";
import SellerOrderDetail from "./components/seller/orders/SellerOrderDetail";

// halaman untuk admin
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminShipment from "./pages/admin/AdminShipment";
import AdminLayout from "./components/admin/AdminLayout";
import AdminCategories from "./pages/admin/AdminCategories";

// middleware and hooks
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import useAuthChecking from "./hooks/useAuthChecking";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminRoute, AuthRoute, NonAuthRoute, SellerRoute } from "./middleware";
import Testing from "./pages/Testing";

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
        <Route path="testing" element={<Testing />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":shopname" element={<ShopLayout />}>
            <Route index element={<ShopInfo />} />
            <Route path="products" element={<ShopProducts />} />
          </Route>
          <Route path="products" element={<ProductsPreview />} />
          <Route path=":shopname/:slug" element={<ProductDetail />} />

          {/* customer */}
          <Route
            path="user"
            element={
              <AuthRoute>
                <CustomerLayout />
              </AuthRoute>
            }
          >
            <Route path="address" element={<Address />} />
            <Route path="orders" element={<CustomerOrders />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="transactions" element={<Transactions />} />
            <Route index element={<Navigate to="profile" replace />} />
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

        {/* seller */}
        <Route
          path="/store"
          element={
            <SellerRoute>
              <SellerLayout />
            </SellerRoute>
          }
        >
          <Route index element={<Statistics />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="products" element={<SellerProducts />}>
            <Route index element={<ProductsList />} />
            <Route path="add" element={<ProductsAdd />} />
          </Route>
          <Route path="profile" element={<SellerProfile />} />
          <Route path="notifications" element={<SellerNotifications />} />
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
          <Route
            path="/store/orders/:orderId"
            element={<SellerOrderDetail />}
          />
          <Route
            path="/user/orders/:orderId"
            element={<CustomerOrderDetail />}
          />
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
