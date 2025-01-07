/* eslint-disable react/prop-types */
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const ButtonAnimate = ({ title, variant, action, style, loading }) => {
  return (
    <div>
      <Button
        onClick={action}
        variant={variant}
        className={style}
        disabled={loading}
      >
        {loading ? <Loader className="animate-spin" /> : title}
      </Button>
    </div>
  );
};

export default ButtonAnimate;
