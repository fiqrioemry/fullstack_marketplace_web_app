const ProductsNotFound = () => {
  return (
    <div className="py-12 rounded-lg border flex items-center justify-center">
      <div className="text-center max-w-72 space-y-4">
        <h3>Oops, produk nggak ditemukan</h3>
        <p>Coba kata kunci lain atau cek produk rekomendasi di bawah</p>
        <div className="flex justify-center">
          <button className="btn btn-primary rounded-md">
            Try Another Keywords
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsNotFound;
