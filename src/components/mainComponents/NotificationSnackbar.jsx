// @mui/material
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
// snackbar direction
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
// main
const NotificationSnackbar = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      autoHideDuration={1500}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          "& .MuiAlert-icon": { alignItems: "center" },
          color: "white",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;
