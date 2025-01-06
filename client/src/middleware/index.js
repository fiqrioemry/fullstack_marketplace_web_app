// import { Fragment } from "react";
// import { Navigate } from "react-router-dom";
// import { useProvider } from "@/context/GlobalProvider";

// const nonAuthPath = [
//   "/signin",
//   "/signup",
//   "/",
//   "/:storename",
//   "/search",
//   "/:storename/:slug",
//   "/category",
//   "/category/:slug",
// ];
// const customerAuthPath = [
//   "/user",
//   "/user/settings",
//   "/user/address",
//   "/user/transaction",
// ];

// const sellerAuthPath = [
//   "/seller",
//   "/seller/settings",
//   "/seller/notification",
//   "/seller/order",
// ];

// export const NonAuthRoute = ({ children }) => {
//   const isUserAuth = null;

//   // if user auth and access login page
//   if (isUserAuth && nonAuthPath.includes(currentPath))
//     return <Navigate to="/" />;

//   if (!userData && authPath.includes(currentPath))
//     return <Navigate to="/signin" />;

//   return <Fragment>{children}</Fragment>;
// };

// export const CustomerAuthRoute = ({ children }) => {
//   const { currentPath, isUserAuth, userData } = useProvider();

//   if (isUserAuth) return null;

//   if (userData && nonAuthPath.includes(currentPath)) return <Navigate to="/" />;

//   if (!userData && authPath.includes(currentPath))
//     return <Navigate to="/signin" />;

//   return <Fragment>{children}</Fragment>;
// };

// export const SellerAuthRoute = ({ children }) => {
//   const { currentPath, isUserAuth, userData } = useProvider();

//   if (isUserAuth) return null;

//   if (userData && nonAuthPath.includes(currentPath)) return <Navigate to="/" />;

//   if (!userData && authPath.includes(currentPath))
//     return <Navigate to="/signin" />;

//   return <Fragment>{children}</Fragment>;
// };
