import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";
import { formatToRupiah } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { storeProductFilterState } from "@/config";
import { useShopStore } from "@/store/useShopStore";
import useSearchAndSort from "@/hooks/useSearchAndSort";
import { EllipsisVertical, ArrowUpDown } from "lucide-react";
import ProductListLoading from "@/components/loading/ProductListLoading";
import ProductsPagination from "@/components/products-preview/ProductsPagination";

const ProductsList = () => {
  const { products, totalPage, currentPage, getStoreProducts } = useShopStore();

  const { form, handleSort } = useSearchAndSort(
    getStoreProducts,
    storeProductFilterState
  );
  if (!products) return <ProductListLoading />;

  return (
    <section className="p-4">
      {/* Search Input */}
      <div className="w-full mb-4">
        <Input
          type="text"
          name="search"
          placeholder="Search products..."
          value={form.values.search}
          onChange={form.handleChange}
        />
      </div>

      {/* Data Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name <ArrowUpDown className="inline ml-1 w-4 h-4" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("stock")}
            >
              Stock <ArrowUpDown className="inline ml-1 w-4 h-4" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price <ArrowUpDown className="inline ml-1 w-4 h-4" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("categoryName")}
            >
              Category <ArrowUpDown className="inline ml-1 w-4 h-4" />
            </TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                {form.values.search
                  ? "No product name results"
                  : "Your Store don’t have any product. Try to add one!"}
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, index) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell>{index + 1 + 5 * (currentPage - 1)}</TableCell>
                <TableCell>{product.name.slice(0, 20)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{formatToRupiah(product.price)}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu className="w-14">
                    <DropdownMenuTrigger>
                      <EllipsisVertical className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="flex flex-col">
                      <UpdateProduct product={product} />
                      <DeleteProduct productId={product.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <ProductsPagination
        totalPage={totalPage}
        form={form}
        currentPage={currentPage}
      />
    </section>
  );
};

export default ProductsList;
