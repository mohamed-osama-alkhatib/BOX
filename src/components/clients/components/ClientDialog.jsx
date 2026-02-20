// @mui/material
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// main
function ClientDialog({
  open,
  onClose,
  onSubmit,
  onCancel,
  formData,
  onInputChange,
  selectedClient,
}) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>
        {selectedClient ? "تعديل العميل" : "إضافة عميل جديد"}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 2,
            width: "340px",
          }}
        >
          <TextField
            label="الاسم"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            fullWidth
          />
          <TextField
            label="البريد الإلكتروني"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            fullWidth
          />
          <TextField
            label="رقم الهاتف"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            fullWidth
          />
          <TextField
            label="العنوان"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>إلغاء</Button>
        <Button onClick={onSubmit} variant="contained">
          {selectedClient ? "تحديث" : "إضافة"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClientDialog;
