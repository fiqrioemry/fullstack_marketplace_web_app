const createSlug = (string) => {
  return string
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

module.exports = createSlug;
