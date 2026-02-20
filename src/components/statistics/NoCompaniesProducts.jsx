// react
import { useEffect, useState, useContext } from "react";
// @mui/material
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// data
import { ProductsContext } from "../../contexts/Products";
// chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // أضف هذا الاستيراد
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2"; // غير Bar إلى Doughnut
// تسجيل المكونات المطلوبة للمخطط الدائري
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // تسجيل العنصر الجديد
  Tooltip,
  Legend
);

function NoCompaniesProducts() {
  const theme = useTheme();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { productsData } = useContext(ProductsContext);

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
    if (!productsData) return { labels: [], data: [] };
    const companyCounts = productsData.reduce((acc, product) => {
      acc[product.company] = (acc[product.company] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(companyCounts),
      data: Object.values(companyCounts),
    };
  };

  // تعديل البيانات لتتناسب مع المخطط الدائري
  const chartData = {
    labels: processData().labels,
    datasets: [
      {
        label: "عدد المنتجات",
        data: processData().data,
        backgroundColor: [
          "rgb(255, 99, 132)", // الأحمر الوردي (أصلي)
          "rgb(54, 162, 235)", // الأزرق الفاتح (أصلي)
          "rgb(255, 205, 86)", // الأصفر الذهبي (أصلي)
          "rgb(75, 192, 192)", // التركواز الفاتح
          "rgb(153, 102, 255)", // البنفسجي الناعم
          "rgb(255, 159, 64)", // البرتقالي المشع
          "rgb(47, 128, 237)", // الأزرق الكلاسيكي الغامق
          "rgb(255, 182, 193)", // الوردي الفاتح (لون حلوى)
          "rgb(34, 139, 34)", // الأخضر العشبي
          "rgb(147, 112, 219)", // اللافندر الأرجواني
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
  // تعديل الـ plugin حسب المثال
  const plugin = {
    id: "customCanvasBackgroundImage",
    beforeDraw: (chart) => {
      if (!backgroundImage || imageLoading || imageError) return;

      const ctx = chart.ctx;
      const { top, left, width, height } = chart.chartArea;
      const x = left + width / 2 - backgroundImage.width / 2;
      const y = top + height / 2 - backgroundImage.height / 2;

      ctx.save();
      ctx.globalAlpha = 0.5; // شفافية الصورة
      ctx.drawImage(backgroundImage, x, y);
      ctx.restore();
    },
  };

  if (imageLoading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>جاري تحميل الرسم البياني...</Typography>
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
        margin: "4px 4px 20px 4px",
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
          توزيع المنتجات حسب الشركات
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

export default NoCompaniesProducts;
