/* eslint-disable react/prop-types */
import { useAdminStore } from "@/store/useAdminStore";
import { DeleteForm } from "@/components/form/DeleteForm";
import { Trash } from "lucide-react";

const DeleteProduct = ({ categoryId }) => {
  const { deleteProduct, loading } = useAdminStore();

  const handleDelete = () => {
    deleteProduct(categoryId);
  };

  return (
    <DeleteForm
      size="icon"
      variant="delete"
      loading={loading}
      textButton={<Trash />}
      onClick={handleDelete}
      title="Product Deletion"
      description="Are you sure want to delete this Product from your store ?"
    />
  );
};

export default DeleteProduct;
