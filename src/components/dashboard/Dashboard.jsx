// @mui/material
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
// components
import PagesCards from "./PagesCards";
// react
import { useState, useEffect } from "react";
// main
function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
    <Box sx={{ flexGrow: 1, direction: "rtl" }}>
      <Grid
        container
        spacing={2}
        columns={{ xs: 3, sm: 6, md: 12 }}
        sx={{ direction: "rtl" }}
      >
        <PagesCards
          pageID="1"
          pagePATH="/orders"
          pageIMAGE="/page_images/orders-page.png"
          pageNAME="الطلبات"
          pageDESCRIPTION="صفحة إدارة الطلبات"
        />
        <PagesCards
          pageID="2"
          pagePATH="/invoicesIssued"
          pageIMAGE="/page_images/invoices_issued.png"
          pageNAME="الفواتير الصادرة"
          pageDESCRIPTION="صفحة الفواتير المُصدرة"
        />
        <PagesCards
          pageID="3"
          pagePATH="/CurrentYearMonthlyLineChart"
          pageIMAGE="/page_images/chart.png"
          pageNAME="الرسم البياني الشهري"
          pageDESCRIPTION="تحليل المبيعات حسب الأشهر"
        />
        <PagesCards
          pageID="4"
          pagePATH="/criticalInventory"
          pageIMAGE="/page_images/critical_inventory.png"
          pageNAME="المخزون الحرج"
          pageDESCRIPTION="مراقبة مستويات المخزون"
        />
        <PagesCards
          pageID="5"
          pagePATH="/totalDailySales"
          pageIMAGE="/page_images/Total-daily-sales.png"
          pageNAME="المبيعات اليومية"
          pageDESCRIPTION="تقرير إجمالي المبيعات اليومي"
        />
        <PagesCards
          pageID="6"
          pagePATH="/mostSoldProducts"
          pageIMAGE="/page_images/most_sold_products.png"
          pageNAME="المنتجات الأكثر مبيعاً"
          pageDESCRIPTION="ترتيب المنتجات حسب المبيعات"
        />
      </Grid>
    </Box>
  );
}

export default DashboardPage;
