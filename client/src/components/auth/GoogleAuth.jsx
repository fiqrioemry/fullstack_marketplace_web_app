/* eslint-disable react/prop-types */
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const GoogleAuth = ({ buttonTitle }) => {
  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  };

  return (
    <div>
      <Button onClick={handleGoogleAuth} className="w-full">
        <FcGoogle size={24} />
        {buttonTitle}
      </Button>
    </div>
  );
};

export default GoogleAuth;
