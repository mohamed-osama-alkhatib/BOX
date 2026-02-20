// react
import { useState, useContext } from "react";
// data
import { ProductsContext } from "../../../contexts/Products";
// main
export const useProductsTable = () => {
  const { productsData } = useContext(ProductsContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const processedProducts = productsData
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.details.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (selectedFilter) {
        case "mostExpensive":
          return b.price - a.price;
        case "cheapest":
          return a.price - b.price;
        case "mostQuantity":
          return b.quantity - a.quantity;
        case "leastQuantity":
          return a.quantity - b.quantity;
        default:
          return 0;
      }
    });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setAnchorEl(null);
    setPage(0);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  return {
    processedProducts,
    page,
    rowsPerPage,
    anchorEl,
    selectedFilter,
    searchTerm,
    handleChangePage,
    handleChangeRowsPerPage,
    handleClick,
    handleClose,
    handleFilterSelect,
    handleSearch,
  };
};
