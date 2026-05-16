import {
  Box,
  Container,
  Typography,
  Avatar,
  useTheme,
  Button,
} from "@mui/material";

// Images
import img1 from "../assets/images/img1.jpg";
import img2 from "../assets/images/img2.jpeg";
import sol3 from "../assets/images/sol3.webp";
import heroImg from "../assets/images/heroImg.png";

import ZigzagItem from "../components/about/ZigzagItem";
import HeroSection from "../components/about/HeroSection";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function About() {
  const theme = useTheme();
  const { t,i18n } = useTranslation();

  const isDark = theme.palette.mode === "dark";

  const sections = [
    {
      title: t("about.sections.about.title"),
      text: t("about.sections.about.text"),
      img: img1,
    },
    {
      title: t("about.sections.vision.title"),
      text: t("about.sections.vision.text"),
      img: img2,
    },
    {
      title: t("about.sections.values.title"),
      text: t("about.sections.values.text"),
      img: sol3,
    },
  ];

  return (
    <>
      <Helmet> 
        <title>
          {i18n.language === "ar"
            ? "من نحن | شركة حلول الطاقة الشمسية"
            : "À propos | Société de solutions d'énergie solaire"}
        </title>
 
        <meta
          name="description"
          content={
            i18n.language === "ar"
              ? "نحن شركة متخصصة في حلول الطاقة الشمسية نقدم أنظمة متكاملة تشمل بيع الألواح الشمسية، البطاريات، المحولات، إضافة إلى خدمات التركيب والصيانة والدعم الفني. نهدف إلى توفير طاقة نظيفة وفعالة بأعلى جودة."
              : "Nous sommes une entreprise spécialisée dans les solutions d'énergie solaire. Nous proposons des systèmes complets incluant panneaux solaires, batteries, onduleurs ainsi que l'installation, la maintenance et le support technique pour une énergie propre et efficace."
          }
        />
 
        <meta
          name="keywords"
          content={
            i18n.language === "ar"
              ? "من نحن, شركة طاقة شمسية, ألواح شمسية, بطاريات شمسية, تركيب الطاقة الشمسية"
              : "à propos, entreprise solaire, panneaux solaires, énergie renouvelable, installation solaire"
          }
        /> 
        <meta
          property="og:title"
          content={
            i18n.language === "ar"
              ? "من نحن - شركة الطاقة الشمسية"
              : "À propos - Société d'énergie solaire"
          }
        />

        <meta
          property="og:description"
          content={
            i18n.language === "ar"
              ? "تعرف على شركتنا وخبرتنا في مجال الطاقة الشمسية وحلول الطاقة النظيفة."
              : "Découvrez notre entreprise et notre expertise en solutions d'énergie solaire propre."
          }
        />

        <meta property="og:type" content="website" />
 
        <meta property="og:image" content="/about-solar.jpg" />
 
        <meta name="robots" content="index, follow" />
 
        <meta
          httpEquiv="content-language"
          content={i18n.language === "ar" ? "ar" : "fr"}
        />
      </Helmet>
      <Box sx={{ py: 10 }}>
        <Container>
          <HeroSection isDark={isDark} heroImg={heroImg} />

          {sections.map((item, i) => (
            <ZigzagItem
              key={i}
              item={item}
              reverse={i % 2 !== 0}
              isDark={isDark}
            />
          ))}
        </Container>
      </Box>
    </>
  );
}
