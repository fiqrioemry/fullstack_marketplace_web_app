import { Edit, Plus, Trash } from "lucide-react";
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
      <div>
        <div className="grid grid-cols-12 gap-2 py-2 border-b border-muted text-sm">
          <div className="col-span-1">no.</div>
          <div className="col-span-2">name</div>
          <div className="col-span-2">preview</div>
          <div className="col-span-2">price</div>
          <div className="col-span-1">stock</div>
          <div className="col-span-2">category</div>
          <div className="col-span-2">action</div>
        </div>
        <div className="grid grid-cols-12 gap-2 py-2 border-b border-muted text-sm">
          <div className="col-span-1">1</div>
          <div className="col-span-2">Samsung Galaxy</div>
          <div className="col-span-2">
            <img
              className="h-20 w-20 object-contain"
              src="https://placehold.co/400x400"
              alt="product"
            />
          </div>
          <div className="col-span-2">Rp. 50.000</div>
          <div className="col-span-1">50</div>
          <div className="col-span-2">Electronic</div>
          <div className="col-span-2 space-x-2">
            <Button>
              <Edit />
            </Button>
            <Button variant="destructive">
              <Trash />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 py-2 border-b border-muted text-sm">
          <div className="col-span-1">1</div>
          <div className="col-span-2">Samsung Galaxy</div>
          <div className="col-span-2">
            <img
              className="h-20 w-20 object-contain"
              src="https://placehold.co/400x400"
              alt="product"
            />
          </div>
          <div className="col-span-2">Rp. 50.000</div>
          <div className="col-span-1">50</div>
          <div className="col-span-2">Electronic</div>
          <div className="col-span-2 space-x-2">
            <Button>
              <Edit />
            </Button>
            <Button variant="destructive">
              <Trash />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 py-2 border-b border-muted text-sm">
          <div className="col-span-1">1</div>
          <div className="col-span-2">Samsung Galaxy</div>
          <div className="col-span-2">
            <img
              className="h-20 w-20 object-contain"
              src="https://placehold.co/400x400"
              alt="product"
            />
          </div>
          <div className="col-span-2">Rp. 50.000</div>
          <div className="col-span-1">50</div>
          <div className="col-span-2">Electronic</div>
          <div className="col-span-2 space-x-2">
            <Button size="icon">
              <Edit />
            </Button>
            <Button size="icon" variant="destructive">
              <Trash />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
