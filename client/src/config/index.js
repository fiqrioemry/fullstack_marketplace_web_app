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
  fullname: "",
  email: "",
  password: "",
  otp: "",
};

export const initialOpenStoreForm = {
  name: "",
  description: "",
  city: "",
  category: "",
};

export const ControlOpenStoreForm = [
  {
    name: "name",
    label: "name",
    type: "text",
    placeholder: "Enter your store name",
    style: "flex items-center capitalize",
    componentType: "input",
  },
  {
    name: "description",
    label: "description",
    type: "text",
    placeholder: "Write a short description of your store",
    style: "flex items-center capitalize",
    componentType: "textarea",
  },
  {
    name: "city",
    label: "city",
    type: "select",
    placeholder: "Select your city",
    style: "flex items-center capitalize",
    componentType: "select",
  },
  {
    name: "category",
    label: "category",
    type: "select",
    placeholder: "Select your category",
    style: "flex items-center capitalize",
    componentType: "select",
  },
];

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
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    style: "flex items-center",
  },

  {
    name: "fullname",
    type: "text",
    placeholder: "Enter your full name",
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

export const shipmentMethods = [
  {
    method: "nextday",
    time: "Estimated Time Today or Tomorrow",
    price: 5.99,
  },
  {
    method: "regular",
    time: "Estimated Time 4 - 7 Days",
    price: 3.99,
  },
  {
    method: "cargo",
    time: "Estimated Time 1 - 2 Weeks",
    price: 1.99,
  },
];
