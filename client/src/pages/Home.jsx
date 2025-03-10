import HomeBanner from "@/components/home/HomeBanner";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import ProductRecommendation from "@/components/home/ProductRecommendation";

const Home = () => {
  return (
    <section className="container mx-auto">
      <div className="px-2 space-y-4 py-3 md:py-6">
        <HomeBanner />
        <CategoryCarousel />
        <ProductRecommendation />
      </div>
    </section>
  );
};

export default Home;
