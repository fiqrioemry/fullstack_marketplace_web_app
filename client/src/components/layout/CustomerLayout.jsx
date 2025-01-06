import Header from "./Header";
import Footer from "./Footer";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import CustomerNavigation from "../navigation/CustomerNavigation";

const CustomerLayout = () => {
  return (
    <Fragment>
      <Header />
      <div className="flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <CustomerNavigation />
          <Outlet />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default CustomerLayout;
