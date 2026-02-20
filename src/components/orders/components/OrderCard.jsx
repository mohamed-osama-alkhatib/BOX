// @mui/material
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
// @mui/icons-material
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
// components
import OrderTable from "./OrderTable";
// main
const OrderCard = ({ order, onDelete, onStatusChange, onPrint }) => {
  const theme = useTheme();

  return (
    <Grid size={4} key={order.id}>
      <Card
        sx={{
          background: `linear-gradient(145deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
          margin: 2,
          boxShadow: 3,
          borderRadius: "16px",
          transition: "transform 0.3s",
          "&:hover": { transform: "translateY(-4px)" },
          width: "100%",
          direction: "rtl",
        }}
      >
        <CardHeader
          title={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h5" fontWeight="700">
                {order.company}
              </Typography>
              <Button
                color={order.status === "completed" ? "success" : "error"}
                onClick={() => onStatusChange(order.id)}
              >
                {order.status === "completed" ? (
                  <CheckCircleIcon />
                ) : (
                  <CancelIcon />
                )}
              </Button>
            </Stack>
          }
          subheader={order.date}
          subheaderTypographyProps={{ style: { color: "silver" } }}
          sx={{ color: "white" }}
        />
        <Divider />
        <CardContent>
          <OrderTable products={order.products} />
        </CardContent>
        <Divider />
        <CardActions>
          <Stack
            direction="row"
            spacing={2}
            style={{ width: "100%", paddingRight: "5px" }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => onDelete(order.id)}
            >
              <DeleteIcon />
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              color="success"
              onClick={() => onPrint(order)}
            >
              <PrintIcon />
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default OrderCard;
