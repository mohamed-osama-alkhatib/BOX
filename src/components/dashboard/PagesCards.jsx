// @mui/material
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
// react-router-dom
import { useNavigate } from "react-router-dom";
// main
function PagesCards({
  pageID,
  pagePATH,
  pageIMAGE,
  pageNAME,
  pageDESCRIPTION,
}) {
  // route
  const navFunction = useNavigate();
  return (
    <Grid size={4} key={pageID}>
      <Card
        sx={{ width: "100%", mb: 2 }}
        onClick={() => {
          navFunction(`${pagePATH}`);
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="170"
            image={pageIMAGE}
            alt={pageNAME}
          />
          <CardContent>
            <Box sx={{ height: 85 }}>
              <Typography gutterBottom variant="h5" component="div">
                {pageNAME}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                {pageDESCRIPTION}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
export default PagesCards;
