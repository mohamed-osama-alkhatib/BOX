// material
import { useTheme } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// columns of products table
const columns = [
  { id: "image", label: "الصورة", minWidth: 140 },
  { id: "name", label: "الاسم", minWidth: 160 },
  { id: "quantity", label: "الكمية", minWidth: 100 },
  { id: "price", label: "السعر", minWidth: 100 },
  { id: "validity", label: "الصلاحية", minWidth: 130 },
  { id: "details", label: "الإجراءات", minWidth: 160 },
];
// main
const ProductsTable = ({
  products,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        marginTop: "20px",
        direction: "rtl",
      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label="جدول المنتجات">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  sx={{
                    minWidth: column.minWidth,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow hover tabIndex={-1} key={product.id}>
                <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    variant="square"
                    src={product.image}
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: theme.palette.primary.main,
                    }}
                  />
                </TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">
                  {product.availableQuantity}
                </TableCell>
                <TableCell align="center">
                  {Number(product.price).toLocaleString("en-SY", {
                    style: "currency",
                    currency: "SYP",
                  })}
                </TableCell>
                <TableCell align="center">{product.validity} شهور</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => onRemoveFromCart(product.id)}
                      disabled={
                        !cartItems.find((item) => item.id === product.id)
                      }
                    >
                      -
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => onAddToCart(product)}
                      disabled={product.availableQuantity <= 0}
                    >
                      +
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductsTable;
