import { useEffect } from "react";
import { searchState } from "@/config";
import { useSearchParams } from "react-router-dom";
import { useFormSchema } from "@/hooks/useFormSchema";
import SortingBox from "@/components/layout/SortingBox";
import FilterBox from "@/components/layout/FilterBox";
import ProductCard from "@/components/card/ProductCard";
import { useProductStore } from "@/store/useProductStore";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import PaginationLayout from "@/components/layout/PaginationLayout";
import SearchResultLoading from "../components/loading/SearchResultLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchResult = () => {
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    getProducts({ limit: 10 });
  }, [getProducts]);

  if (!products) return null;

  return (
    <div className="container mx-auto">
      <div className="px-2 py-3 md:py-6 space-y-4">
        <PageBreadCrumb />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          <div className="col-span-1 rounded-lg border border-gray-300  h-96"></div>
          <div className="col-span-4">
            <div className="flex justify-end pb-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid-display-5">
              <ProductCard products={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
