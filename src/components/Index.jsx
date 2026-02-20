// React and hooks
import { useState, useEffect, Suspense, lazy } from "react";
import PropTypes from "prop-types";

// MUI components
import { Toolbar, Box, useTheme, CircularProgress } from "@mui/material";

// Routing
import { Outlet, Routes, Route } from "react-router-dom";

// Contexts
import { ProductsContext } from "../contexts/Products";
import { CompaniesContext } from "../contexts/Companies";
import { ShoppingCartContext } from "../contexts/ShoppingCart";
import { OrdersContext } from "../contexts/Orders";
import { ProductsOfCompaniesContext } from "../contexts/ProductsOfCompanies";
import { OpenCartModelContext } from "../contexts/OpenModel";
import { ClientsContext } from "../contexts/Clients";
import { InvoicesContext } from "../contexts/Invoices";

// Data
import data from "../data/Products.json";
import dataOfCompanies from "../data/Companies.json";
import dataOfCompaniesProducts from "../data/ProductsOfCompanies.json";
import dataOfClients from "../data/Clients.json";

// Components
import NavigationDrawer from "./mainComponents/Navigation";
import Header from "./mainComponents/Header";
import ErrorBoundary from "./ErrorBoundary";

// Lazy loaded components
const DashboardPage = lazy(() => import("./dashboard/Dashboard"));
const RequestProductsPage = lazy(() =>
  import("./sendOrderToCompany/RequestProducts")
);
const ProductsPage = lazy(() => import("./products/Products"));
const StatisticsPage = lazy(() => import("./statistics/Statistics"));
const Home = lazy(() => import("./mainComponents/Home"));
const Orders = lazy(() => import("./orders/Orders"));
const CompanyProducts = lazy(() =>
  import("./sendOrderToCompany/components/CompanyProducts")
);
const CurrentYearMonthlyLineChart = lazy(() =>
  import("./dashboard/CurrentYearMonthlyLineChart")
);
const MostSoldProducts = lazy(() => import("./dashboard/MostSoldProducts"));
const TotalDailySales = lazy(() => import("./dashboard/TotalDailySales"));
const CriticalInventory = lazy(() => import("./dashboard/CriticalInventory"));
const CreateAnInvoice = lazy(() => import("./createAnInvoice/CreateAnInvoice"));
const Clients = lazy(() => import("./clients/Clients"));
const Contact = lazy(() => import("./mainComponents/contact/Contact"));
const InvoicesIssued = lazy(() => import("./dashboard/InvoicesIssued"));

// Loading component
const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

const DRAWER_WIDTH = 240;

function HomeContent({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", direction: "rtl" }}>
      <Header
        open={open}
        setOpen={setOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <NavigationDrawer open={open} setOpen={setOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginRight: open ? `${DRAWER_WIDTH}px` : "",
          transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar />
        <Box sx={{ direction: "ltr" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

// Main Index Component
export default function Index({ darkMode, setDarkMode }) {
  const [productsData, setProductsData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [companiesData, setCompaniesData] = useState([]);
  const [cart, setCart] = useState([]);
  const [cproductsData, setCproductsData] = useState([]);
  const [openCartModel, setOpenCartModel] = useState(false);
  const [clientsData, setClientsData] = useState([]);
  const [invoicesData, setInvoicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Data initialization effects
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Products data
        if (Array.isArray(data)) {
          setProductsData(data);
        } else if (data?.products) {
          setProductsData(data.products);
        }

        // Companies data
        if (Array.isArray(dataOfCompanies)) {
          setCompaniesData(dataOfCompanies);
        } else if (dataOfCompanies?.companies) {
          setCompaniesData(dataOfCompanies.companies);
        }

        // Company products data
        if (Array.isArray(dataOfCompaniesProducts)) {
          setCproductsData(dataOfCompaniesProducts);
        } else if (dataOfCompaniesProducts?.products) {
          setCproductsData(dataOfCompaniesProducts.products);
        }

        // Clients data
        if (Array.isArray(dataOfClients)) {
          setClientsData(dataOfClients);
        } else if (dataOfClients?.clients) {
          setClientsData(dataOfClients.clients);
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Context providers
  const contextProviders = [
    { context: ProductsContext, value: { productsData, setProductsData } },
    { context: OrdersContext, value: { ordersData, setOrdersData } },
    { context: CompaniesContext, value: { companiesData, setCompaniesData } },
    { context: ShoppingCartContext, value: { cart, setCart } },
    {
      context: ProductsOfCompaniesContext,
      value: { cproductsData, setCproductsData },
    },
    {
      context: OpenCartModelContext,
      value: { openCartModel, setOpenCartModel },
    },
    { context: ClientsContext, value: { clientsData, setClientsData } },
    { context: InvoicesContext, value: { invoicesData, setInvoicesData } },
  ];

  // Nested context providers
  const renderContextProviders = (providers, children) => {
    if (providers.length === 0) return children;

    const [current, ...rest] = providers;
    const { context: Context, value } = current;

    return (
      <Context.Provider value={value}>
        {renderContextProviders(rest, children)}
      </Context.Provider>
    );
  };

  return renderContextProviders(
    contextProviders,
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            element={
              <HomeContent darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          >
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<ProductsPage />} />
            <Route
              path="companyProducts/:companyName"
              element={<CompanyProducts />}
            />
            <Route path="clients" element={<Clients />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="createAnInvoice" element={<CreateAnInvoice />} />
            <Route path="requestProducts" element={<RequestProductsPage />} />
            <Route path="invoicesIssued" element={<InvoicesIssued />} />
            <Route
              path="currentYearMonthlyLineChart"
              element={<CurrentYearMonthlyLineChart />}
            />
            <Route path="mostSoldProducts" element={<MostSoldProducts />} />
            <Route path="totalDailySales" element={<TotalDailySales />} />
            <Route path="criticalInventory" element={<CriticalInventory />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

Index.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
