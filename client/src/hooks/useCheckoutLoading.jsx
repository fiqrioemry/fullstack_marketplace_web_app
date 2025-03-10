/* eslint-disable react-hooks/exhaustive-deps */
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";

export const useCheckoutLoading = () => {
  const navigate = useNavigate();
  const hasRedirected = useRef(false);
  const { getAddress, address } = useUserStore();
  const { checkoutItem, getCarts, cart } = useCartStore();

  useEffect(() => {
    getCarts();
    getAddress();
  }, [getCarts, getAddress]);

  useEffect(() => {
    if (!cart || !address || hasRedirected.current) return;

    const redirectConfig = [
      {
        condition: cart.length === 0,
        message: "Your cart is empty.",
        path: "/cart",
      },
      {
        condition: address.length === 0,
        message: "No shipping address found.",
        path: "/user/address",
      },
      {
        condition: checkoutItem.length === 0,
        message: "No items selected for checkout.",
        path: "/cart",
      },
    ];

    const redirect = redirectConfig.find(({ condition }) => condition);

    if (redirect) {
      toast.error(`${redirect.message} Redirecting...`, {
        id: "checkout-toast",
      });
      hasRedirected.current = true;
      setTimeout(() => navigate(redirect.path), 1500);
    }
  }, [cart, address, checkoutItem]);

  useEffect(() => {
    if (cart?.length > 0 && address?.length > 0 && checkoutItem?.length > 0) {
      hasRedirected.current = false;
    }
  }, [cart, address, checkoutItem]);

  return { cart, address, checkoutItem };
};
