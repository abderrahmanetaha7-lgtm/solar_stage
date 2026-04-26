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
      title: "About Us",
      text: "We are a team of experts in renewable energy, specializing in the design and installation of solar panel systems. Our goal is to help our clients reduce electricity costs while contributing to a cleaner and greener environment.",
      img: img1,
    },
    {
      title: "Our Vision",
      text: "We envision a world fully powered by clean, renewable energy where solar energy is accessible to everyone.",
      img: img2,
    },
    {
      title: "Our Values",
      text: "We believe in innovation, transparency, quality, and long-term commitment to our clients and the environment.",
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
      <Box sx={{py:10}}>
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
