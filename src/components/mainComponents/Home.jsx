// react-router-dom
import { useNavigate } from "react-router-dom";
// @mui/material
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
// @mui/icons-material
import {
  TaskAlt as TaskIcon,
  BarChart as ChartIcon,
  Group as TeamIcon,
  ContactSupport as ContactIcon,
} from "@mui/icons-material";
// main
function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <Container maxWidth="lg" style={{ padding: "0px", direction: "rtl" }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: { xs: "60vh", md: "80vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
          color: "white",
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 0 },
          mb: { xs: 2, md: 4 },
          borderRadius: 4,
        }}
      >
        <Stack spacing={{ xs: 2, md: 3 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3.75rem" },
              lineHeight: { xs: 1.2, md: 1.3 },
            }}
          >
            نظام إدارة الأعمال
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1rem", md: "1.5rem" },
              px: { xs: 2, md: 0 },
            }}
          >
            تبسيط عمليات عملك مع حل الإدارة الشامل
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "#6366f1",
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              borderRadius: "50px",
              fontSize: { xs: "0.9rem", md: "1.1rem" },
              textTransform: "none",
              boxShadow: "0 4px 14px 0 rgba(0,0,0,0.1)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.9)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px 0 rgba(0,0,0,0.15)",
              },
              transition: "all 0.3s ease",
            }}
            onClick={handleGetStarted}
          >
            ابدأ الآن
          </Button>
        </Stack>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h3" component="h2" gutterBottom>
          الميزات الرئيسية
        </Typography>
        <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, md: 12 }}>
          <Grid size={4}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <TaskIcon sx={{ fontSize: 40, color: "#6366f1", mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  إدارة المهام
                </Typography>
                <Typography color="text.secondary">
                  تنظيم ومتابعة مهام ومشاريع فريقك بكفاءة
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <ChartIcon sx={{ fontSize: 40, color: "#6366f1", mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  تحليلات الأداء
                </Typography>
                <Typography color="text.secondary">
                  مراقبة مقاييس الأعمال وأداء الفريق في الوقت الفعلي
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <TeamIcon sx={{ fontSize: 40, color: "#6366f1", mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  تعاون الفريق
                </Typography>
                <Typography color="text.secondary">
                  أدوات تعاون وتواصل محسنة لفريقك
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* About Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: "background.paper",
          borderRadius: 4,
          mb: 4,
          boxShadow: 1,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={3} textAlign="center">
            <Typography variant="h3" component="h2">
              عن منصتنا
            </Typography>
            <Typography variant="body1" color="text.secondary">
              تم تصميم نظام إدارة الأعمال لدينا لمساعدة المنظمات على تبسيط
              عملياتها، وتحسين إنتاجية الفريق، واتخاذ قرارات قائمة على البيانات.
              مع أدوات سهلة الاستخدام لإدارة المهام، وتتبع الأداء، وتعاون
              الفريق، نقدم كل ما تحتاجه لتشغيل عملك بكفاءة.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Stack spacing={3}>
          <Typography variant="h3" component="h2">
            هل تحتاج مساعدة؟
          </Typography>
          <Typography variant="h6" color="text.secondary">
            فريق الدعم لدينا هنا لمساعدتك في أي أسئلة أو استفسارات
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<ContactIcon />}
            sx={{
              bgcolor: "#6366f1",
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              fontSize: "1.1rem",
              textTransform: "none",
              boxShadow: "0 4px 14px 0 rgba(99,102,241,0.3)",
              "&:hover": {
                bgcolor: "#4f46e5",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px 0 rgba(99,102,241,0.4)",
              },
              transition: "all 0.3s ease",
            }}
            onClick={handleContact}
          >
            اتصل بالدعم
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default Home;
