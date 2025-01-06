import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-red-500">
      <div className="container mx-auto p-3 border-b">
        <div className="flex items-center justify-center">
          <div>
            <h3>Marketplace</h3>
          </div>
          <nav className="space-x-4">
            <Button>Signin</Button>
            <Button>Signup</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
