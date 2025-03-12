const randomUserAvatar = () => {
  let avatar;
  switch (Math.round(Math.random() * 10)) {
    case 0:
      avatar = 'Shopia';
      break;
    case 1:
      avatar = 'Jameson';
      break;
    case 2:
      avatar = 'Emery';
      break;
    case 3:
      avatar = 'Sawyer';
      break;
    case 4:
      avatar = 'Maria';
      break;
    case 5:
      avatar = 'Chase';
      break;
    case 6:
      avatar = 'Jocelyn';
    case 7:
      avatar = 'Liliana';
    case 8:
      avatar = 'Robert';
    case 9:
      avatar = 'Christian';
    case 10:
      avatar = 'Nolan';
  }
  return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${avatar}`;
};

module.exports = randomUserAvatar;
