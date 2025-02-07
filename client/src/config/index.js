const province = [
  'Sumatera Utara',
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
];

const city = ['Medan', 'Jakarta', 'Bandung', 'Semarang', 'Jawa Timur'];

export const CustomerNavLinks = [
  {
    title: 'profile',
    href: '/user/profile',
  },
  {
    title: 'address',
    href: '/user/address',
  },
  {
    title: 'transaction',
    href: '/user/transaction',
  },
];

export const SellerNavLinks = [
  {
    title: 'dashboard',
    href: '/store',
  },

  {
    title: 'profile',
    href: '/store/profile',
  },
  {
    title: 'products',
    href: '/store/products',
  },
  {
    title: 'order',
    href: '/store/order',
  },
  {
    title: 'notification',
    href: '/store/notifications',
  },
];

export const loginState = {
  email: '',
  password: '',
};

export const loginControl = [
  {
    name: 'email',
    type: 'email',
    label: 'email',
    placeholder: 'Enter your email',
    component: 'input',
  },
  {
    name: 'password',
    label: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    component: 'input',
  },
];

export const registerState = {
  fullname: '',
  email: '',
  password: '',
  otp: '',
};

export const sendOTPControl = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    component: 'input',
  },
];

export const verifyOTPControl = [
  {
    name: 'otp',
    label: 'OTP Code',
    type: 'text',
    component: 'input',
  },
];

export const registerControl = [
  {
    name: 'email',
    label: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    component: 'input',
    disabled: true,
  },

  {
    name: 'name',
    label: 'fullname',
    type: 'text',
    placeholder: 'Enter your full name',
    component: 'input',
  },

  {
    name: 'password',
    label: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    component: 'input',
  },
];

// open store state and control
export const openStoreState = {
  name: '',
  description: '',
  city: '',
};

export const openStoreControl = [
  {
    name: 'name',
    label: 'store name',
    type: 'text',
    placeholder: 'Enter your store name',
    component: 'input',
  },
  {
    name: 'description',
    label: 'description',
    type: 'text',
    placeholder: 'Write a short description of your store',
    component: 'textarea',
  },
  {
    name: 'city',
    label: 'city',
    type: 'select',
    placeholder: 'Select your city',
    component: 'select',
    options: city,
  },
];

export const productFilterState = {
  search: '',
  page: '',
  orderBy: 'desc',
  sortBy: 'createdAt',
};

export const filterControl = [
  {
    name: 'category',
    label: 'category',
    type: 'checkbox',
    component: 'checkbox-multiple',
  },
  {
    name: 'city',
    label: 'city',
    type: 'checkbox',
    component: 'checkbox-multiple',
  },
];

export const profileState = {
  fullname: '',
  birthday: '',
  gender: '',
  phone: '',
  email: '',
  avatar: '',
};

export const profileControl = [
  {
    name: 'fullname',
    label: 'fullname',
    type: 'text',
    placeholder: 'Enter your fullname',
    component: 'input',
  },
  {
    name: 'birthday',
    label: 'birthday',
    type: 'date',
    placeholder: 'Add your birthday',
    component: 'input',
  },
  {
    name: 'gender',
    label: 'gender',
    type: 'select',
    placeholder: 'Select your gender',
    component: 'select',
    options: ['male', 'female'],
  },
  {
    name: 'phone',
    label: 'phone',
    type: 'text',
    placeholder: 'Add your phone',
    component: 'input',
  },
];

export const searchState = {
  search: '',
  category: [],
  city: [],
  minPrice: '',
  maxPrice: '',
  sortBy: '',
  page: '',
  orderBy: '',
};

export const shipmentMethods = [
  {
    method: 'nextday',
    time: 'Estimated Time Today or Tomorrow',
    price: 5.99,
  },
  {
    method: 'regular',
    time: 'Estimated Time 4 - 7 Days',
    price: 3.99,
  },
  {
    method: 'cargo',
    time: 'Estimated Time 1 - 2 Weeks',
    price: 1.99,
  },
];

// address
export const addressState = {
  name: '',
  isMain: false,
  address: '',
  province: '',
  city: '',
  zipcode: '',
  phone: '',
};

export const addressControl = [
  {
    name: 'name',
    label: 'name',
    type: 'text',
    placeholder: 'Enter receipient name',
    component: 'input',
  },
  {
    name: 'address',
    label: 'address',
    type: 'text',
    placeholder: 'Enter receipient address',
    component: 'textarea',
  },
  {
    name: 'province',
    label: 'province',
    type: 'select',
    placeholder: 'Enter receipient province',
    component: 'select',
    options: province,
  },
  {
    name: 'city',
    label: 'city',
    type: 'select',
    placeholder: 'Enter receipient city',
    component: 'select',
    options: city,
  },
  {
    name: 'zipcode',
    label: 'zipcode',
    type: 'text',
    placeholder: 'Enter receipient zipcode',
    component: 'input',
    maxLength: '6',
  },

  {
    name: 'phone',
    label: 'phone number',
    type: 'tel',
    placeholder: 'Enter receipient phone',
    component: 'input',
    maxLength: '13',
  },
  {
    name: 'isMain',
    label: 'set as main address',
    type: 'checkbox',
    component: 'checkbox-single',
  },
];

export const orderState = {
  productId: [],
  quantity: [],
  shipmentCost: [],
};

export const productState = {
  name: '',
  categoryId: '',
  description: '',
  price: 0,
  stock: 0,
  files: [],
};

export const productControl = [
  {
    name: 'images',
    label: 'file',
    placeholder: 'Maksimum 5 Images and less than 1mb each',
    component: 'upload',
  },
  {
    name: 'name',
    label: 'product name',
    type: 'text',
    placeholder: 'Enter your product name ...',
    component: 'input',
  },
  {
    name: 'description',
    label: 'description',
    type: 'text',
    placeholder: 'Describe about your product ...',
    component: 'textarea',
  },
  {
    name: 'price',
    label: 'price',
    type: 'text',
    placeholder: 'Set the price',
    component: 'input',
  },
  {
    name: 'stock',
    label: 'stock',
    type: 'text',
    placeholder: 'Set the stock',
    component: 'input',
  },
  {
    name: 'categoryId',
    label: 'category',
    type: 'text',
    placeholder: 'Choose product category',
    component: 'select',
  },
];
export const storeProductFilterState = {
  sortBy: 'createdAt',
  orderBy: 'desc',
  page: 1,
  limit: 5,
  search: '',
};
