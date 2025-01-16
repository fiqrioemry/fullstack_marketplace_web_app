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

  const isValidFile = (file) =>
    file.size <= size ||
    (toast.error(`Exceed the maximum size of file: ${size / 1000000} MB`) &&
      false);

  const updateForm = (name, files) => {
    setForm((prevForm) => {
      const updatedForm = {
        ...prevForm,
        [name]: [...(prevForm[name] || []), ...files],
      };
      if (upload) upload(updatedForm);
      return updatedForm;
    });
  };

  const processFiles = (files, name) => {
    if (preview.length + files.length > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} files.`);
      return;
    }

    const validFiles = Array.from(files).filter(isValidFile);
    if (validFiles.length > 0) {
      updateForm(name, validFiles);
      setPreview((prev) => [
        ...prev,
        ...validFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
      ]);
    }
  };

  const multiUpload = (e) => handleFileChange(e);
  const singleUpload = (e) => handleFileChange(e, true);

  const handleFileChange = (e, isSingle = false) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (isSingle) {
        const file = files[0];
        if (isValidFile(file)) {
          setForm({ ...form, [name]: file });
          setPreview([{ file, url: URL.createObjectURL(file) }]);
          if (upload) upload({ ...form, [name]: file });
        }
      } else {
        processFiles(files, name);
      }
      e.target.value = "";
    }
  };

  const removePreview = (index) => {
    setPreview((prevPreview) => {
      const newPreview = [...prevPreview];
      const removedFile = newPreview.splice(index, 1)[0].file;

      setForm((prevForm) => {
        const updatedForm = { ...prevForm };
        updatedForm["files"] = updatedForm["files"].filter(
          (file) => file !== removedFile
        );
        return updatedForm;
      });
      return newPreview;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    processFiles(e.dataTransfer.files, "files");
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
