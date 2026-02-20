// @mui/material
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
// icons-material
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// react
import { useState, useContext, useEffect } from "react";
// data
import { InvoicesContext } from "../../contexts/Invoices";
// theme
import { useTheme } from "@mui/material/styles";
// main
function InvoicesIssued() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const { invoicesData } = useContext(InvoicesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredInvoices = invoicesData.filter((invoice) =>
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewInvoice = (filePath) => {
    window.open(filePath, "_blank");
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
    <Box sx={{ flexGrow: 1, p: 3, direction: "rtl" }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom align="right">
              الفواتير الصادرة
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="ابحث باسم العميل"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ marginRight: "10px" }} />
                  </InputAdornment>
                ),
                sx: { textAlign: "right" },
              }}
            />
          </Paper>
        </Grid>

        {/* Table */}
        <Grid size={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    borderBottom: `2px solid ${theme.palette.secondary.main}`,
                  }}
                >
                  <TableCell align="right">اسم العميل</TableCell>
                  <TableCell align="right">التاريخ</TableCell>
                  <TableCell align="left">عرض الفاتورة</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell align="right">
                        {invoice.customerName}
                      </TableCell>
                      <TableCell align="right">{invoice.date}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          color="primary"
                          onClick={() => handleViewInvoice(invoice.filePath)}
                        >
                          <PictureAsPdfIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography
                        variant="h6"
                        sx={{ color: "text.secondary", py: 2 }}
                      >
                        لا توجد فواتير
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default InvoicesIssued;
