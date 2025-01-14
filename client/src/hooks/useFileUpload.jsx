import toast from "react-hot-toast";

export const useFileUpload = (form, setForm, upload, size) => {
  const isValidFile = (file) => {
    if (file.size > size) {
      toast.error(`Exceed the maximum size of file: ${size / 1000000} MB`);
      return false;
    }
    return true;
  };

  const handleSingleUpload = (e) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      if (!isValidFile(file)) {
        e.target.value = "";
        return;
      }

      const updatedForm = { ...form, [name]: file };
      setForm(updatedForm);

      upload(updatedForm);

      e.target.value = "";
    }
  };

  const handleMultiUpload = (e) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(isValidFile);

      if (validFiles.length > 0) {
        const updatedForm = { ...form, [name]: validFiles };
        setForm(updatedForm);

        upload(updatedForm);
      }

      e.target.value = "";
    }
  };

  return {
    handleSingleUpload,
    handleMultiUpload,
  };
};
