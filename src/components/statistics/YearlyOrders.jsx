// react
import { useEffect, useState, useContext } from "react";
// @mui/material
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// data
import { OrdersContext } from "../../contexts/Orders";
// chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function YearlyOrders() {
  const theme = useTheme();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { ordersData } = useContext(OrdersContext);

  useEffect(() => {
    const img = new Image();
    img.src = `https://www.chartjs.org/img/chartjs-logo.svg`;

    img.onload = () => {
      setBackgroundImage(img);
      setImageLoading(false);
    };

    img.onerror = () => {
      console.error("Failed to load background image");
      setImageError(true);
      setImageLoading(false);
    };
  }, []);

  const processData = () => {
    if (!ordersData) return { labels: [], data: [] };

    const yearCounts = ordersData.reduce((acc, order) => {
      const dateString = order.date.split("-")[1].trim();
      const year = dateString.split("/")[0];
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(yearCounts),
      data: Object.values(yearCounts),
    };
  };

  const chartData = {
    labels: processData().labels,
    datasets: [
      {
        label: "عدد الطلبات حسب السنة",
        data: processData().data,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(47, 128, 237)",
          "rgb(255, 182, 193)",
          "rgb(34, 139, 34)",
          "rgb(147, 112, 219)",
        ],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        rtl: false,
        labels: {
          color: theme.palette.text.primary,
        },
      },
      tooltip: {
        rtl: false,
        bodyColor: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
      },
    },
    cutout: "70%",
  };

  const plugin = {
    id: "customCanvasBackgroundImage",
    beforeDraw: (chart) => {
      if (!backgroundImage || imageLoading || imageError) return;

      const ctx = chart.ctx;
      const { top, left, width, height } = chart.chartArea;
      const x = left + width / 2 - backgroundImage.width / 2;
      const y = top + height / 2 - backgroundImage.height / 2;

      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.drawImage(backgroundImage, x, y);
      ctx.restore();
    },
  };

  if (imageLoading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography sx={{ color: theme.palette.text.primary }}>
          جاري تحميل الرسم البياني...
        </Typography>
      </Box>
    );
  }

  if (imageError) {
    return (
      <Box sx={{ p: 3, textAlign: "center", color: "error.main" }}>
        <Typography>خطأ في تحميل الخلفية</Typography>
      </Box>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        margin: "4px",
        direction: "rtl",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: theme.palette.text.primary }}
        >
          توزيع الطلبات حسب السنة
        </Typography>

        <Box sx={{ position: "relative", height: "400px" }}>
          <Doughnut
            data={chartData}
            options={chartOptions}
            plugins={[plugin]}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default YearlyOrders;
