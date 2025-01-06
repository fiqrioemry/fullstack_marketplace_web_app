import { Card } from "@/components/ui/card";

const Store = () => {
  return (
    <section className="container mx-auto h-svh">
      <div className="space-y-6 py-6 md:px-6 px-2">
        <Card className="grid grid-cols-1 md:grid-cols-2 min-h-[250px]">
          <div className="flex items-center">
            <div>
              <div className="w-32 h-32 bg-primary rounded-full"></div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-x-2 px-4 md:px-8">
            <div className="text-center border p-4">
              <h4>4.8</h4>
              <div>Rating & Ulasan</div>
            </div>
            <div className="text-center border p-4">
              <h4>Max 2 Jam</h4>
              <div>Pesanan diproses</div>
            </div>
            <div className="text-center border p-4">
              <h4>Buka 24 Jam</h4>
              <div>Jam Operasional</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Store;
