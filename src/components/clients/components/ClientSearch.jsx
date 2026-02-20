// @mui/material
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
// icons-material
import SearchIcon from "@mui/icons-material/Search";
// main
function ClientSearch({ searchTerm, onSearchChange, onAddClick }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <TextField
        placeholder="البحث عن العملاء..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: 300 }}
      />
      <Button variant="contained" onClick={onAddClick}>
        إضافة عميل
      </Button>
    </Box>
  );
}

export default ClientSearch;
