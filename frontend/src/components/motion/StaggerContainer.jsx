import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { staggerContainer } from "./motionVariants";

export default function StaggerContainer({ children, ...props }) {
  return (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={staggerContainer}
      {...props}
    >
      {children}
    </Box>
  );
}
