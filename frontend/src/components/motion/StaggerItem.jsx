import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { fadeInUp } from "./motionVariants";

export default function StaggerItem({ children, ...props }) {
  return (
    <Box component={motion.div} variants={fadeInUp} {...props}>
      {children}
    </Box>
  );
}
