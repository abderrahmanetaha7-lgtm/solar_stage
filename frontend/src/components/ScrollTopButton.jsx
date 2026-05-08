import { useState, useEffect } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollTopButton() {
  const [show, setShow] = useState(false);

  // 👇 Listen to scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 Scroll back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={show}>
      <Fab
        onClick={scrollToTop}
        color="primary"
        size="medium"
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}