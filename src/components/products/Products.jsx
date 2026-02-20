// @mui/material
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
// components
import { ProductsHeader } from "./components/ProductsHeader";
import { ProductsTable } from "./components/ProductsTable";
// hooks
import { useProductsTable } from "./hooks/useProductsTable";
// react
import { useState, useEffect } from "react";

// main
function ProductsPage() {
  const {
    processedProducts,
    page,
    rowsPerPage,
    anchorEl,
    searchTerm,
    handleClick,
    handleClose,
    handleFilterSelect,
    handleSearch,
  } = useProductsTable();
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
    <>
      <ProductsHeader
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        handleFilterSelect={handleFilterSelect}
      />

      <Paper sx={{ width: "100%" }}>
        <ProductsTable
          products={processedProducts}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Paper>
    </>
  );
}

export default ProductsPage;
