import toast from "react-hot-toast";

export const useFileUpload = (
  setFieldValue,
  formValues,
  upload = null,
  size = 1000000,
  amount = 5
) => {
  // Validasi ukuran file
  const isSizeValid = (files) => {
    return files.every((file) => {
      if (file.size > size) {
        toast.error(
          `File size exceeds the maximum limit of ${size / 1000000} MB`
        );
        return false;
      }
      return true;
    });
  };

  // Validasi jumlah file
  const isAmountValid = (newFiles, currentValues) => {
    const existingFiles = currentValues || [];
    if (existingFiles.length + newFiles.length > amount) {
      toast.error(`You can only upload up to ${amount} files.`);
      return false;
    }
    return true;
  };

  // Single File Upload
  const singleFile = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];

      // validasi ukuran file
      if (!isSizeValid([file])) return;

      setFieldValue(name, file);

      // langsung upload jika variable fungsi ada
      if (upload) upload({ ...formValues, [name]: file });
    }
    e.target.value = "";
  };

  // Multiple File Upload
  const multiFile = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);

      // validasi ukuran dan jumlah file
      if (!isSizeValid(newFiles) || !isAmountValid(newFiles, formValues[name]))
        return;

      const updatedFiles = [...(formValues[name] || []), ...newFiles];
      setFieldValue(name, updatedFiles);

      // langsung upload jika variable fungsi ada
      if (upload) upload({ ...formValues, [name]: updatedFiles });
    }
    e.target.value = "";
  };

  // Remove File Preview
  const removePreview = (name, index) => {
    let updatedImages;

    if (index !== undefined) {
      updatedImages = (formValues[name] || []).filter((_, i) => i !== index);
    } else {
      updatedImages = "";
    }

    setFieldValue(name, updatedImages);
  };

  // Drag & Drop Handling
  const handleDrop = (e, name) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

    const newEvent = {
      target: { name: name, files: e.dataTransfer.files },
    };
    multiFile(newEvent);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  return {
    singleFile,
    multiFile,
    removePreview,
    handleDrop,
    handleDragOver,
  };
};
