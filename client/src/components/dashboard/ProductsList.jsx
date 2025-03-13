import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatToRupiah } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useShopStore } from "@/store/useShopStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { DeleteBox } from "@/components/modal/DeleteBox";
import { DialogForm } from "@/components/form/DialogForm";
import { EllipsisVertical, ArrowUpDown } from "lucide-react";
import { productControl, storeProductFilterState } from "@/config";
import ProductListLoading from "@/components/loading/ProductListLoading";
import ProductsPagination from "@/components/products-preview/ProductsPagination";

const ProductsList = () => {
  const {
    products,
    totalPage,
    currentPage,
    updateProduct,
    deleteProduct,
    getStoreProducts,
  } = useShopStore();
  const searchForm = useFormSchema(getStoreProducts, storeProductFilterState);

  const handleSort = (key) => {
    const isSameSort = searchForm.values.sortBy === key;
    const newOrder =
      isSameSort && searchForm.values.orderBy === "asc" ? "desc" : "asc";
    searchForm.setFieldValue("sortBy", key);
    searchForm.setFieldValue("orderBy", newOrder);
    searchForm.handleSubmit();
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      searchForm.handleSubmit();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchForm.values]);

  if (!products) return <ProductListLoading />;

  return (
    <div>
      {/* Search Input */}
      <div className="w-full mb-4">
        <Input
          type="text"
          name="search"
          placeholder="Search products..."
          value={searchForm.values.search}
          onChange={searchForm.handleChange}
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
          {/* Loading State */}
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                {searchForm.values.search
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
                  {/* Dropdown Action Menu */}
                  <DropdownMenu className="w-14">
                    <DropdownMenuTrigger>
                      <EllipsisVertical className="cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="flex flex-col gap-2 ">
                      <DialogForm
                        variant="edit"
                        state={product}
                        button="Update"
                        param={product.id}
                        title="Edit Product"
                        action={updateProduct}
                        control={productControl}
                      />
                      <DeleteBox
                        button="Delete"
                        variant="delete"
                        data={product.id}
                        action={deleteProduct}
                        title="Delete Product"
                        description="Are you sure want to delete this product?"
                      />
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
        searchForm={searchForm}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductsList;
