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
    <section className="space-y-6">
      <div className="flex items-center justify-end">
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(15)].map((_, index) => (
          <ProductCard product={index} key={index} />
        ))}
      </div>
    </section>
  );
};

export default StoreProduct;
