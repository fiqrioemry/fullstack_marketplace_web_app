import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NonAuthNav = () => {
  return (
    <nav className="space-x-4">
      <Link to="/signin">
        <Button size="md">Signin</Button>
      </Link>

      <Link to="/signup">
        <Button variant="secondary" size="md">
          Signup
        </Button>
      </Link>
    </nav>
  );
};

export default NonAuthNav;
