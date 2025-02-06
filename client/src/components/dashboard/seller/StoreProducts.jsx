import { useEffect } from "react";
import { useShopStore } from "@/store/useShopStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { DeleteBox } from "@/components/modal/DeleteBox";
import { DialogForm } from "@/components/form/DialogForm";
import { Trash, ArrowUpDown, Pencil } from "lucide-react";
import { productControl, productFilterState } from "@/config";
import ProductListLoading from "@/components/loading/ProductListLoading";

const StoreProducts = () => {
  const { products, getStoreProduct, updateProduct, loading } = useShopStore();
  const searchForm = useFormSchema(
    productFilterState,
    undefined,
    getStoreProduct
  );

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
  }, [searchForm.values.search]);

  return (
    <div className="overflow-x-auto p-4">
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
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="px-4 py-3 text-left">No</th>
            <th
              className="px-4 py-3 text-left cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name <ArrowUpDown size={16} className="inline ml-1" />
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer"
              onClick={() => handleSort("stock")}
            >
              Stock <ArrowUpDown size={16} className="inline ml-1" />
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Price <ArrowUpDown size={16} className="inline ml-1" />
            </th>
            <th
              className="px-4 py-3 text-left cursor-pointer"
              onClick={() => handleSort("categoryName")}
            >
              Category <ArrowUpDown size={16} className="inline ml-1" />
            </th>
            <th className="px-4 py-3 text-center">Action</th>
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
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{product.name.slice(0, 20)}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">{product.categoryName}</td>
                <td className="px-4 py-3 text-center space-x-2">
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
  );
};

export default StoreProducts;
