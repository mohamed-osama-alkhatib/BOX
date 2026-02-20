// material
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { useTheme } from "@mui/material";
import { Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
// icons-material
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
// react
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// contexts
import { ShoppingCartContext } from "../../contexts/ShoppingCart";
import { OpenCartModelContext } from "../../contexts/OpenModel";
// navigation
const drawerWidth = 240;
// main
function Header({ open, darkMode, setDarkMode }) {
  // theme
  const theme = useTheme();
  // contexts
  const { cart } = useContext(ShoppingCartContext);
  const { setOpenCartModel } = useContext(OpenCartModelContext);
  // state
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  // user data
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleOpenCart = () => {
    setOpenCartModel(true);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        direction: "rtl",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: `calc(100% - ${open ? drawerWidth : 56}px)`,
        mr: open ? `${drawerWidth}px` : "56px",
        ml: "auto",
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-start" }}>
        {/* logo */}
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            height: "40px",
            width: "auto",
            userSelect: "none",
            objectFit: "contain",
            marginLeft: "auto",
            borderRadius: "20px",
          }}
        />

        {/* shopping cart */}
        <Tooltip title={cart.length > 0 ? "عرض سلة التسوق" : "السلة فارغة"}>
          <span>
            <IconButton
              color="inherit"
              onClick={handleOpenCart}
              sx={{ ml: 1 }}
              disabled={cart.length === 0}
            >
              <Badge
                badgeContent={cart.length}
                color="secondary"
                sx={{
                  "& .MuiBadge-badge": {
                    left: -3,
                    top: 3,
                    border: `2px solid ${theme.palette.background.paper}`,
                    padding: "0 4px",
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </span>
        </Tooltip>

        {/*  mode  */}
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          color="white"
          checkedIcon={
            <BedtimeIcon fontSize="small" style={{ color: "white" }} />
          }
          icon={<WbSunnyIcon fontSize="small" style={{ color: "#ffc107" }} />}
        />
        {/*  account button  */}
        <Tooltip title={user?.username || "حسابي"}>
          <IconButton sx={{ p: 0 }} onClick={handleMenuOpen}>
            <Avatar
              style={{
                background: theme.palette.quaternary.main,
                borderStyle: "solid",
                borderWidth: "5px,",
                borderColor: theme.palette.tertiary.main,
                color: theme.palette.tertiary.main,
                marginLeft: "10px",
              }}
              alt={user?.username || "مستخدم"}
              src="/static/images/avatar/2.jpg"
            />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              {user?.username}
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon fontSize="small" sx={{ ml: 1 }} />
            تسجيل الخروج
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
