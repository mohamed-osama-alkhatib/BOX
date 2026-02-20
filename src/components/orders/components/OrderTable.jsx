// @mui/material
import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
// main
const OrderTable = ({ products }) => {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{
        height: 400,
        direction: "rtl",
        overflow: "auto",
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-track": {
          background: theme.palette.background.default,
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.palette.primary.main,
          borderRadius: "4px",
        },
        scrollbarWidth: "thin",
        scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.default}`,
      }}
    >
      <Table aria-label="order table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="right">الصورة</TableCell>
            <TableCell align="right">الاسم</TableCell>
            <TableCell align="center">الكمية</TableCell>
            <TableCell align="left">السعر</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row" align="right">
                <Avatar
                  variant="square"
                  src={product.image}
                  sx={{ bgcolor: deepOrange[500] }}
                >
                  {product.name[0]}
                </Avatar>
              </TableCell>
              <TableCell align="right">{product.name}</TableCell>
              <TableCell align="center">{product.quantity}</TableCell>
              <TableCell align="left">
                {(product.unitPrice * product.quantity).toLocaleString(
                  "en-SY",
                  {
                    style: "currency",
                    currency: "SYP",
                  }
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              sx={{ fontWeight: "bolder" }}
              align="right"
            >
              الإجمالي
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="left" sx={{ fontWeight: "bolder" }}>
              {products
                .reduce(
                  (sum, product) => sum + product.unitPrice * product.quantity,
                  0
                )
                .toLocaleString("en-SY", {
                  style: "currency",
                  currency: "SYP",
                })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
