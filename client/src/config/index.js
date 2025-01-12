const provinceData = [
  {
    id: 1,
    name: "Sumatera Utara",
  },
  {
    id: 2,
    name: "DKI Jakarta",
  },
  {
    id: 3,
    name: "Jawa Barat",
  },
  {
    id: 4,
    name: "Jawa Tengah",
  },
  {
    id: 5,
    name: "Jawa Timur",
  },
];

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

export const controlFilterCategory = [
  {
    name: "category",
    label: "category",
    type: "checkbox",
    style: "flex items-center capitalize",
    componentType: "checkbox",
  },
];

export const controlFilterCity = [
  {
    name: "city",
    label: "city",
    type: "checkbox",
    style: "flex items-center capitalize",
    componentType: "checkbox",
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

export const initialProfileForm = {
  fullname: "",
  birthday: "",
  gender: "",
  phone: "",
  email: "",
  avatar: "",
};

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

// address
export const initialAddressForm = {
  name: "",
  isMain: false,
  address: "",
  province: "",
  city: "",
  zipcode: "",
  phone: "",
};

export const controlAddressForm = [
  {
    name: "name",
    label: "name",
    type: "text",
    placeholder: "Enter receipient name",
    style: "flex items-center capitalize",
    componentType: "input",
  },
  {
    name: "address",
    label: "address",
    type: "text",
    placeholder: "Enter receipient address",
    style: "flex items-center capitalize",
    componentType: "textarea",
  },
  {
    name: "province",
    label: "province",
    type: "select",
    placeholder: "Enter receipient province",
    style: "flex items-center capitalize",
    componentType: "select",
    options: provinceData,
  },
  {
    name: "city",
    label: "city",
    type: "select",
    placeholder: "Enter receipient city",
    style: "flex items-center capitalize",
    componentType: "select",
  },
  {
    name: "zipcode",
    label: "zipcode",
    type: "text",
    placeholder: "Enter receipient zipcode",
    style: "flex items-center capitalize",
    componentType: "input",
    maxlength: "6",
  },

  {
    name: "phone",
    label: "phone number",
    type: "tel",
    placeholder: "Enter receipient phone",
    style: "flex items-center capitalize",
    componentType: "input",
    maxlength: "13",
  },

  {
    name: "isMain",
    value: true,
    label: "Set as main address",
    type: "checkbox",
    style: "flex items-center capitalize",
    componentType: "binary",
  },
];
