import { Box, Avatar, Typography } from "@mui/material";

export default function TeamCard({ member, i }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        <Box
          key={i}
          sx={{
            width: 220,
            borderRadius: "12px",
            border: "2px solid #FFC107",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 220,
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",

              "&:hover::after": {
                opacity: 1,
                transform: "translateY(0)",
              },

              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "60px",
                background: "#FFC107",
                clipPath: "polygon(0 100%, 100% 50%, 100% 100%)",

                opacity: 0,
                transform: "translateY(100%)",
                transition: "0.4s ease",
              },
            }}
          >
            <Avatar
              src={member.img}
              variant="square"
              sx={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Typography
              fontSize="20px"
              fontWeight="600"
              sx={{ textTransform: "uppercase" }}
            >
              {member.name}
            </Typography>

            <Typography fontSize="12px" sx={{ opacity: 0.5 }}>
              {member.role}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
