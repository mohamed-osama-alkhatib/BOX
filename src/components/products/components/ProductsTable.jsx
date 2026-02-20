//@mui/material
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
// constants
import { columns } from "../constants/tableColumns";
// main
export const ProductsTable = ({ products }) => {
  const theme = useTheme();

  return (
    <TableContainer sx={{ direction: "rtl" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                style={{
                  width: column.width,
                  background: theme.palette.productsTableColors.bg,
                  color: theme.palette.productsTableColors.color,
                  textAlign: "right", // محاذاة النص لليمين
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((row) => (
            <TableRow
              hover
              key={row.id}
              sx={{
                backgroundColor: theme.palette.productsTableColors.cellbg,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {columns.map((column) => {
                let value = row[column.id];
                if (column.id === "validity") {
                  value = `${value} شهور`; // تغيير إلى العربية
                }
                if (column.id === "image") {
                  return (
                    <TableCell
                      key={column.id}
                      style={{
                        borderColor: theme.palette.productsTableColors.border,
                      }}
                    >
                      <Avatar
                        variant="square"
                        src={value}
                        style={{
                          background: theme.palette.primary.main,
                        }}
                      >
                        {row.name[0]}
                      </Avatar>
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={column.id}
                    style={{
                      borderColor: theme.palette.productsTableColors.border,
                      textAlign: "right", // محاذاة النص لليمين
                    }}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
