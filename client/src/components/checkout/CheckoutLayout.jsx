/* eslint-disable react/prop-types */
const CheckoutLayout = ({ children }) => {
  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-3 md:py-6 px-2">
        <h3 className="mb-4">Checkout</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
      </div>
    </section>
  );
};

export default CheckoutLayout;
