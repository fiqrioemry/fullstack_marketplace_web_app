import { PlusCircle } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { productControl, productState } from "@/config";
import { DialogForm } from "@/components/form/DialogForm";

const AddProductButton = () => {
  return (
    <>
      <PlusCircle />
      <span>Add Product</span>
    </>
  );
};

const AddProduct = () => {
  const { createNewProduct, loading } = useShopStore();

  return (
    <div className="mb-2">
      <DialogForm
        size="lg"
        variant="primary"
        loading={loading}
        state={productState}
        control={productControl}
        action={createNewProduct}
        title={"New Product Form"}
        textButton={<AddProductButton />}
      />
    </div>
  );
};

export default AddProduct;
