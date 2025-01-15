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

// signin state and control
export const initialSignInForm = {
  email: "",
  password: "",
};

export const controlSignInForm = [
  {
    name: "email",
    type: "email",
    label: "email",
    placeholder: "Enter your email",
    style: "flex items-center capitalize",
  },
  {
    name: "password",
    label: "password",
    type: "password",
    placeholder: "Enter your password",
    style: "flex items-center capitalize",
  },
];

// signup state and control
export const initialSignUpForm = {
  fullname: "",
  email: "",
  password: "",
  otp: "",
};

export const controlSignUpForm = [
  {
    name: "email",
    label: "email",
    type: "email",
    placeholder: "Enter your email",
  },

  {
    name: "fullname",
    label: "fullname",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "password",
    label: "password",
    type: "password",
    placeholder: "Enter your password",
  },
];

// open store state and control
export const initialOpenStoreForm = {
  name: "",
  description: "",
  city: "",
};

export const ControlOpenStoreForm = [
  {
    name: "name",
    label: "store name",
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
];

export const controlFilterCategory = [
  {
    name: "category",
    label: "category",
    type: "checkbox",
    style: "flex items-center capitalize",
    componentType: "checkbox",
    method: "multiple",
  },
];

export const controlFilterCity = [
  {
    name: "city",
    label: "city",
    type: "checkbox",
    style: "flex items-center capitalize",
    componentType: "checkbox",
    method: "multiple",
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

export const controlProfileForm = [
  {
    name: "fullname",
    label: "fullname",
    type: "text",
    placeholder: "Enter your fullname",
    style: "flex items-center capitalize",
    componentType: "input",
  },
  {
    name: "birthday",
    label: "birthday",
    type: "date",
    placeholder: "Add your birthday",
    style: "flex items-center capitalize",
    componentType: "input",
  },
  {
    name: "gender",
    label: "gender",
    type: "select",
    placeholder: "Add your gender",
    style: "flex items-center capitalize",
    componentType: "select",
    options: ["male", "female"],
  },
  {
    name: "phone",
    label: "phone",
    type: "text",
    placeholder: "Add your phone",
    style: "flex items-center capitalize",
    componentType: "input",
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
    maxLength: "6",
  },

  {
    name: "phone",
    label: "phone number",
    type: "tel",
    placeholder: "Enter receipient phone",
    style: "flex items-center capitalize",
    componentType: "input",
    maxLength: "13",
  },

  {
    name: "isMain",
    value: true,
    type: "checkbox",
    method: "single",
    label: "Set as main address",
    style: "flex items-center capitalize",
    componentType: "checkbox",
  },
];

export const controlEditAddressForm = [
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
    maxLength: "6",
  },

  {
    name: "phone",
    label: "phone number",
    type: "tel",
    placeholder: "Enter receipient phone",
    style: "flex items-center capitalize",
    componentType: "input",
    maxLength: "13",
  },
];

export const initialOrderForm = {
  productId: [],
  quantity: [],
  shipmentCost: [],
};

export const initialProductState = {
  name: "",
  categoryId: "",
  description: "",
  price: "",
  stock: "",
  files: "",
};

export const controlProductForm = [
  {
    name: "name",
    label: "product name",
    type: "text",
    placeholder: "Enter your product name ...",
    style: "flex items-center capitalize",
    componentType: "input",
  },
  {
    name: "description",
    label: "description",
    type: "text",
    placeholder: "Describe about your product ...",
    style: "flex items-center capitalize",
    componentType: "textarea",
  },
  {
    name: "price",
    label: "price",
    type: "number",
    placeholder: "Set the price",
    style: "flex items-center capitalize",
    componentType: "input",
  },
  {
    name: "stock",
    label: "stock",
    type: "number",
    placeholder: "Set the stock",
    style: "flex items-center capitalize",
    componentType: "input",
  },
  {
    name: "categoryId",
    label: "category",
    type: "text",
    placeholder: "Choose product category",
    style: "flex items-center capitalize",
    componentType: "select",
  },
];
