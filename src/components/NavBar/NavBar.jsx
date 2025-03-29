import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "center" : "normal",
          maxWidth: "md",
          mx: "auto",
          width: "100%",
          py: 2,
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", mb: isMobile ? 1 : 0 }}
        >
          <img
            src="src/assets/favicon-1.webp"
            alt="Logo"
            style={{ width: 32, height: 32, marginRight: 8 }}
          />
          <Typography variant="h6" fontWeight="bold">
            Reading Journal
          </Typography>
        </Box>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 2 : 4}
          alignItems="center"
        >
          {[
            { label: "Home", to: "/" },
            { label: "Sobre", to: "/sobre" },
            { label: "Lista de livros", to: "/livros" },
            { label: "Cadastrar", to: "/cadastrar" },
          ].map((link) => (
            <Typography
              key={link.to}
              component={RouterLink}
              to={link.to}
              sx={{
                color: "inherit",
                textDecoration: "none",
                fontWeight: 500,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  color: "secondary.main",
                  textDecoration: "underline",
                },
              }}
            >
              {link.label}
            </Typography>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
