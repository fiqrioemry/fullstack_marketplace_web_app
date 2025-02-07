import { useState } from "react";
import toast from "react-hot-toast";

export const useFileUpload = (
  setFieldValue,
  formValues,
  upload = null,
  size = 1000000,
  amount = 5
) => {
  const [preview, setPreview] = useState([]);

  // Validasi ukuran file
  const isSizeValid = (file) => {
    if (file.size > size) {
      toast.error(
        `File size exceeds the maximum limit of ${size / 1000000} MB`
      );
      return false;
    }
    return true;
  };

  // Validasi jumlah file
  const isAmountValid = (currentPreview, newFiles) => {
    if (currentPreview.length + newFiles.length > amount) {
      toast.error(`You can only upload up to ${amount} files.`);
      return false;
    }
    return true;
  };

  // Fungsi untuk single file upload
  const singleFile = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      console.log(files);
      const file = files[0];
      if (isSizeValid(file)) {
        setFieldValue(name, [URL.createObjectURL(file)]);

        if (upload) {
          const updatedFormData = { ...formValues, [name]: file };
          upload(updatedFormData);
        }
      }
    }
    e.target.value = "";
  };

  const multiFile = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(isSizeValid);
      const validAmount = isAmountValid(preview, files);
      if (validFiles && validAmount) {
        const urlFiles = validFiles.map((file) => URL.createObjectURL(file));
        setFieldValue(name, { ...formValues, [name]: urlFiles });
      }
    }
    e.target.value = "";
  };

  const removePreview = (name, index) => {
    setFieldValue(name, formValues[name]?.filter((_, i) => i !== index) || []);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Mencegah event bubbling ke elemen lain

    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

    const fakeEvent = {
      target: { name: "files", files: e.dataTransfer.files },
    };
    multiFile(fakeEvent, true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  return {
    preview,
    handleDrop,
    singleFile,
    multiFile,
    removePreview,
    handleDragOver,
  };
};
