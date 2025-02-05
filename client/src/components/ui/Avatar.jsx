const Avatar = ({ avatar }) => {
  return (
    <div className="w-8 h-8  flex items-center justify-center">
      <img
        className="object-contain w-full h-full rounded-full border border-foreground"
        src={avatar}
        alt="user_avatar"
      />
    </div>
  );
};

export default Avatar;
