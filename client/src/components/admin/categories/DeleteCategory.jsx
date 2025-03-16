/* eslint-disable react/prop-types */
import { useAdminStore } from "@/store/useAdminStore";
import { DeleteForm } from "@/components/form/DeleteForm";
import { Trash } from "lucide-react";

const DeleteCategory = ({ category }) => {
  const { deleteCategory, loading } = useAdminStore();

  const handleDelete = () => {
    deleteCategory(category.id);
  };

  return (
    <DeleteForm
      size="icon"
      variant="delete"
      loading={loading}
      textButton={<Trash />}
      onClick={handleDelete}
      title="Category Deletion"
      description="Are you sure want to delete this Category ?"
    />
  );
};

export default DeleteCategory;
