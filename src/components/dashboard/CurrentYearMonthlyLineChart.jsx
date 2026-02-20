// react
import { useContext, useState, useEffect } from "react";
// @mui/material
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
// data
import { OrdersContext } from "../../contexts/Orders";
// chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
// main
function CurrentYearMonthlyLineChart() {
  const { ordersData } = useContext(OrdersContext);
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getMonthlyData = () => {
    const monthlyCounts = Array(12).fill(0);

    if (ordersData) {
      ordersData.forEach((order) => {
        const [, datePart] = order.date.split("-");
        const [year, month] = datePart.trim().split("/").map(Number);

        if (year === currentYear && month >= 1 && month <= 12) {
          monthlyCounts[month - 1]++;
        }
      });
    }

    return monthlyCounts;
  };

  const data = {
    labels: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    datasets: [
      {
        label: `طلبات سنة ${currentYear}`,
        data: getMonthlyData(),
        fill: false,
        borderColor: theme.palette.primary.main, // تحديث اللون من الثيم
        tension: 0.4,
        pointRadius: isMobile ? 3 : 5,
        pointHoverRadius: isMobile ? 6 : 8,
        borderWidth: 2,
        pointBackgroundColor: theme.palette.primary.main,
        pointBorderColor: theme.palette.background.paper,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme.palette.text.primary, // إضافة لون النص
          font: {
            family: theme.typography.fontFamily,
            size: isMobile ? 12 : 14,
          },
        },
      },
      tooltip: {
        bodyColor: theme.palette.text.primary, // لون نص التلميح
        backgroundColor: theme.palette.background.paper, // خلفية التلميح
        borderColor: theme.palette.divider, // لون الحدود
        borderWidth: 1,
        bodyFont: {
          family: theme.typography.fontFamily,
          size: isMobile ? 12 : 14,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme.palette.text.secondary, // لون تيكس المحور
          font: {
            family: theme.typography.fontFamily,
            size: isMobile ? 10 : 12,
          },
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0,
        },
        grid: {
          color: theme.palette.divider, // لون خطوط الشبكة
        },
        border: {
          color: theme.palette.divider, // لون حدود المحور
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: theme.palette.text.secondary, // لون تيكس المحور
          stepSize: 1,
          font: {
            family: theme.typography.fontFamily,
            size: isMobile ? 10 : 12,
          },
        },
        grid: {
          color: theme.palette.divider, // لون خطوط الشبكة
        },
        border: {
          color: theme.palette.divider, // لون حدود المحور
        },
      },
    },
    // إضافة انتقالات سلسة عند تغيير الثيم
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 0.4,
        to: 0,
        loop: true,
      },
    },
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        margin: { xs: "5px", sm: "10px" },
        bgcolor: "background.paper",
        padding: { xs: "10px", sm: "30px" },
      }}
    >
      <CardContent sx={{ padding: { xs: "10px", sm: "20px" } }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontWeight: "bold",
            color: "text.primary",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            textAlign: "right",
          }}
        >
          إحصائيات الطلبات الشهرية ({currentYear})
        </Typography>

        <Box
          sx={{
            position: "relative",
            height: { xs: "300px", sm: "400px" },
            padding: { xs: "5px", sm: "20px" },
            // إضافة خلفية شفافة للمخطط
            "& canvas": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.background.default
                  : theme.palette.background.paper,
              borderRadius: "8px",
            },
          }}
        >
          <Line data={data} options={options} redraw={true} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default CurrentYearMonthlyLineChart;
