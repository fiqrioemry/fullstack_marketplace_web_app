import { Button } from "@/components/ui/button";

const NonAuthNav = () => {
  return (
    <nav className="space-x-4">
      <Button size="md">Signin</Button>
      <Button variant="secondary" size="md">
        Signup
      </Button>
    </nav>
  );
};

export default NonAuthNav;
