// import { Fragment } from "react";
// import { Navigate } from "react-router-dom";
// import { useProvider } from "@/context/GlobalProvider";

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
