// @mui/material
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
// main
const OrderDialogs = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  statusDialogOpen,
  setStatusDialogOpen,
  onConfirmDelete,
  onConfirmStatusChange,
}) => {
  return (
    <>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        disableEnforceFocus={false}
        keepMounted={false}
        disablePortal
        container={document.body}
        dir="rtl"
      >
        <DialogTitle id="delete-dialog-title">تأكيد الحذف</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            هل أنت متأكد أنك تريد حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>إلغاء</Button>
          <Button onClick={onConfirmDelete} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Change Confirmation Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        aria-labelledby="status-dialog-title"
        aria-describedby="status-dialog-description"
        disableEnforceFocus={false}
        keepMounted={false}
        disablePortal
        container={document.body}
        dir="rtl"
      >
        <DialogTitle id="status-dialog-title">تأكيد تغيير الحالة</DialogTitle>
        <DialogContent>
          <DialogContentText id="status-dialog-description">
            هل أنت متأكد أنك تريد وضع علامة على هذا الطلب كمكتمل؟ سيتم إضافة
            المنتجات إلى المخزون الخاص بك.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>إلغاء</Button>
          <Button onClick={onConfirmStatusChange} color="success">
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderDialogs;
