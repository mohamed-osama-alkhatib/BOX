// react
import { useContext, useEffect, useState } from "react";
// @mui/material
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
// react-router-dom
import { useParams } from "react-router-dom";
// data
import { ProductsOfCompaniesContext } from "../../../contexts/ProductsOfCompanies";
import { ShoppingCartContext } from "../../../contexts/ShoppingCart";
// components
import ShoppingCart from "./ShoppingCart";
import NotificationSnackbar from "../../mainComponents/NotificationSnackbar";
// main
function CompanyProducts() {
  // params
  const { companyName } = useParams();
  // data
  const context = useContext(ProductsOfCompaniesContext);
  const { cart, setCart } = useContext(ShoppingCartContext);
  const [loading, setLoading] = useState(true);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      setCart([]);
    };
  }, [setCart]);

  const handleQuantity = (productId, delta) => () => {
    setCart((prevCart) => {
      const product = context?.cproductsData?.find((p) => p.id === productId);
      const currentItem = prevCart.find((item) => item.productId === productId);

      if (delta > 0) {
        const availableQuantity =
          product.quantity - (currentItem?.quantity || 0);
        if (availableQuantity <= 0) return prevCart;
      }

      const existingItemIndex = prevCart.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex === -1) {
        return delta > 0 ? [...prevCart, { productId, quantity: 1 }] : prevCart;
      } else {
        const newQuantity = prevCart[existingItemIndex].quantity + delta;
        if (newQuantity <= 0) {
          return prevCart.filter((_, index) => index !== existingItemIndex);
        } else {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: newQuantity,
          };
          return updatedCart;
        }
      }
    });
  };

  const filteredProducts =
    context?.cproductsData?.filter(
      (product) => product.company === companyName
    ) || [];

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
      <Grid container spacing={2} columns={{ xs: 3, sm: 6, md: 12 }}>
        {filteredProducts.map((product) => {
          const currentQuantity =
            cart.find((item) => item.productId === product.id)?.quantity || 0;
          return (
            <Grid size={3} key={product.id}>
              <Card sx={{ maxWidth: 345, mb: 2, userSelect: "none" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Box sx={{ height: 190 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      align="right"
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 2, mt: 2 }}
                      align="right"
                    >
                      <span style={{ fontWeight: "bold" }}>السعر: </span>
                      {Number(product.price).toLocaleString("en-SY", {
                        style: "currency",
                        currency: "SYP",
                      })}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 2 }}
                      align="right"
                    >
                      <span style={{ fontWeight: "bold" }}>الصلاحية: </span>
                      {product.validity} شهور
                    </Typography>
                    <Divider style={{ marginBlock: "10px" }} />
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      align="right"
                    >
                      {product.details}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mt={1.5}
                    justifyContent="flex-end"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleQuantity(product.id, -1)}
                      disabled={currentQuantity <= 0}
                      sx={{ minWidth: 30, p: 0.5 }}
                    >
                      -
                    </Button>
                    <TextField
                      value={currentQuantity}
                      size="small"
                      inputProps={{
                        style: {
                          textAlign: "center",
                          padding: "4px",
                          width: 40,
                        },
                      }}
                      sx={{
                        "& .MuiInputBase-root": { bgcolor: "action.hover" },
                      }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleQuantity(product.id, 1)}
                      sx={{ minWidth: 30, p: 0.5 }}
                    >
                      +
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {/* model */}
      <ShoppingCart
        companyName={companyName}
        onOrderSubmit={() =>
          setSnackbarState({
            open: true,
            message: "تم إرسال الطلب بنجاح",
            severity: "success",
          })
        }
        onOrderCancel={() =>
          setSnackbarState({
            open: true,
            message: "تم إلغاء الطلب",
            severity: "info",
          })
        }
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

export default CompanyProducts;
