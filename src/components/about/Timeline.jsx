import { Box, Container } from "@mui/material"; 
import TimelineItem from "./TimelineItem";

export default function Timeline() {
  const data = [
  {
    year: "2010",
    description:
      "Solar energy was still expensive and mainly used in large industrial projects and government initiatives.",
  },
  {
    year: "2015",
    description:
      "Significant drop in solar panel prices made residential solar systems more accessible to households.",
  },
  {
    year: "2018",
    description:
      "Mass adoption began as efficiency improved and governments introduced renewable energy incentives.",
  },
  {
    year: "2022",
    description:
      "Integration of smart solar systems with batteries allowed energy storage and 24/7 power usage.",
  },
  {
    year: "2024",
    description:
      "Solar energy became one of the cheapest electricity sources globally, leading to rapid worldwide expansion.",
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