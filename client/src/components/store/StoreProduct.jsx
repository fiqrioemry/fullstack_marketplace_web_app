import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "../ProductCard";

const StoreProduct = () => {
  return (
    <section className="py-2 space-y-4">
      <div className="grid grid-cols-12 gap-4">
        {/* filter */}
        <div className="col-span-2"></div>

        {/* display */}
        <div className="col-span-10">
          <div className="flex items-center justify-end py-4">
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="minimum">Minimum Price</SelectItem>
                    <SelectItem value="maximum">Maximum Price</SelectItem>
                    <SelectItem value="asc">From A to Z</SelectItem>
                    <SelectItem value="desc">From Z to A</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(15)].map((_, index) => (
              <ProductCard product={index} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreProduct;
