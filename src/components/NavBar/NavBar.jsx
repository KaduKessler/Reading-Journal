import { AppBar, Toolbar, Typography, Box, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function NavBar() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "md",
          mx: "auto",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="src/assets/favicon-1.webp"
            alt="Logo"
            style={{ width: 32, height: 32, marginRight: 8 }}
          />
          <Typography variant="h6" fontWeight="bold">
            Reading Journal
          </Typography>
        </Box>

        <Stack direction="row" spacing={4}>
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
                  color: "secondary.main", // ou qualquer cor do seu theme
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
