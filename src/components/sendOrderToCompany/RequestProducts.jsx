// react
import { useContext, useState, useEffect } from "react";
// @mui/material
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CircularProgress from "@mui/material/CircularProgress";
// data
import { CompaniesContext } from "./../../contexts/Companies";
// react-router-dom
import { useNavigate } from "react-router-dom";
// main
function RequestProductsPage() {
  const context = useContext(CompaniesContext);
  const companiesData = context?.companiesData || [];
  const navFunction = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, direction: "rtl" }}>
      <Grid container spacing={2} columns={{ xs: 3, sm: 6, md: 12 }}>
        {/* content */}
        {companiesData.map((company) => (
          <Grid size={3} key={company.id}>
            <Card
              sx={{ width: "100%", mb: 2 }}
              onClick={() => {
                navFunction(`/companyProducts/${company.name}`);
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={company.image}
                  alt={company.name}
                />
                <CardContent>
                  <Box sx={{ height: 120 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {company.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 2 }}
                    >
                      {company.description}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RequestProductsPage;
