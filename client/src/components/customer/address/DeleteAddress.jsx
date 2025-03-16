/* eslint-disable react/prop-types */
import { Trash } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { DeleteForm } from "@/components/form/DeleteForm";

const DeleteAddress = ({ address }) => {
  const { deleteAddress, loading } = useUserStore();

  const handleDelete = () => {
    deleteAddress(address.id);
  };

  return (
    <DeleteForm
      size="icon"
      variant="delete"
      loading={loading}
      textButton={<Trash />}
      onClick={handleDelete}
      title="Address Deletion"
      description="Are you sure want to delete this Address ?"
    />
  );
};

export default DeleteAddress;
