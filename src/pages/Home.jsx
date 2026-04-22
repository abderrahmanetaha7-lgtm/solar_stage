import FeaturedProducts from "../components/FeaturedProductsHome";
import FirstSectionHome from "../components/FirstSectionHome";
import WhyChooseUs from "../components/SecondeSectionHome";
import CustomersOpinionHome from "../components/CustomersOpinionHome";
import GoContactHome from "../components/GoContactHome";
export default function Home() {
  return (
    <>
      <FirstSectionHome />
      <WhyChooseUs />
      <FeaturedProducts />
      <CustomersOpinionHome />
      <GoContactHome />
      
    </>
  );
}
