import { authInstance, publicInstance } from '.';
const errorHandle = (error) => {
  const errorMessage = error.response?.data?.message;
  return Promise.reject(new Error(errorMessage));
};

const callApi = {
  login: async (formData) => {
    return publicInstance
      .post('/auth/login', formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  logout: async () => {
    return authInstance
      .post('/auth/logout')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  register: async (formData) => {
    return publicInstance
      .post('/auth/register', formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  sendOTP: async (formData) => {
    return publicInstance
      .post('/auth/send-otp', formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  verifyOTP: async (formData) => {
    return publicInstance
      .post('/auth/verify-otp', formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  refreshToken: async () => {
    return publicInstance
      .post('/auth/refresh')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  resetPassword: async (token, formData) => {
    return publicInstance
      .put(`/auth/reset/${token}`, formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  authCheck: async () => {
    return authInstance
      .get('/auth/me')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getProfile: async () => {
    return authInstance
      .get('/user/profile')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  updateProfile: async (formData) => {
    return authInstance
      .put('/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getAddress: async () => {
    return authInstance
      .get('/user/profile/address')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  addAddress: async (formData) => {
    return authInstance
      .post('/user/profile/address', formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  updateAddress: async (formData, addressId) => {
    return authInstance
      .put(`/user/profile/address/${addressId}`, formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  deleteAddress: async (addressId) => {
    return authInstance
      .delete(`/user/profile/address/${addressId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  //   product and store API management :
  getProduct: async (slug) => {
    return authInstance
      .get(`/product/${slug}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getProducts: async ({
    search = '',
    category = [''],
    city = [''],
    minPrice = '',
    maxPrice = '',
    sortBy = '',
    page = 1,
    orderBy = 'asc',
    limit = 10,
  }) => {
    const searchParams = new URLSearchParams({
      search,
      minPrice,
      maxPrice,
      sortBy,
      orderBy,
      page,
      limit,
      city: city.join(','),
      category: category.join(','),
    }).toString();
    return authInstance
      .get(`/product?${searchParams}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  searchProducts: async (search) => {
    return authInstance
      .get(`/product?search=${search}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getCategories: async () => {
    return authInstance
      .get('/category')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getStoreInfo: async (shopname) => {
    return authInstance
      .get(`/store/${shopname}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getStoreProfile: async () => {
    return authInstance
      .get(`/store`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  getStoreProduct: async ({
    sortBy = 'createdAt',
    orderBy = 'desc',
    page = 1,
    limit = 5,
    search = '',
  }) => {
    return authInstance
      .get(
        `/store/product?search=${encodeURIComponent(
          search,
        )}&sortBy=${sortBy}&orderBy=${orderBy}&page=${page}&limit=${limit}}`,
      )
      .then((res) => res.data)
      .catch(errorHandle);
  },

  createProduct: async (formData) => {
    return authInstance
      .post('/store/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
      .catch(errorHandle);
  },

  updateProduct: async (formData, productId) => {
    return authInstance
      .put(`/store/product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
      .catch(errorHandle);
  },

  deleteProduct: async (productId) => {
    return authInstance
      .delete(`/store/product/${productId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  createStore: async (formData) => {
    return authInstance
      .post('/auth/open-store', formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  //   cart API management :
  getCarts: async () => {
    return authInstance
      .get('/cart')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  addCart: async (productId, quantity) => {
    return authInstance
      .post('/cart', { productId, quantity })
      .then((res) => res.data)
      .catch(errorHandle);
  },

  updateCart: async (cartId, quantity) => {
    return authInstance
      .put(`/cart/${cartId}`, { quantity })
      .then((res) => res.data)
      .catch(errorHandle);
  },

  removeCart: async (cartId) => {
    return authInstance
      .delete(`/cart/${cartId}`)
      .then((res) => res.data)
      .catch(errorHandle);
  },

  //   cart API management :
  getOrders: async () => {
    return authInstance
      .get('/order')
      .then((res) => res.data)
      .catch(errorHandle);
  },

  createNewOrder: async (formData) => {
    return authInstance
      .post('/order', formData)
      .then((res) => res.data)
      .catch(errorHandle);
  },
};

export default callApi;
