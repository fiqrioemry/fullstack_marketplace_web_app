import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { formatToRupiah } from "@/lib/utils";
import { useShopStore } from "@/store/useShopStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { DeleteBox } from "@/components/modal/DeleteBox";
import { DialogForm } from "@/components/form/DialogForm";
import { productControl, productFilterState } from "@/config";
import PaginationLayout from "@/components/layout/PaginationLayout";
import ProductListLoading from "@/components/loading/ProductListLoading";
import { Trash, ArrowUpDown, Pencil, EllipsisVertical } from "lucide-react";

const ProductsList = () => {
  const {
    products,
    totalPage,
    currentPage,
    getStoreProduct,
    updateProduct,
    deleteProduct,
    loading,
  } = useShopStore();
  const searchForm = useFormSchema(getStoreProduct, productFilterState);

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

  return (
    <div className="overflow-x-auto ">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          name="search"
          value={searchForm.values.search}
          onChange={searchForm.handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div className="min-h-[22.5rem]">
        <table className="min-w-full bg-white text-xs md:text-base ">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-1 md:px-3 py-3 text-left">No</th>
              <th
                className="px-1 md:px-3 py-3 text-left cursor-pointer "
                onClick={() => handleSort("name")}
              >
                Name
                <ArrowUpDown className="inline ml-1 w-3 h-3 sm:w-4 sm:h-4 " />
              </th>
              <th
                className=" px-1 md:px-3 py-3 text-left cursor-pointer"
                onClick={() => handleSort("stock")}
              >
                Stock
                <ArrowUpDown className="inline ml-1 w-3 h-3 sm:w-4 sm:h-4 " />
              </th>
              <th
                className="px-1 md:px-3 py-3 text-left cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price
                <ArrowUpDown
                  size={8}
                  className="inline ml-1 w-3 h-3 sm:w-4 sm:h-4"
                />
              </th>
              <th
                className="px-1 md:px-3 py-3 text-left cursor-pointer "
                onClick={() => handleSort("categoryName")}
              >
                Category{" "}
                <ArrowUpDown className="inline ml-1 w-3 h-3 sm:w-4 sm:h-4 " />
              </th>
              <th className="px-1 md:px-3 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <ProductListLoading />
            ) : (
              products.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-1 md:px-3 py-3 ">
                    {index + 1 + 5 * (currentPage - 1)}
                  </td>
                  <td className="px-1 md:px-3 py-3">
                    {product.name.slice(0, 20)}
                  </td>
                  <td className="px-1 md:px-3 py-3 ">{product.stock}</td>

                  <td className="px-1 md:px-3 py-3">
                    {formatToRupiah(product.price)}
                  </td>
                  <td className="px-1 md:px-3 py-3">{product.categoryName}</td>
                  <td className="block md:hidden px-1 md:px-3 py-3 text-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <div className="flex flex-col space-y-3">
                          <DialogForm
                            variant="ghost"
                            size="icon"
                            state={product}
                            param={product.id}
                            title="Edit Product"
                            button={<Pencil />}
                            action={updateProduct}
                            control={productControl}
                          />

                          <DeleteBox
                            variant="ghost"
                            size="icon"
                            data={product.id}
                            action={deleteProduct}
                            button={<Trash />}
                            title="Delete Product"
                            description="Are you sure want to delete this product ?"
                          />
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                  <td className="hidden md:block px-1 md:px-3 py-3 text-center space-x-2">
                    <DialogForm
                      variant="edit"
                      size="icon"
                      state={product}
                      param={product.id}
                      title="Edit Product"
                      button={<Pencil />}
                      action={updateProduct}
                      control={productControl}
                    />
                    <DeleteBox
                      size="icon"
                      data={product.id}
                      action={deleteProduct}
                      button={<Trash />}
                      title="Delete Product"
                      description="Are you sure want to delete this product ?"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <PaginationLayout
          totalPage={totalPage}
          searchForm={searchForm}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductsList;
