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

export default function About() {
  const theme = useTheme();
  const {t} = useTranslation();

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
