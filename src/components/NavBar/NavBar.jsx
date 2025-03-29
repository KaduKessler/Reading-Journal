import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

const pages = [
  { label: "Home", to: "/" },
  { label: "Sobre", to: "/sobre" },
  { label: "Lista de livros", to: "/livros" },
  { label: "Cadastrar", to: "/cadastrar" },
];

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "md",
          mx: "auto",
          width: "100%",
          py: 2,
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

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                sx: {
                  backgroundColor: "background.paper",
                  color: "text.primary",
                  width: 260,
                  px: 2,
                  py: 1.5,
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="h6" fontWeight="bold">
                  Menu
                </Typography>
                <IconButton
                  onClick={() => setDrawerOpen(false)}
                  sx={{ color: "text.primary" }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              <List>
                {pages.map((link) => (
                  <ListItem
                    key={link.to}
                    component={RouterLink}
                    to={link.to}
                    onClick={() => setDrawerOpen(false)}
                    disablePadding
                  >
                    <ListItemText
                      primary={link.label}
                      slotProps={{
                        primary: {
                          sx: {
                            fontWeight: 500,
                            color: "text.primary",
                            px: 2,
                            py: 1.5,
                            borderRadius: 2,
                            transition: "0.2s",
                            "&:hover": {
                              backgroundColor: "action.hover",
                              color: "secondary.main",
                            },
                          },
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={4}>
            {pages.map((link) => (
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
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
