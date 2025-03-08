import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="font-semibold capitalize text-md md:text-2xl tracking-[1px]"
    >
      shopy
      <span className="font-bold text-blue-500">PEDIA</span>
    </Link>
  );
};

export default Logo;
