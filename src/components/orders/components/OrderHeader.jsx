// @mui/material
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// @mui/icons-material
import SearchIcon from "@mui/icons-material/Search";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";

// style
const Item = styled(Paper)(({ theme }) => ({
  direction: "rtl",
  marginLeft: "35px",
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
// main
const OrderHeader = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
  return (
    <Grid size={12}>
      <Item>
        <Typography
          variant="h4"
          style={{ userSelect: "none", marginBottom: "10px" }}
          align="right"
        >
          الطلبات
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="بحث باسم الشركة"
            sx={{ width: "60ch" }}
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
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="primary"
            variant={filter === "all" ? "contained" : "outlined"}
            onClick={() => setFilter("all")}
          >
            <ViewModuleIcon sx={{ marginLeft: "5px" }} /> الكل
          </Button>

          <Button
            color="success"
            variant={filter === "completed" ? "contained" : "outlined"}
            onClick={() => setFilter("completed")}
          >
            <AssignmentTurnedInIcon sx={{ marginLeft: "5px" }} /> المكتملة
          </Button>
          <Button
            color="error"
            variant={filter === "pending" ? "contained" : "outlined"}
            onClick={() => setFilter("pending")}
          >
            <RunningWithErrorsIcon sx={{ marginLeft: "5px" }} /> المعلقة
          </Button>
        </Stack>
      </Item>
    </Grid>
  );
};

export default OrderHeader;
