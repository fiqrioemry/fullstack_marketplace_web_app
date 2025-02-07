import { useState } from "react";
import toast from "react-hot-toast";

export const useTesting = (
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

  const updateForm = (name, files) => {
    setFieldValue(name, files);
    const updatedFormData = {
      ...formValues,
      [name]: files,
    };

    if (upload) upload(updatedFormData);
  };

  // Fungsi untuk single file upload
  const singleUpload = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (isSizeValid(file)) {
        setFieldValue(name, file);
        setPreview([URL.createObjectURL(file)]);

        if (upload) {
          const updatedFormData = { ...formValues, [name]: file };
          upload(updatedFormData);
        }
      }
    }
    e.target.value = "";
  };

  // Fungsi untuk multiple file upload
  const multiUpload = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (preview.length + files.length > amount) {
        toast.error(`You can only upload up to ${amount} files.`);
        return;
      }
      const validFiles = Array.from(files).filter(isSizeValid);
      if (validFiles.length > 0) {
        updateForm(name, validFiles);
        setPreview((prev) => [
          ...prev,
          ...validFiles.map((file) => ({
            file,
            url: URL.createObjectURL(file),
          })),
        ]);
      }
    }
    e.target.value = "";
  };

  const removePreview = (param) => {
    const updatedPreview = preview.filter((_, index) => index !== param);
    const updatedValue = formValues.map((prev) => prev.file);
    setPreview(updatedPreview);
    setFieldValue("files", updatedValue);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fakeEvent = {
        target: { name: "files", files: e.dataTransfer.files, value: "" },
      };
      multiUpload(fakeEvent);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return {
    preview,
    setPreview,
    handleDrop,
    multiUpload,
    singleUpload,
    handleDragOver,
    removePreview,
  };
};
