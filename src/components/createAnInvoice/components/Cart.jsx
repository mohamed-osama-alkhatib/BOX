import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import { useTheme } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Cart = ({ cartItems, onRemoveItem }) => {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%", marginBottom: "25px", direction: "rtl" }}>
      <Paper sx={{ width: "100%", padding: 2 }}>
        <TableContainer sx={{ height: 240, mt: 2 }}>
          <Table>
            <TableBody>
              <TableRow
                sx={{
                  borderBottom: `2px solid ${theme.palette.secondary.main}`,
                }}
              >
                <TableCell align="right">الصورة</TableCell>
                <TableCell align="right">المنتج</TableCell>
                <TableCell align="right">الكمية</TableCell>
                <TableCell align="right">السعر</TableCell>
                <TableCell align="right">الإجمالي</TableCell>
                <TableCell />
              </TableRow>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Avatar
                      variant="square"
                      src={item.image}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right" sx={{ paddingLeft: "30px" }}>
                    x{item.quantity}
                  </TableCell>
                  <TableCell align="right">
                    {Number(item.price).toLocaleString("en-SY", {
                      style: "currency",
                      currency: "SYP",
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {(Number(item.price) * item.quantity).toLocaleString(
                      "en-SY",
                      { style: "currency", currency: "SYP" }
                    )}
                  </TableCell>
                  <TableCell>
                    <Fab
                      size="small"
                      color="error"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <RemoveCircleOutlineIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Cart;
