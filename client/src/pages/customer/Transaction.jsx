import { CloudUpload, FilePlus, X } from "lucide-react";
import { useFileUpload } from "../../hooks/useFileUpload";
import { useHandleForm } from "../../hooks/useHandleForm";
import FormControls from "../../components/form/FormControl";
import { controlProductForm, initialProductState } from "../../config";

const Transaction = () => {
  const { formData, setFormData, handleChange, handleSubmit } =
    useHandleForm(initialProductState);
  const { removePreview, preview, multiUpload, handleDrop, handleDragOver } =
    useFileUpload(formData, setFormData);
  const onSubmit = handleSubmit();
  return (
    <section className="space-y-6">
      <div>
        {preview && preview.length !== 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {preview.map((view, index) => (
              <div
                className="relative h-40 border rounded-md w-full"
                key={index}
              >
                <button
                  onClick={() => removePreview(index)}
                  className="bg-primary text-background rounded-full p-2 absolute -top-2 -right-2"
                >
                  <X size={14} />
                </button>

                <img
                  src={view}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
            ))}
            <div className="h-40 w-full">
              <label
                htmlFor="file"
                className="h-full flex items-center justify-center default_border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted duration-300"
              >
                <FilePlus size={20} />
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
            </div>
            ;
          </div>
        ) : (
          <label
            htmlFor="file"
            className="col-span-5 h-72 md:h-96 flex items-center justify-center default_border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted duration-300"
          >
            <div className="flex flex-col justify-center items-center">
              <CloudUpload size={50} />
              <span>Add File or Drag From Computer</span>
              <span>Maximum upload is 5 File and 1 mb each</span>
            </div>
            <input
              id="file"
              required
              multiple
              type="file"
              name="files"
              accept="image/*"
              className="hidden"
              onDrop={handleDrop}
              onChange={multiUpload}
              onDragOver={handleDragOver}
            />
          </label>
        )}
      </div>
      <div className="rounded-md border">
        <form onSubmit={handleAddProduct} className="p-4">
          <FormControls
            formData={formData}
            handleChange={handleChange}
            formControls={controlProductForm}
          />
        </form>
      </div>
    </section>
  );
};

export default Transaction;
