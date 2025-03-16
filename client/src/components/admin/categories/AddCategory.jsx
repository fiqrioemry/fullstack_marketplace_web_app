import { PlusCircle } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";
import { DialogForm } from "@/components/form/DialogForm";

const categoryState = {
  name: "",
  image: "",
};

const categoryControl = [
  {
    name: "name",
    type: "text",
    label: "category name",
    component: "input-text",
    placeholder: "Input category name",
  },
  {
    name: "image",
    label: "category Image",
    component: "single-upload",
    placeholder: "upload category image",
  },
];

const AddCategoryButton = () => {
  return (
    <>
      <PlusCircle />
      <span>Add category</span>
    </>
  );
};

const AddCategory = () => {
  const { createNewCategory, loading } = useAdminStore();

  return (
    <div className="mb-2">
      <DialogForm
        size="lg"
        variant="primary"
        loading={loading}
        state={categoryState}
        control={categoryControl}
        action={createNewCategory}
        title={"Add New Category"}
        textButton={<AddCategoryButton />}
      />
    </div>
  );
};

export default AddCategory;
