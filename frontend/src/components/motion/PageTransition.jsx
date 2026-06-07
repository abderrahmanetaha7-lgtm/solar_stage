import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { pageTransition } from "./motionVariants";

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {children}
    </motion.div>
  );
}
