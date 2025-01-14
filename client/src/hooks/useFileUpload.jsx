import { useState } from "react";
import toast from "react-hot-toast";

export const useFileUpload = (form, setForm, upload = null, size = 1000000) => {
  const [preview, setPreview] = useState([]);

  const isValidFile = (file) => {
    if (file.size > size) {
      toast.error(`Exceed the maximum size of file: ${size / 1000000} MB`);
      return false;
    }
    return true;
  };

  const multiUpload = (e) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      // Filter files to find any invalid files (those that exceed the size limit)
      const invalidFile = Array.from(files).find((file) => !isValidFile(file));

      if (invalidFile) {
        // If any file is invalid, clear the input and show the error
        e.target.value = "";
        return;
      }

      // If all files are valid, update the form and preview
      const validFiles = Array.from(files);

      const updatedForm = { ...form, [name]: validFiles };
      setForm(updatedForm);

      setPreview(validFiles.map((file) => URL.createObjectURL(file)));

      upload(updatedForm);

      e.target.value = "";
    }
  };
  const singleUpload = (e) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      if (!isValidFile(file)) {
        e.target.value = "";
        return;
      }

      const updatedForm = { ...form, [name]: file };

      setForm(updatedForm);

      setPreview(updatedForm);

      upload(updatedForm);

      e.target.value = "";
    }
  };

  const removePreview = (index) => {
    setPreview((prevPreview) => {
      const newPreview = [...prevPreview];
      newPreview.splice(index, 1); // Remove the file at the specified index
      return newPreview;
    });
  };

  // Function to remove all previews
  const removeAllPreviews = () => {
    setPreview([]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;

    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(isValidFile);

      if (validFiles.length > 0) {
        const updatedForm = { ...form, files: validFiles };

        setForm(updatedForm);

        setPreview(validFiles.map((file) => URL.createObjectURL(file)));

        upload(updatedForm);

        e.target.value = "";
      }
    }
  };

  return {
    preview,
    setPreview,
    handleDrop,
    multiUpload,
    singleUpload,
    handleDragOver,
    removePreview,
    removeAllPreviews,
  };
};
