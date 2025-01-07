export const nonAuthPath = [
  "/signin",
  "/signup",
  "/",
  "/:storename",
  "/search",
  "/:storename/:slug",
  "/category",
  "/category/:slug",
];

export const customerAuthPath = [
  "/user",
  "/user/settings",
  "/user/address",
  "/user/transaction",
];

export const ShopAuthPath = [
  "/shop",
  "/shop/settings",
  "/shop/notification",
  "/shop/order",
];

export const CustomerNavLinks = [
  {
    title: "settings",
    href: "/user/settings",
  },
  {
    title: "address",
    href: "/user/address",
  },
  {
    title: "transaction",
    href: "/user/transaction",
  },
];

export const SellerNavLinks = [
  {
    title: "settings",
    href: "/shop/settings",
  },
  {
    title: "notification",
    href: "/shop/notification",
  },
  {
    title: "order",
    href: "/shop/order",
  },
];

export const initialSignInForm = {
  email: "",
  password: "",
};

export const initialSignUpForm = {
  username: "",
  fullname: "",
  email: "",
  password: "",
};

export const controlSignInForm = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email ",
    style: "flex items-center capitalize",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password ",
    style: "flex items-center capitalize",
  },
];

export const controlSignUpForm = [
  {
    name: "username",
    type: "text",
    placeholder: "Enter your username",
    style: "flex items-center",
  },
  {
    name: "fullname",
    type: "text",
    placeholder: "Enter your full name",
    style: "flex items-center",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    style: "flex items-center",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    style: "flex items-center",
  },
];

export const initialSearchForm = {
  query: "",
  category: [],
  city: [],
  minPrice: "",
  maxPrice: "",
  sortBy: "",
  page: "",
  order: "",
};
