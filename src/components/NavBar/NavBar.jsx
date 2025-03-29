import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ background: "transparent", backdropFilter: "blur(6px)" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, fontWeight: 600 }}
          >
            📚 Reading Journal
          </Typography>

          {/* LINKS CENTRAIS */}
          <Box sx={{ display: "flex", gap: 3, mx: "auto" }}>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/sobre" color="inherit">
              Sobre
            </Button>
            <Button component={Link} to="/livros" color="inherit">
              Lista de livros
            </Button>
            <Button component={Link} to="/cadastrar" color="inherit">
              Cadastrar
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
