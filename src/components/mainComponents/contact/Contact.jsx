// @mui/material
import { Box, Container, Typography, Stack, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
// @mui/icons-material
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
// components
import ContactInfoCard from "./components/ContactInfoCard";
import ContactForm from "./components/ContactForm";
// main
function Contact() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        pt: 1,
        pb: 1,
        minHeight: "calc(100vh - 140px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        direction: "rtl",
        bgcolor:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : "inherit",
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #6366f1 30%, #a855f7 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            اتصل بنا
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: "auto",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              px: { xs: 2, sm: 0 },
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.primary
                  : "inherit",
            }}
          >
            هل لديك أسئلة أو تحتاج إلى مساعدة؟ فريق الدعم لدينا هنا لمساعدتك على
            مدار الساعة
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Contact Information */}
          <Grid size={4}>
            <Stack spacing={2}>
              <ContactInfoCard
                icon={EmailIcon}
                title="راسلنا عبر البريد الإلكتروني"
                content="mohammedosamaalkhatib@gmail.com"
              />
              <ContactInfoCard
                icon={PhoneIcon}
                title="اتصل بنا"
                content="+963 (095) 563-6967"
              />
              <ContactInfoCard
                icon={LocationIcon}
                title="زورنا"
                content={
                  <>
                    شارع النور
                    <br />
                    الزاهرة
                    <br />
                    دمشق، سوريا
                  </>
                }
              />
            </Stack>
          </Grid>

          {/* Contact Form */}
          <Grid size={8}>
            <ContactForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Contact;
