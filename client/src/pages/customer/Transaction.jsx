import { CloudUpload } from "lucide-react";
import { useFileUpload } from "../../hooks/useFileUpload";
import { useHandleForm } from "../../hooks/useHandleForm";

export const initialProductState = {
  name: "",
  categoryId: "",
  descriptions: "",
  price: "",
  stock: "",
  images: [],
};

const Transaction = () => {
  const { formData, setFormData } = useHandleForm(initialProductState);
  const { preview, multiUpload } = useFileUpload(formData, setFormData);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 ">
        {preview && preview.length !== 0 ? (
          <>
            {preview.map((view, index) => (
              <div className="h-40 border rounded-md w-full" key={index}>
                <img
                  src={view}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
            ))}
          </>
        ) : (
          <label
            htmlFor="file"
            className="col-span-5 h-72 md:h-96 flex items-center justify-center default_border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted duration-300"
          >
            <div className="flex flex-col justify-center items-center">
              <CloudUpload size={50} />
              <span>Add File or Drag From Computer</span>
              <span>Maximum upload is 5 File : Exceed will be aborted</span>
            </div>
            <input
              id="file"
              required
              multiple
              type="file"
              name="files"
              accept="image/*"
              className="hidden"
              onChange={multiUpload}
            />
          </label>
        )}
      </div>
    </section>
  );
};

export default Transaction;
{
  /* <div className="h-40 w-full">
<label
  htmlFor="file"
  className="col-span-5 h-full flex items-center justify-center default_border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted duration-300"
>
  <FilePlus size={20} />

  <input
    id="file"
    name="files"
    type="file"
    className="hidden"
    onChange={handleChange}
    required
  />
</label>
;
</div>  */
}
