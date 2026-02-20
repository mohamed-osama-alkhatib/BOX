// @mui/material
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
// main
export const ProductsHeader = ({
  searchTerm,
  handleSearch,
  anchorEl,
  handleClick,
  handleClose,
  handleFilterSelect,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingBlock: "5px",
        direction: "rtl", // إضافة اتجاه النص
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        style={{ marginTop: "10px", marginRight: "10px" }}
      >
        المنتجات
      </Typography>

      <TextField
        id="search-input"
        placeholder="ابحث عن منتجات..."
        variant="standard"
        style={{ width: "380px" }}
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ marginLeft: "5px" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputLabel-root": {
            right: 0,
            left: "auto",
            transformOrigin: "top right",
            "&.Mui-focused": {
              transform: "translate(0, -1.5px) scale(0.75)",
            },
          },
          "& .MuiInputBase-input": {
            textAlign: "right",
          },
        }}
      />

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          sx={{ padding: "2px 8px", fontSize: "0.75rem" }}
          onClick={handleClick}
        >
          <FilterListIcon />
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => handleFilterSelect("mostExpensive")}
            sx={{ borderBottom: "2px solid #f5f5f5" }}
          >
            الأغلى سعرًا
          </MenuItem>
          <MenuItem
            onClick={() => handleFilterSelect("cheapest")}
            sx={{ borderBottom: "2px solid #f5f5f5" }}
          >
            الأقل سعرًا
          </MenuItem>
          <MenuItem
            onClick={() => handleFilterSelect("mostQuantity")}
            sx={{ borderBottom: "2px solid #f5f5f5" }}
          >
            الأعلى كمية
          </MenuItem>
          <MenuItem
            onClick={() => handleFilterSelect("leastQuantity")}
            sx={{ borderBottom: "2px solid #f5f5f5" }}
          >
            الأقل كمية
          </MenuItem>
        </Menu>
      </Stack>
    </div>
  );
};
