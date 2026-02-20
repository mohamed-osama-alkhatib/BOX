// react
import { useState } from "react";
// react-router-dom
import { useNavigate } from "react-router-dom";
// data
import shopOwners from "../../data/ShopOwners.json";
// @mui/material
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  styled,
} from "@mui/material";
// style
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  borderRadius: theme.shape.borderRadius,
  direction: "rtl",
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  fontWeight: 600,
}));
// main
export default function LoginPage() {
  const [username, setUsername] = useState("osama20y9");
  const [password, setPassword] = useState("1wa3$21Js");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const user = shopOwners.find(
      (owner) => owner.username === username && owner.password === password,
    );

    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 3, fontWeight: 600 }}
          >
            مرحباً بعودتك
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            يرجى تسجيل الدخول للوصول إلى حسابك
          </Typography>

          <StyledForm onSubmit={handleSubmit}>
            <StyledTextField
              required
              fullWidth
              id="username"
              placeholder="اسم المستخدم"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              inputProps={{
                onFocus: (e) => e.target.select(),
              }}
            />
            <StyledTextField
              required
              fullWidth
              name="password"
              placeholder="كلمة المرور"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              inputProps={{
                onFocus: (e) => e.target.select(),
              }}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              تسجيل الدخول
            </StyledButton>
          </StyledForm>
        </Box>
      </StyledPaper>
    </Container>
  );
}
