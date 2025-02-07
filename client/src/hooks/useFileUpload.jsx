import toast from "react-hot-toast";

export const useFileUpload = (
  setFieldValue,
  formValues,
  upload = null,
  size = 1000000,
  amount = 5
) => {
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

  // Untuk upload single file
  const singleFile = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];

      // Cek size
      if (!isSizeValid(file)) return;

      // Set value ke form
      setFieldValue(name, file);

      // Jika harus langsung upload
      if (upload) upload({ ...formValues, [name]: file });
    }
    e.target.value = "";
  };

  // Untuk upload multiple file
  const multiFile = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);

      // Validasi semua file
      const validFiles = newFiles.filter(isSizeValid);

      if (validFiles.length === 0) return;

      // Pastikan formValues[name] sudah berupa array
      const existingFiles = formValues[name] || [];

      // Validasi jumlah file
      if (!isAmountValid(existingFiles, validFiles)) return;

      // Set value ke form (menambahkan file baru ke yang sudah ada)
      const updatedFiles = [...existingFiles, ...validFiles];
      setFieldValue(name, updatedFiles);

      // Jika harus langsung upload
      if (upload) upload({ ...formValues, [name]: updatedFiles });
    }
    e.target.value = "";
  };

  // Untuk menghapus file preview
  const removePreview = (name, index) => {
    const updatedImages = formValues[name].filter((_, i) => i !== index);
    setFieldValue(name, updatedImages);
  };

  // Untuk drag & drop file
  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

    const fakeEvent = {
      target: { name: fieldName, files: e.dataTransfer.files },
    };
    multiFile(fakeEvent);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  return {
    handleDrop,
    singleFile,
    multiFile,
    removePreview,
    handleDragOver,
  };
};
