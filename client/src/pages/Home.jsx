import HomeBanner from "@/components/home/HomeBanner";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import ProductRecommendation from "@/components/home/ProductRecommendation";

const Home = () => {
  return (
    <section className="container mx-auto">
      <div className="space-y-6 py-6 md:px-6 px-2">
        <HomeBanner />
        <CategoryCarousel />
        <ProductRecommendation />
      </div>
    </section>
  );
};

export default Home;
