import { Edit, Plus, Trash } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { PaginationBox } from "../../components/PaginationBox";

const Products = () => {
  return (
    <section>
      <div className="space-y-2">
        <div className="py-6 flex justify-between items-center">
          <div>
            <Input className="w-96" placeholder="search product" />
          </div>
          <Button size="icon md:primary" className="px-2 py-2">
            <Plus size={24} />
            <span className="capitalize md:block hidden">new product</span>
          </Button>
        </div>
        <div>
          <div className="grid grid-cols-12 gap-2 py-2 border-b border-muted text-xs md:text-sm capitalize">
            <div className="col-span-1">no.</div>
            <div className="col-span-2">name</div>
            <div className="col-span-2">preview</div>
            <div className="col-span-2">price</div>
            <div className="col-span-1">stock</div>
            <div className="col-span-2">category</div>
            <div className="col-span-2 flex justify-center">action</div>
          </div>

          {[...Array(8)].map((_, index) => (
            <div
              className="grid grid-cols-12 gap-2 py-2 border-b border-muted text-xs md:text-sm capitalize"
              key={index}
            >
              <div className="col-span-1">{index + 1}</div>
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
              <div className="col-span-2 flex justify-center space-x-2">
                <Button size="icon">
                  <Edit />
                </Button>
                <Button size="icon" variant="destructive">
                  <Trash />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <PaginationBox currentPage={1} totalPages={10} />
      </div>
    </section>
  );
};

export default Products;
