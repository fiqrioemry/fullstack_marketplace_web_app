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
        <div className="max-w-4xl w-full md:py-6 py-4 md:space-y-8 space-y-6 md:px-0 px-4">
          <CustomerNavigation />
          <Outlet />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default CustomerLayout;
