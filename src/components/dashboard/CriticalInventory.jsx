// react
//data
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
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
//data
import { ProductsContext } from "../../contexts/Products";
// main
export default function CriticalInventory() {
  const theme = useTheme();
  const { productsData = [] } = useContext(ProductsContext);
  const [criticalProducts, setCriticalProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (Array.isArray(productsData)) {
        // Filter products with quantity less than or equal to 12
        const lowStockProducts = productsData
          .filter((product) => product.quantity <= 12)
          .sort((a, b) => a.quantity - b.quantity); // Sort by quantity (lowest first)

        setCriticalProducts(lowStockProducts);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productsData]);

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

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { label: "نفاذ من المخزون", color: "error" };
    if (quantity > 0 && quantity <= 6) return { label: "حرج", color: "error" };
    if (quantity > 6 && quantity <= 12)
      return { label: "منخفض", color: "warning" };
    return { label: "طبيعي", color: "success" };
  };

  return (
    <Box sx={{ p: 3, direction: "rtl" }}>
      <Typography variant="h5" gutterBottom align="right">
        المخزون الحرج
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
              <TableCell align="right">الشركة</TableCell>
              <TableCell align="right">الكمية المتاحة</TableCell>
              <TableCell align="right">السعر</TableCell>
              <TableCell align="center">الحالة</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {criticalProducts.length > 0 ? (
              criticalProducts.map((product) => {
                const status = getStockStatus(product.quantity);
                return (
                  <TableRow key={product.id}>
                    <TableCell component="th" scope="row" align="right">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">{product.company}</TableCell>
                    <TableCell align="right">
                      <span style={{ marginRight: "40px" }}>
                        {product.quantity}
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      {product.price.toLocaleString("en-SY", {
                        style: "currency",
                        currency: "SYP",
                      })}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  لا توجد عناصر حرجة في المخزون
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
