/* eslint-disable react/prop-types */
import { Edit } from "lucide-react";
import { productControl } from "@/config";
import { useAdminStore } from "@/store/useAdminStore";
import { DialogForm } from "@/components/form/DialogForm";

const UpdateProduct = ({ product }) => {
  const { updateProduct, loading } = useAdminStore();

  return (
    <div className="mb-2">
      <DialogForm
        size="icon"
        variant="edit"
        state={product}
        param={product.id}
        loading={loading}
        textButton={<Edit />}
        action={updateProduct}
        control={productControl}
        title={"Update Category"}
      />
    </div>
  );
};

export default UpdateProduct;
