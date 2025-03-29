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
import { Link as RouterLink, useLocation } from "react-router-dom";
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
  const location = useLocation();

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
              slotProps={{
                paper: {
                  sx: {
                    width: 250,
                    backgroundColor: "background.paper",
                    color: "text.primary",
                    px: 2,
                    py: 3,
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
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
                {pages.map((link) => {
                  const isActive = location.pathname === link.to;

                  return (
                    <ListItem
                      key={link.to}
                      component={RouterLink}
                      to={link.to}
                      onClick={() => setDrawerOpen(false)}
                      disablePadding
                      sx={{
                        my: 0.5,
                        borderRadius: 2,
                        ...(isActive && {
                          backgroundColor: "action.selected",
                          pointerEvents: "none",
                        }),
                        "&:hover": {
                          backgroundColor: !isActive && "action.hover",
                        },
                      }}
                    >
                      <ListItemText
                        primary={link.label}
                        slotProps={{
                          primary: {
                            sx: {
                              fontWeight: isActive ? 600 : 500,
                              color: "text.primary",
                              px: 2,
                              py: 1.5,
                            },
                          },
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={4}>
            {pages.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <Typography
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  sx={{
                    color: isActive ? "secondary.main" : "inherit",
                    textDecoration: isActive ? "underline" : "none",
                    fontWeight: isActive ? 600 : 500,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      color: "secondary.main",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              );
            })}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
