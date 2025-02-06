import { Link } from "react-router-dom";

const WebLogo = () => {
  return (
    <Link to="/" className="font-semibold capitalize text-2xl tracking-[2px]">
      shopy
      <span className="font-bold text-blue-500">PEDIA</span>
    </Link>
  );
};

export default WebLogo;
