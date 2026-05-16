import FeaturedProducts from "./../components/Home/FeaturedProductsHome";
import FirstSectionHome from "./../components/Home/FirstSectionHome";
import WhyChooseUs from "./../components/Home/SecondeSectionHome";
import CustomersOpinionHome from "./../components/Home/CustomersOpinionHome";
import GoContactHome from "./../components/Home/GoContactHome";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { i18n } = useTranslation();
  return (
    <>
      <Helmet>
        {/* Title */}
        <title>
          {i18n.language === "ar"
            ? "شركة الألواح الشمسية - حلول الطاقة الشمسية في المغرب"
            : "Société d'énergie solaire - Solutions solaires au Maroc"}
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content={
            i18n.language === "ar"
              ? "نحن شركة متخصصة في بيع الألواح الشمسية، البطاريات، المحولات، مع خدمات التركيب والصيانة في المغرب. حلول طاقة متكاملة وموثوقة."
              : "Nous sommes spécialisés dans la vente de panneaux solaires, batteries et onduleurs avec installation et maintenance au Maroc. Solutions d'énergie fiables et complètes."
          }
        />

        {/* Keywords (اختياري لكن مفيد) */}
        <meta
          name="keywords"
          content={
            i18n.language === "ar"
              ? "ألواح شمسية, بطاريات, طاقة شمسية, تركيب الطاقة الشمسية, المغرب"
              : "panneaux solaires, énergie solaire, batteries, installation solaire, Maroc"
          }
        />

        {/* Open Graph (Facebook / WhatsApp) */}
        <meta
          property="og:title"
          content={
            i18n.language === "ar"
              ? "حلول الطاقة الشمسية - شركة متخصصة في المغرب"
              : "Solutions d'énergie solaire au Maroc"
          }
        />

        <meta
          property="og:description"
          content={
            i18n.language === "ar"
              ? "أفضل حلول الطاقة الشمسية: ألواح، بطاريات، تركيب وصيانة."
              : "Solutions complètes: panneaux, batteries, installation et maintenance solaire."
          }
        />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="/solar-home.jpg" />
 
        {/* Language hint */}
        <meta
          httpEquiv="content-language"
          content={i18n.language === "ar" ? "ar" : "fr"}
        />
      </Helmet>

      <Box>
        <FirstSectionHome />
        <WhyChooseUs />
        <FeaturedProducts />
        <CustomersOpinionHome />
        <GoContactHome />
      </Box>
    </>
  );
}
