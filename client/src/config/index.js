const province = [
  'Sumatera Utara',
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
];

const city = ['Medan', 'Jakarta', 'Bandung', 'Semarang', 'Surabaya'];

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

export const checkoutState = {
  address: null,
  orders: [],
};

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
    component: 'input-text',
  },
  {
    name: 'password',
    label: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    component: 'input-text',
  },
];

export const registerState = {
  fullname: '',
  email: '',
  password: '',
  otp: '',
};

export const sortState = {
  sortBy: '',
  orderBy: 'asc',
  page: 1,
};

export const registerControl = [
  {
    name: 'email',
    label: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    component: 'input-text',
    disabled: true,
  },

  {
    name: 'fullname',
    label: 'fullname',
    type: 'text',
    placeholder: 'Enter your full name',
    component: 'input-text',
  },

  {
    name: 'password',
    label: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    component: 'input-text',
  },
];

export const sendOTPControl = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    component: 'input-text',
  },
];

export const verifyOTPControl = [
  {
    name: 'otp',
    label: 'OTP Code',
    type: 'text',
    placeholder: 'Enter the OTP code',
    component: 'input-number',
    maxLength: 6,
  },
];

export const filterControl = [
  {
    name: 'category',
    label: 'select category',
    type: 'checkbox',
    component: 'multiple-checked',
  },
  {
    name: 'city',
    label: 'select city',
    type: 'checkbox',
    component: 'multiple-checked',
    option: city,
  },
  {
    name: 'minPrice',
    label: 'minimum price',
    type: 'number',
    component: 'input-number',
    maxLength: 10,
  },
  {
    name: 'maxPrice',
    label: 'maximum price',
    type: 'number',
    component: 'input-number',
    maxLength: 10,
  },
];

export const searchState = {
  search: '',
  category: [],
  city: [],
  minPrice: '',
  maxPrice: '',
  sortBy: '',
  orderBy: '',
  page: 1,
  limit: 10,
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

export const productState = {
  name: '',
  categoryId: '',
  description: '',
  price: '',
  stock: 1,
  images: [],
};

export const productControl = [
  {
    name: 'images',
    label: 'images',
    placeholder: 'Maksimum 5 Images and less than 1mb each',
    component: 'multi-upload',
  },
  {
    name: 'name',
    label: 'product name',
    type: 'text',
    placeholder: 'Enter your product name ...',
    component: 'input-text',
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
    type: 'number',
    placeholder: 'Set the price',
    component: 'input-number',
  },
  {
    name: 'stock',
    label: 'stock',
    type: 'number',
    placeholder: 'Set the stock',
    component: 'input-number',
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

// change to a new feature :
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
    component: 'input-text',
  },
  {
    name: 'description',
    label: 'description',
    type: 'text',
    placeholder: 'Write a short description of your store',
    component: 'textarea',
    maxLength: 400,
  },
  {
    name: 'city',
    label: 'city',
    type: 'select',
    placeholder: 'Select your city',
    component: 'select',
    option: city,
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
    component: 'input-text',
  },
  {
    name: 'birthday',
    label: 'birthday',
    type: 'date',
    placeholder: 'Add your birthday',
    component: 'date',
  },
  {
    name: 'gender',
    label: 'gender',
    type: 'select',
    placeholder: 'Select your gender',
    component: 'select',
    option: ['male', 'female'],
  },
  {
    name: 'phone',
    label: 'phone',
    type: 'tel',
    placeholder: 'Add your phone',
    component: 'input-number',
    maxLength: 13,
  },
];

export const addressState = {
  name: '',
  isMain: false,
  address: '',
  province: '',
  city: '',
  zipcode: '',
  phone: '',
  district: '',
};

export const addressControl = [
  {
    name: 'name',
    label: 'name',
    type: 'text',
    placeholder: 'Enter receipient name',
    component: 'input-text',
  },
  {
    name: 'address',
    label: 'address',
    type: 'text',
    placeholder: 'Enter receipient address',
    component: 'textarea',
    maxLength: 200,
  },
  {
    name: 'province',
    label: 'province',
    type: 'select',
    placeholder: 'Enter receipient province',
    component: 'select',
    option: province,
  },
  {
    name: 'city',
    label: 'city',
    type: 'select',
    placeholder: 'Enter receipient city',
    component: 'select',
    option: city,
  },
  {
    name: 'zipcode',
    label: 'zipcode',
    type: 'number',
    placeholder: 'Enter receipient zipcode',
    component: 'input-number',
    maxLength: 6,
  },

  {
    name: 'phone',
    label: 'phone number',
    type: 'tel',
    placeholder: 'Enter receipient phone',
    component: 'input-number',
    maxLength: 13,
  },
  {
    name: 'isMain',
    label: 'set as main address',
    type: 'checkbox',
    component: 'single-checked',
  },
];
