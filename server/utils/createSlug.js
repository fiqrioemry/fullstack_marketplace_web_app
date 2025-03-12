const createSlug = (string) => {
  const baseSlug = string
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

  return `${baseSlug}-${Date.now().toString().slice(-4)}`; // Menambahkan 4 digit terakhir timestamp
};

module.exports = createSlug;
