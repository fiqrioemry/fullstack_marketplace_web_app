/* eslint-disable react/prop-types */
import { Edit } from "lucide-react";
import { useAdminStore } from "@/store/useAdminStore";
import { DialogForm } from "@/components/form/DialogForm";

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

const UpdateCategory = ({ category }) => {
  const { updateCategory } = useAdminStore();

  return (
    <div className="mb-2">
      <DialogForm
        size="icon"
        variant="edit"
        param={category.id}
        state={category}
        textButton={<Edit />}
        control={categoryControl}
        action={updateCategory}
        title={"Update Category"}
      />
    </div>
  );
};

export default UpdateCategory;
