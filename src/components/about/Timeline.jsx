import { Box, Container } from "@mui/material";
import TimelineItem from "./TimelineItem";

export default function Timeline() {
  const data = [
    {
      year: "2010",
      description:
        "L’énergie solaire était encore chère et utilisée surtout dans les grands projets industriels et les initiatives gouvernementales.",
    },
    {
      year: "2015",
      description:
        "La forte baisse du prix des panneaux solaires a rendu les systèmes solaires résidentiels plus accessibles aux foyers.",
    },
    {
      year: "2018",
      description:
        "L’adoption de masse a commencé grâce à l’amélioration de l’efficacité et aux aides gouvernementales pour les énergies renouvelables.",
    },
    {
      year: "2022",
      description:
        "L’intégration de systèmes solaires intelligents avec batteries a permis le stockage de l’énergie et une utilisation 24h/24.",
    },
    {
      year: "2024",
      description:
        "L’énergie solaire est devenue l’une des sources d’électricité les moins chères au monde, entraînant une forte expansion mondiale.",
    },
  ];

  return (
    <Box sx={{ py: 10 }}>
      <Container sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            width: 2,
            background: "#ccc",
            top: 0,
            bottom: 0,
          }}
        />

        {data.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </Container>
    </Box>
  );
}
