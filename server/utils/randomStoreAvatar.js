const randomStoreAvatar = () => {
  let avatar;
  switch (Math.round(Math.random() * 10)) {
    case 0:
      avatar = 'Luis';
      break;
    case 1:
      avatar = 'Robert';
      break;
    case 2:
      avatar = 'Christian';
      break;
    case 3:
      avatar = 'Alexander';
      break;
    case 4:
      avatar = 'Jessica';
      break;
    case 5:
      avatar = 'Easton';
      break;
    case 6:
      avatar = 'Vivian';
    case 7:
      avatar = 'Jude';
    case 8:
      avatar = 'Andrea';
    case 9:
      avatar = 'Destiny';
    case 10:
      avatar = 'nolan';
  }
  return `https://api.dicebear.com/9.x/icons/svg?seed=${avatar}`;
};

module.exports = randomStoreAvatar;
