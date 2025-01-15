import { useState } from "react";
import toast from "react-hot-toast";

export const useFileUpload = (
  form,
  setForm,
  upload = null,
  size = 1000000,
  maxFiles = 5
) => {
  const [preview, setPreview] = useState([]);

  const isValidFile = (file) => {
    if (file.size > size) {
      toast.error(`Exceed the maximum size of file: ${size / 1000000} MB`);
      return false;
    }
    return true;
  };

  const processFiles = (files, name) => {
    const existingFiles = preview.length;
    const totalFiles = existingFiles + files.length;

    if (totalFiles > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} files.`);
      return;
    }

    const validFiles = Array.from(files).filter(isValidFile);

    if (validFiles.length > 0) {
      const updatedForm = { ...form, [name]: validFiles };

      setForm(updatedForm);
      setPreview((prev) => [
        ...prev,
        ...validFiles.map((file) => URL.createObjectURL(file)),
      ]);

      if (upload) upload(updatedForm);
    }
  };

  const multiUpload = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      processFiles(files, name);
      e.target.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files, "files");
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
      setPreview([URL.createObjectURL(file)]);

      if (upload) upload(updatedForm);

      e.target.value = "";
    }
  };

  const removePreview = (index) => {
    setPreview((prevPreview) => {
      const newPreview = [...prevPreview];
      newPreview.splice(index, 1);
      return newPreview;
    });
  };

  const removeAllPreviews = () => {
    setPreview([]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
