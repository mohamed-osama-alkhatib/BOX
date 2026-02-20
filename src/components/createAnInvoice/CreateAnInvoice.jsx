// react
import { useContext, useState, useEffect } from "react";
// material
import { Box, Fab, TextField, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
// icons-material
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SearchIcon from "@mui/icons-material/Search";
// data
import { ProductsContext } from "../../contexts/Products";
import { ClientsContext } from "../../contexts/Clients";
import { InvoicesContext } from "../../contexts/Invoices";
// components
import ProductTable from "./components/ProductsTable";
import Cart from "./components/Cart";
import NotificationSnackbar from "../mainComponents/NotificationSnackbar";
import ClientSelectionDialog from "./components/ClientSelectionDialog";
// utils
import { generatePDF } from "../../utils/invoicePdfGenerator";
// main
const CreateAnInvoice = () => {
  // hooks
  const { productsData, setProductsData } = useContext(ProductsContext);
  const { clientsData, setClientsData } = useContext(ClientsContext);
  const { setInvoicesData } = useContext(InvoicesContext);
  const [cartItems, setCartItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // pdf
  const handleSubmitSale = () => {
    const selectedClient = clientsData.find(
      (client) => client.id === selectedClientId
    );
    const invoiceData = generatePDF(cartItems, selectedClient.name);

    // Add invoice to context with sales data
    setInvoicesData((prev) => [
      ...prev,
      {
        id: invoiceData.invoiceId,
        ...invoiceData,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    ]);

    // Update client's invoice count
    setClientsData((prevClients) =>
      prevClients.map((client) =>
        client.id === selectedClientId
          ? { ...client, numberOfInvoices: (client.numberOfInvoices || 0) + 1 }
          : client
      )
    );

    // Update product quantities
    setProductsData((prevProducts) =>
      prevProducts.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        if (cartItem) {
          return {
            ...product,
            quantity: product.quantity - cartItem.quantity,
          };
        }
        return product;
      })
    );

    setCartItems([]);
    setSelectedClientId("");
    setOpenModal(false);
    setSnackbarState({
      open: true,
      message: "تم إصدار الفاتورة بنجاح",
      severity: "success",
    });
  };

  const handleCancel = () => {
    setOpenModal(false);
    setSnackbarState({
      open: true,
      message: "تم إلغاء العملية",
      severity: "info",
    });
  };

  // add product to cart function
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      const availableQuantity =
        product.quantity - (existingItem?.quantity || 0);

      if (availableQuantity <= 0) return prev;

      const numericPrice = Number(product.price);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, price: numericPrice }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, price: numericPrice }];
    });
  };

  // remove product from cart function
  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (!existingItem || existingItem.quantity <= 1) return prev;

      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // kill product from cart function
  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // validity
  const processedProducts = productsData
    .filter((product) => product.quantity > 0) // Filter out products with 0 quantity
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      const availableQuantity = product.quantity - (cartItem?.quantity || 0);

      return {
        ...product,
        price: Number(product.price),
        validity: product.validity, // Use the validity directly from the product
        availableQuantity: availableQuantity > 0 ? availableQuantity : 0,
      };
    });

  // calc total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

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
    <div style={{ direction: "rtl" }}>
      <Cart cartItems={cartItems} onRemoveItem={handleRemoveItem} />

      <Box sx={{ mt: 2, gap: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="ابحث عن منتجات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon
                    sx={{ marginInline: "5px", color: "text.secondary" }}
                  />
                ),
                sx: { textAlign: "right" },
              }}
            />
          </Grid>
          <Grid size={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                onClick={() => setOpenModal(true)}
                disabled={cartItems.length === 0}
                sx={{ paddingInline: "20px" }}
              >
                <MonetizationOnIcon sx={{ ml: 1 }} />
                {`إتمام البيع (${totalPrice.toLocaleString("en-SY", {
                  style: "currency",
                  currency: "SYP",
                })})`}
              </Fab>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginBottom: "25px", mt: 2 }}>
        <ProductTable
          products={processedProducts}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
        />
      </Box>

      <ClientSelectionDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        selectedClientId={selectedClientId}
        onClientSelect={setSelectedClientId}
        clientsData={clientsData}
        onCancel={handleCancel}
        onSubmit={handleSubmitSale}
      />

      <NotificationSnackbar
        open={snackbarState.open}
        onClose={() => setSnackbarState((prev) => ({ ...prev, open: false }))}
        message={snackbarState.message}
        severity={snackbarState.severity}
      />
    </div>
  );
};

export default CreateAnInvoice;
