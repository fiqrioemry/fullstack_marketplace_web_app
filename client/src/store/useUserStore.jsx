import { create } from "zustand";
import toast from "react-hot-toast";
import callApi from "@/api/callApi";

export const useUserStore = create((set, get) => ({
  order: null,
  orders: null,
  profile: null,
  address: null,
  shipment: null,
  transaction: null,
  transactions: null,
  notifications: null,
  loading: false,

  getProfile: async () => {
    set({ profile: null });
    try {
      const { profile } = await callApi.getProfile();
      set({ profile });
    } catch (error) {
      console.log(error.message);
    }
  },

  updateProfile: async (formData) => {
    set({ loading: true });
    try {
      const { message, updatedProfile } = await callApi.updateProfile(formData);
      set({ profile: updatedProfile });
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getAddress: async () => {
    try {
      const { address } = await callApi.getAddress();
      set({ address });
    } catch (error) {
      console.log(error.message);
    }
  },

  addAddress: async (formData) => {
    try {
      set({ loading: true });
      const { message, newAddress } = await callApi.addAddress(formData);
      get().setNewAddress(newAddress);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  setNewAddress: (newAddress) => {
    set((state) => ({
      address: newAddress.isMain
        ? state.address
            .map((add) => ({ ...add, isMain: false }))
            .concat(newAddress)
        : [...state.address, newAddress],
    }));
  },

  updateAddress: async (formData, addressId) => {
    try {
      set({ loading: true });
      const { message, updatedAddress } = await callApi.updateAddress(
        formData,
        addressId
      );

      get().setUpdatedAddress(addressId, updatedAddress);

      toast.success(message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ loading: false });
    }
  },

  setUpdatedAddress: (addressId, updatedAddress) => {
    set((state) => ({
      address: state.address.map((add) =>
        add.id === addressId
          ? updatedAddress
          : updatedAddress.isMain
          ? { ...add, isMain: false }
          : add
      ),
    }));
  },

  deleteAddress: async (addressId) => {
    try {
      set({ loading: true });
      const { message } = await callApi.deleteAddress(addressId);
      get().setDeletedAddress(addressId);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  setDeletedAddress: (addressId) => {
    set((state) => ({
      address: state.address.filter((add) => add.id !== addressId),
    }));
  },

  // customer transactions and orders management
  getAllUserOrders: async (params) => {
    set({ orders: null });
    try {
      const { orders } = await callApi.getAllUserOrders(params);
      set({ orders });
    } catch (error) {
      console.log(error.message);
    }
  },

  getUserOrderDetail: async (orderId) => {
    set({ order: null });
    try {
      const { order } = await callApi.getUserOrderDetail(orderId);
      set({ order });
    } catch (error) {
      console.log(error.message);
    }
  },

  cancelTransaction: async (formData, transactionId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.cancelTransaction(
        formData,
        transactionId
      );
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  cancelUserOrder: async (formData, orderId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.cancelUserOrder(formData, orderId);
      toast.success(message);
      await get().getAllUserOrders();
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  confirmOrderDelivery: async (formData, orderId) => {
    set({ loading: true });
    try {
      const { message } = await callApi.confirmOrderDelivery(formData, orderId);
      toast.success(message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getShipmentDetail: async (orderId) => {
    set({ shipment: null });
    try {
      const { shipment } = await callApi.getShipmentDetail(orderId);
      set({ shipment });
    } catch (error) {
      console.error(error.message);
    }
  },

  getAllTransactions: async (params) => {
    set({ transactions: null });
    try {
      const { transactions } = await callApi.getAllTransactions(params);
      set({ transactions });
    } catch (error) {
      console.error(error.message);
    }
  },

  getTransactionDetail: async (transactionId) => {
    set({ transaction: null });
    try {
      const { transaction } = await callApi.getTransactionDetail(transactionId);
      set({ transaction });
    } catch (error) {
      console.error(error.message);
    }
  },

  createNewTransaction: async (formData) => {
    set({ loading: true });

    try {
      const { message, transactionUrl } = await callApi.createNewTransaction(
        formData
      );
      if (transactionUrl) {
        window.location.href = transactionUrl;
      }

      toast.success(message);
    } catch (error) {
      console.error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  getUserNotifications: async () => {
    set({ notifications: null });
    try {
      const { notifications } = await callApi.getUserNotifications();
      set({ notifications });
    } catch (error) {
      toast.error(error.message);
    }
  },
}));
