import FeaturedProducts from "./../components/Home/FeaturedProductsHome";
import FirstSectionHome from "./../components/Home/FirstSectionHome";
import WhyChooseUs from "./../components/Home/SecondeSectionHome";
import CustomersOpinionHome from "./../components/Home/CustomersOpinionHome";
import GoContactHome from "./../components/Home/GoContactHome";
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
