// material
import { Drawer } from "@mui/material";
import { Toolbar } from "@mui/material";
import { List } from "@mui/material";
import { Divider } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material";
// icons-material
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import { BarChart as BarChartIcon } from "@mui/icons-material";
import { Menu as MenuIcon } from "@mui/icons-material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TableChartIcon from "@mui/icons-material/TableChart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReceiptIcon from "@mui/icons-material/Receipt";
// react-router-dom
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// navigation
const NAVIGATION = [
  { kind: "header", title: "العناصر الرئيسية" },
  { segment: "dashboard", title: "لوحة التحكم", icon: <DashboardIcon /> },
  {
    segment: "requestProducts",
    title: "طلب منتجات",
    icon: <LocalShippingIcon />,
  },
  {
    segment: "createAnInvoice",
    title: "إنشاء فاتورة",
    icon: <ReceiptIcon />,
  },
  { kind: "divider" },
  { kind: "header", title: "التحليلات" },
  { segment: "products", title: "المنتجات", icon: <TableChartIcon /> },
  { segment: "clients", title: "العملاء", icon: <PeopleAltIcon /> },
  { segment: "statistics", title: "الإحصائيات", icon: <BarChartIcon /> },
];

const drawerWidth = 240;
// main
function NavigationDrawer({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        position: open ? "absolute" : "static",
        width: open ? drawerWidth : 56,
        flexShrink: 0,
        whiteSpace: "nowrap",
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 56,
          overflowX: "hidden",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: open ? "flex-start" : "center",
          alignItems: "center",
          minHeight: { sx: "44px !important", md: "64px !important" },
          background: theme.palette.primary.main,
        }}
      >
        <IconButton
          style={{ color: "#ffffff" }}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? (
            <MenuOpenIcon sx={{ transform: "rotate(180deg)" }} />
          ) : (
            <MenuIcon />
          )}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {NAVIGATION.map((item, index) => {
          if (item.kind === "divider") return open && <Divider key={index} />;
          if (item.kind === "header")
            return (
              open && (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemText
                    primary={item.title}
                    sx={{ textAlign: "right" }}
                  />
                </ListItem>
              )
            );

          return (
            <ListItem
              key={item.segment}
              disablePadding
              onClick={() => navigate(`/${item.segment}`)}
              sx={{ display: "block" }}
            >
              <ListItemButton
                selected={location.pathname.includes(item.segment)}
                sx={{
                  justifyContent: "flex-end",
                  px: 2.5,
                  "&.Mui-selected": {
                    borderRight: `4px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                {open && (
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      transition: "opacity 0.2s",
                      textAlign: "right",
                      mr: 2,
                    }}
                  />
                )}
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
export default NavigationDrawer;
