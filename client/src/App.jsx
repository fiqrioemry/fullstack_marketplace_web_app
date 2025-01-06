import { Route, Routes } from "react-router-dom";
import OpenStore from "./pages/OpenStore";
import SignIn from "./pages/SignIn";
import ProductCategory from "./pages/ProductCategory";
import Category from "./pages/Category";
import SignUp from "./pages/SignUp";
import SearchResult from "./pages/SearchResult";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element></Route>
        <Route path="/category" element={<Category />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/:storename" element={<Store />} />
        <Route path="/:storename/:product" element={<Store />} />
        <Route path="/category/:category" element={<ProductCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/cart/checkout" element={<Checkout />} />

        {/* auth route */}
        <Route path="/open-shop" element={<OpenStore />} />
      </Routes>
    </>
  );
}

export default App;
