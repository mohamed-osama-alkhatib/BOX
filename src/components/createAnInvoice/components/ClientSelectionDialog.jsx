// @mui/material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// main
const ClientSelectionDialog = ({
  open,
  onClose,
  selectedClientId,
  onClientSelect,
  clientsData,
  onCancel,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>اختر العميل</DialogTitle>
      <DialogContent>
        <FormControl sx={{ width: "340px" }} margin="dense">
          <InputLabel>العميل</InputLabel>
          <Select
            value={selectedClientId}
            onChange={(e) => onClientSelect(e.target.value)}
            label="العميل"
            sx={{ textAlign: "right" }}
          >
            {clientsData.map((client) => (
              <MenuItem
                key={client.id}
                value={client.id}
                sx={{ direction: "rtl" }}
              >
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>إلغاء</Button>
        <Button onClick={onSubmit} color="success" disabled={!selectedClientId}>
          تأكيد البيع
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientSelectionDialog;
