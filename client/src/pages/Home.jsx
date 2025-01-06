import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  return (
    <section className="container mx-auto">
      <div className="space-y-6 py-6 md:px-6 px-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4>Product Category</h4>

            <Link
              to="/category"
              className="text-primary hover:text-primary/60 font-medium duration-300 transition-all"
            >
              See all categories
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(5)].map((_, index) => (
              <Card className="h-[300px] overflow-hidden" key={index}>
                <CardContent>
                  <img
                    className="w-full object-contain"
                    src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2024/12/19/3b8604db-0cd5-410b-b74c-108511796f14.jpg.webp?ect=4g"
                    alt=""
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
