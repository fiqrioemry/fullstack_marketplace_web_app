import { Card, CardContent } from "@/components/ui/card";

const ProductCard = () => {
  return (
    <>
      <Card className="h-[300px] overflow-hidden">
        <CardContent>
          <img
            className="w-full object-contain"
            src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2024/12/19/3b8604db-0cd5-410b-b74c-108511796f14.jpg.webp?ect=4g"
            alt=""
          />
          <div className="space-y-2 px-2">
            <h4>Laptop Lenovo M4</h4>
            <span>Rp. 5.000.000</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
