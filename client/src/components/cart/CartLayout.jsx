/* eslint-disable react/prop-types */
const CartLayout = ({ children }) => {
  return (
    <section className="min-h-screen bg-gray-100 px-2">
      <div className="container mx-auto py-3 md:py-6">
        <h2 className="mb-4">Keranjang</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{children} </div>
      </div>
    </section>
  );
};

export default CartLayout;
