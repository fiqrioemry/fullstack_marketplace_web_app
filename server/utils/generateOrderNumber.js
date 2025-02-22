module.exports = () => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  const timeNowInMillisec = now.getTime().toString().slice(-8);

  return `INV/${day}${month}${year}/${timeNowInMillisec}`;
};
