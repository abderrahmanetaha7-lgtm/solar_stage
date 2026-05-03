import FeaturedProducts from "./../components/Home/FeaturedProductsHome";
import FirstSectionHome from "./../components/Home/FirstSectionHome";
import WhyChooseUs from "./../components/Home/SecondeSectionHome";
import CustomersOpinionHome from "./../components/Home/CustomersOpinionHome";
import GoContactHome from "./../components/Home/GoContactHome";
import { Box } from "@mui/material";
export default function Home() {
  return (
    <>
      <Box >
        <FirstSectionHome />
        <WhyChooseUs />
        <FeaturedProducts />
        <CustomersOpinionHome />
        <GoContactHome />
      </Box>
    </>
  );
}
