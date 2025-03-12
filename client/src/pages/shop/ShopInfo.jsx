import { useProductStore } from "@/store/useProductStore";

const ShopInfo = () => {
  const { store } = useProductStore();

  return (
    <div className="space-y-6">
      <img
        className="w-full h-96 object-cover aspect-square"
        src={store.banner}
        alt={store.name}
      />
      <div>
        <h3>Shop Descriptions</h3>
        <p>{store.description}</p>
      </div>
    </div>
  );
};

export default ShopInfo;
