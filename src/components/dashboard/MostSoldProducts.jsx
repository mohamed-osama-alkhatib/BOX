// react
import { useState, useEffect, useContext } from "react";
// @mui/material
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  useTheme,
} from "@mui/material";
// data
import { InvoicesContext } from "../../contexts/Invoices";
// main
export default function MostSoldProducts() {
  const theme = useTheme();
  const { invoicesData = [] } = useContext(InvoicesContext);
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (Array.isArray(invoicesData)) {
        // Aggregate products from all invoices
        const productSales = {};

        invoicesData.forEach((invoice) => {
          if (invoice && Array.isArray(invoice.items)) {
            invoice.items.forEach((item) => {
              if (item && item.id) {
                if (!productSales[item.id]) {
                  productSales[item.id] = {
                    name: item.name || "منتج غير معروف",
                    quantitySold: 0,
                    price: item.price || 0,
                  };
                }
                productSales[item.id].quantitySold += item.quantity || 0;
              }
            });
          }
        });

        // Convert to array and sort by quantity sold
        const sortedProducts = Object.values(productSales)
          .sort((a, b) => b.quantitySold - a.quantitySold)
          .slice(0, 10); // Get top 10 most sold products

        setMostSoldProducts(sortedProducts);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [invoicesData]);

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
    <Box sx={{ p: 3, direction: "rtl" }}>
      <Typography variant="h5" gutterBottom align="right">
        المنتجات الأكثر مبيعاً
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                borderBottom: `2px solid ${theme.palette.secondary.main}`,
              }}
            >
              <TableCell align="right">اسم المنتج</TableCell>
              <TableCell align="right">الكمية المباعة</TableCell>
              <TableCell align="right">السعر</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mostSoldProducts.length > 0 ? (
              mostSoldProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" align="right">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">
                    <span style={{ marginRight: "40px" }}>
                      {product.quantitySold}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    {product.price.toLocaleString("en-SY", {
                      style: "currency",
                      currency: "SYP",
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  لا توجد بيانات مبيعات متاحة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
