import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import BoltIcon from "@mui/icons-material/Bolt";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import SavingsIcon from "@mui/icons-material/Savings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const features = [
  {
    icon: <BoltIcon sx={{ fontSize: 40, color: "#f5c542" }} />,
    title: "Affordable Solar Solutions",
    desc: "Solar systems for every budget, for homes and businesses.",
  },
  {
    icon: <BuildIcon sx={{ fontSize: 40, color: "#4caf50" }} />,
    title: "Professional Installation",
    desc: "Certified technicians ensure safe and clean installation.",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40, color: "#2196f3" }} />,
    title: "High Quality Products",
    desc: "Reliable solar panels and batteries with long-term warranty.",
  },
  {
    icon: <SavingsIcon sx={{ fontSize: 40, color: "#ff9800" }} />,
    title: "Save on Electricity Bills",
    desc: "Reduce your energy costs with clean solar power.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#9c27b0" }} />,
    title: "After-Sales Support",
    desc: "We assist you even after installation anytime you need help.",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#00bcd4" }} />,
    title: "Fast Delivery",
    desc: "Quick delivery and service in multiple regions.",
  },
];

export default function WhyChooseUs() {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Why Choose Us
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Smart solar solutions designed to save energy and money
        </Typography>

        <Grid container spacing={2} sx={{justifyContent:"center"}}>
          {features.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  border: "2px solid black",
                  borderRadius: "15px", 
                  height: "100%",
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{item.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
