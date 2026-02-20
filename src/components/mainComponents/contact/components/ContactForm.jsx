// react
import { useState } from "react";
// @mui/material
import {
  TextField,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
// @mui/icons-material
import { Send as SendIcon } from "@mui/icons-material";
// main
const ContactForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor:
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : "white",
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
        height: "100%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              placeholder="اكتب الموضوع هنا"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.background.default
                      : "inherit",
                },
                "& .MuiInputLabel-root": {
                  right: 0,
                  left: "auto",
                  transformOrigin: "top right",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : "inherit",
                },
                "& .MuiInputBase-input": {
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : "inherit",
                },
              }}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              placeholder="اكتب رسالتك هنا"
              name="message"
              multiline
              rows={isMobile ? 3 : 8}
              value={formData.message}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.background.default
                      : "inherit",
                },
                "& .MuiInputLabel-root": {
                  right: 0,
                  left: "auto",
                  transformOrigin: "top right",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : "inherit",
                },
                "& .MuiInputBase-input": {
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : "inherit",
                },
              }}
            />
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              size={isMobile ? "medium" : "large"}
              startIcon={
                <SendIcon sx={{ marginLeft: "10px", marginRight: "-5px" }} />
              }
              sx={{
                bgcolor: "#6366f1",
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                borderRadius: "50px",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                textTransform: "none",
                boxShadow: "0 4px 14px 0 rgba(99,102,241,0.3)",
                "&:hover": {
                  bgcolor: "#4f46e5",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px 0 rgba(99,102,241,0.4)",
                },
                transition: "all 0.3s ease",
                color: "white",
              }}
            >
              إرسال الرسالة
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactForm;
