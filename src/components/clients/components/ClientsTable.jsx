// @mui/material
import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
// icons-material
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// main
function ClientsTable({ clients, onEdit, onDelete }) {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              borderBottom: `2px solid ${theme.palette.secondary.main}`,
            }}
          >
            <TableCell align="right" width="16.6%">
              الاسم
            </TableCell>
            <TableCell align="right" width="16.6%">
              البريد الإلكتروني
            </TableCell>
            <TableCell align="right" width="16.6%">
              رقم الهاتف
            </TableCell>
            <TableCell align="right" width="16.6%">
              العنوان
            </TableCell>
            <TableCell align="right" width="16.6%">
              عدد الفواتير
            </TableCell>
            <TableCell align="right" width="16.6%">
              تعديل / حذف
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell align="right" width="16.6%">
                {client.name}
              </TableCell>
              <TableCell align="right" width="16.6%">
                {client.email}
              </TableCell>
              <TableCell align="right" width="16.6%">
                {client.phone}
              </TableCell>
              <TableCell align="right" width="16.6%">
                {client.address}
              </TableCell>
              <TableCell align="right" width="16.6%">
                {client.numberOfInvoices || 0}
              </TableCell>
              <TableCell align="right" width="16.6%">
                <IconButton color="primary" onClick={() => onEdit(client)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(client.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ClientsTable;
