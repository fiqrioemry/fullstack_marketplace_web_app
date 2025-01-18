import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";

const Products = () => {
  return (
    <section className="h-screen">
      <div className="py-6 flex justify-end items-center">
        <Button>
          <Plus size={24} />
          <span className="capitalize">new product</span>
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-2">
        <div></div>
      </div>
    </section>
  );
};

export default Products;
