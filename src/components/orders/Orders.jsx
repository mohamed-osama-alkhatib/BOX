// react
import { useState, useEffect } from "react";
// @mui/material
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
// components
import OrderHeader from "./components/OrderHeader";
import OrderCard from "./components/OrderCard";
import OrderDialogs from "./components/OrderDialogs";
import NotificationSnackbar from "../mainComponents/NotificationSnackbar";
// hooks
import { useOrderManagement } from "./hooks/useOrderManagement";
// main
function Orders() {
  // إدارة الحالة عبر الهوك المخصص
  const {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    snackbarState,
    setSnackbarState,
    dialogState,
    setDialogState,
    filteredOrders,
    handleDelete,
    handleStatusChange,
    confirmDelete,
    confirmStatusChange,
    handlePrint,
  } = useOrderManagement();

  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

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
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
        <OrderHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
        />

        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onPrint={handlePrint}
            />
          ))
        ) : (
          <Grid size={12}>
            <Typography
              variant="h6"
              align="center"
              sx={{ mt: 4, color: "text.secondary" }}
            >
              لا توجد طلبات
            </Typography>
          </Grid>
        )}
      </Grid>

      <OrderDialogs
        deleteDialogOpen={dialogState.deleteDialogOpen}
        setDeleteDialogOpen={(open) =>
          setDialogState((prev) => ({ ...prev, deleteDialogOpen: open }))
        }
        statusDialogOpen={dialogState.statusDialogOpen}
        setStatusDialogOpen={(open) =>
          setDialogState((prev) => ({ ...prev, statusDialogOpen: open }))
        }
        onConfirmDelete={confirmDelete}
        onConfirmStatusChange={confirmStatusChange}
      />

      <NotificationSnackbar
        open={snackbarState.open}
        onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))}
        message={snackbarState.message}
        severity={snackbarState.severity}
      />
    </Box>
  );
}

export default Orders;
