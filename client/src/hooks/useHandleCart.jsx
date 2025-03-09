import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";

const useHandleCart = (product) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const { addCart, loading } = useCartStore();

  const handleIncrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      return Math.min(newQuantity, product.stock);
    });
  };

  const handleDecrease = () => {
    setQuantity((prev) => {
      const newQuantity = prev - 1;
      return Math.max(newQuantity, 1);
    });
  };

  const handleAddToCart = () => {
    if (!user) navigate("/signin");
    addCart(product.id, quantity);
  };

  const handleCheckout = () => {
    if (user && user.length > 0) {
      navigate("/cart/checkout", {
        state: {
          product: {
            slug: product.slug,
            quantity,
          },
        },
      });
    } else {
      navigate("/signin");
    }
  };

  return {
    loading,
    quantity,
    handleDecrease,
    handleIncrease,
    handleAddToCart,
    handleCheckout,
  };
};

export default useHandleCart;
