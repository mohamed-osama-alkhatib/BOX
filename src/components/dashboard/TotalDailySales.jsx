import { useState, useEffect, useContext } from "react";
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
export default function TotalDailySales() {
  const theme = useTheme();
  const { invoicesData = [] } = useContext(InvoicesContext);
  const [dailySales, setDailySales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (Array.isArray(invoicesData)) {
        // Aggregate sales by date
        const salesByDate = {};

        invoicesData.forEach((invoice) => {
          if (invoice && invoice.date) {
            if (!salesByDate[invoice.date]) {
              salesByDate[invoice.date] = {
                date: invoice.date,
                totalSales: 0,
                numberOfInvoices: 0,
              };
            }

            // Calculate total sales for this invoice
            const invoiceTotal = invoice.items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );

            salesByDate[invoice.date].totalSales += invoiceTotal;
            salesByDate[invoice.date].numberOfInvoices += 1;
          }
        });

        // Convert to array and sort by date (newest first)
        const sortedSales = Object.values(salesByDate).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setDailySales(sortedSales);
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
        ملخص المبيعات اليومية
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                borderBottom: `2px solid ${theme.palette.secondary.main}`,
              }}
            >
              <TableCell align="right">التاريخ</TableCell>
              <TableCell align="right">عدد الفواتير</TableCell>
              <TableCell align="right">إجمالي المبيعات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dailySales.length > 0 ? (
              dailySales.map((day, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" align="right">
                    {day.date}
                  </TableCell>
                  <TableCell align="right">{day.numberOfInvoices}</TableCell>
                  <TableCell align="right">
                    {day.totalSales.toLocaleString("en-SY", {
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
