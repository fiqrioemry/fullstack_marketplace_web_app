import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center w-1/2 p-8 border-4 border-red-500 ">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        </div>
        <h2 className="mb-4">404 - Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link to="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
