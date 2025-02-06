import Header from "./Header";
import Footer from "./Footer";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default MainLayout;
