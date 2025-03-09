import { useShopStore } from "../../store/useShopStore";

const ShopInfo = () => {
  const { store } = useShopStore();
  return (
    <div className="space-y-6">
      <img
        className="w-full h-96 object-cover aspect-square"
        src={store.image}
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
