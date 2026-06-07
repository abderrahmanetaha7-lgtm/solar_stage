import { motion } from "framer-motion";
import { fadeInUp } from "./motionVariants";

export default function FadeIn({
  children,
  delay = 0,
  as = "div",
  ...props
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeInUp}
      transition={{ delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
