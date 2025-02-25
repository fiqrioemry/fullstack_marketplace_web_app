import NotFound from "./NotFound";
import Product from "@/components/product/Product";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import ProductLoading from "@/components/product/ProductLoading";
import useGetProduct from "@/components/product/hooks/useGetProduct";

const ProductPage = () => {
  const { product, loading } = useGetProduct();

  if (loading) return <ProductLoading />;

  if (product.length === 0) return <NotFound />;

  return (
    <section className="section-margin">
      <PageBreadCrumb />
      <Product product={product} />
    </section>
  );
};

export default ProductPage;
