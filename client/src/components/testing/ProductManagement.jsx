import ProcessButton from "../form/processButton";

import { useProductStore } from "../../store/useProductStore";
import ProductCard from "../card/ProductCard";
import ProductsLoading from "../loading/ProductsLoading";

const ProductManagement = () => {
  const { getProducts, products, loading } = useProductStore();
  const getAllProducts = () => {
    getProducts({ limit: 5 });
  };

  return (
    <div className=" space-y-6 py-12 container mx-auto">
      {/* Get Product*/}
      <div className="space-y-4 text-center">
        <h4>Get All Product Demo</h4>
        <ProcessButton
          title="Get All Product"
          onClick={getAllProducts}
          loading={loading}
        />
        <h5>Result Will Be Displayed Here</h5>
        <div className="h-72 flex_center">
          {products.length === 0 ? (
            <div>No Products</div>
          ) : loading ? (
            <ProductsLoading />
          ) : (
            <div className="grid_display_5">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* register form */}
      <div className="space-y-4 text-center">
        <h4>Register Form Demo</h4>
      </div>
      <div></div>
    </div>
  );
};

export default ProductManagement;
