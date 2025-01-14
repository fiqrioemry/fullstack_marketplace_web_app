import { CloudUpload } from "lucide-react";
import { useState } from "react";

const Transaction = () => {
  const [preview, setPreview] = useState([]);
  const [formData, setFormData] = useState({
    images: [],
    name: "",
    descriptions: "",
    price: "",
  });

  const handleUploadFile = (e) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      setFormData();
    }
  };
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 ">
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
            name="files"
            type="file"
            className="hidden"
            onChange=""
            required
          />
        </label>
      </div>
    </section>
  );
};

export default Transaction;

{
  /* <div className="h-40 w-full">
<img
  src="https://placehold.co/400"
  className="object-contain w-full h-full rounded-md"
/>
</div>
<div className="h-40 w-full">
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
</div> */
}
