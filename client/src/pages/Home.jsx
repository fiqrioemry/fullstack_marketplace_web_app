import HomeBanner from "@/components/home/HomeBanner";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import ProductRecommendation from "@/components/home/ProductRecommendation";

const Home = () => {
  return (
    <section className="section-margin">
      <HomeBanner />
      <CategoryCarousel />
      <ProductRecommendation />
    </section>
  );
};

export default Home;
