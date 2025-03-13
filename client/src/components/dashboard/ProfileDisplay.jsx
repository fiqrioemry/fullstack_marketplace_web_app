import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, DollarSign } from "lucide-react";

const ProfileDisplay = () => {
  const store = {
    avatar: "https://placehold.co/400x600",
    name: "Toko Sukses Jaya",
    description:
      "Menjual berbagai macam produk berkualitas dengan harga terbaik.",
    city: "Jakarta, Indonesia",
    balance: "Rp 10.500.000",
    joinedDate: "12 Januari 2022",
  };

  return (
    <div className="flex p-4 bg-gray-100 h-full">
      <Card className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={store.avatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-300"
          />
          <h2 className="text-xl font-semibold mt-4">{store.name}</h2>
          <p className="text-gray-600 text-sm mt-2">{store.description}</p>
        </div>

        <CardContent className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">{store.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 font-semibold">{store.balance}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">
              Bergabung sejak {store.joinedDate}
            </span>
          </div>
        </CardContent>

        <div className="flex justify-center mt-6">
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Edit Profile
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfileDisplay;
