// @mui/material
import { Box, Paper, Typography, useTheme } from "@mui/material";
// main
const ContactInfoCard = ({ icon: Icon, title, content }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor:
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : "grey.50",
        transition: "transform 0.3s",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Icon sx={{ color: "#6366f1", ml: 2 }} />
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : "inherit",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        color="text.secondary"
        sx={{
          fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
          color:
            theme.palette.mode === "dark"
              ? theme.palette.text.secondary
              : "inherit",
        }}
      >
        {content}
      </Typography>
    </Paper>
  );
};

export default ContactInfoCard;
