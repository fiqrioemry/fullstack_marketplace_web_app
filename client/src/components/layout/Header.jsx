import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3>Marketplace</h3>
          </div>
          <nav className="space-x-4">
            <Button size="md">Signin</Button>
            <Button variant="secondary" size="md">
              Signup
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
