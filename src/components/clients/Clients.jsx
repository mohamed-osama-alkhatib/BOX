// react
import { useState, useContext, useEffect } from "react";
// @mui/material
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
// data
import { ClientsContext } from "../../contexts/Clients";
// components
import NotificationSnackbar from "../mainComponents/NotificationSnackbar";
import ClientsTable from "./components/ClientsTable";
import ClientDialog from "./components/ClientDialog";
import ClientSearch from "./components/ClientSearch";
// main
function Clients() {
  // Context
  const { clientsData: contextClients, setClientsData } =
    useContext(ClientsContext);

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter clients based on search term
  const filteredClients = contextClients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (selectedClient) {
      // Edit existing client
      setClientsData((prev) =>
        prev.map((client) =>
          client.id === selectedClient.id ? { ...client, ...formData } : client
        )
      );
      setSnackbarState({
        open: true,
        message: "تم تحديث العميل بنجاح",
        severity: "success",
      });
    } else {
      // Add new client
      const newClient = {
        id: Date.now(),
        ...formData,
        numberOfInvoices: 0,
      };
      setClientsData((prev) => [...prev, newClient]);
      setSnackbarState({
        open: true,
        message: "تم إضافة العميل بنجاح",
        severity: "success",
      });
    }
    setOpenDialog(false);
    resetForm();
  };

  // Handle client deletion
  const handleDelete = (clientId) => {
    setClientsData((prev) => prev.filter((client) => client.id !== clientId));
    setSnackbarState({
      open: true,
      message: "تم حذف العميل بنجاح",
      severity: "success",
    });
  };

  // Handle client edit
  const handleEdit = (client) => {
    setSelectedClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
    });
    setOpenDialog(true);
  };

  // Handle dialog cancel
  const handleCancel = () => {
    setOpenDialog(false);
    setSnackbarState({
      open: true,
      message: "تم إلغاء العملية",
      severity: "info",
    });
    resetForm();
  };

  // Reset form and dialog state
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setSelectedClient(null);
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
      <Grid container spacing={2}>
        <Grid size={12}>
          <ClientSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddClick={() => setOpenDialog(true)}
          />
        </Grid>
        <Grid size={12}>
          <ClientsTable
            clients={filteredClients}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Grid>
      </Grid>

      <ClientDialog
        open={openDialog}
        onClose={handleCancel}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        formData={formData}
        onInputChange={handleInputChange}
        selectedClient={selectedClient}
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

export default Clients;
