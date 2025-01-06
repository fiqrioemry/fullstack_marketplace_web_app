import Header from "./Header";
import Footer from "./Footer";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import SellerNavigation from "../navigation/SellerNavigation";

const SellerLayout = () => {
  return (
    <Fragment>
      <Header />
      <div className="flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <SellerNavigation />
          <Outlet />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default SellerLayout;
