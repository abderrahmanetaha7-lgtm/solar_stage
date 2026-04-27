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
import team2 from "../assets/images/team2.jpg";
import team4 from "../assets/images/team4.jpg";

import Timeline from "../components/about/Timeline";
import ZigzagItem from "../components/about/ZigzagItem";
import HeroSection from "../components/about/HeroSection";
import TeamSection from "../components/about/TeamSection";

export default function About() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const sections = [
    {
      title: "À propos de nous",
      text: "Nous sommes une équipe d’experts en énergie renouvelable, spécialisée dans la conception et l’installation de panneaux solaires. Notre objectif est d’aider nos clients à réduire leurs coûts d’électricité tout en contribuant à un environnement plus propre et plus vert.",
      img: img1,
    },
    {
      title: "Notre vision",
      text: "Nous imaginons un monde entièrement alimenté par une énergie propre et renouvelable, où l’énergie solaire est accessible à tous.",
      img: img2,
    },
    {
      title: "Nos valeurs",
      text: "Nous croyons en l’innovation, la transparence, la qualité et un engagement à long terme envers nos clients et l’environnement.",
      img: sol3,
    },
  ];

  const team = [
    { id: 1, name: "Brahim qwerty", role: "CEO", img: team2 },
    { id: 2, name: "karim Kim", role: "Design Lead", img: team4 },
    { id: 3, name: "mohmed azerty", role: "CTO", img: team2 },
    { id: 4, name: "salah med", role: "Operations", img: team4 },
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

          <TeamSection team={team} />
        </Container>

        <Timeline />
      </Box>
    </>
  );
}
