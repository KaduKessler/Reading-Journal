import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#e0e0e0" },     // cinza claro para destaques ou textos
        secondary: { main: "#90caf9" },   // azul claro para botões e links
        background: {
            default: "#121212",             // fundo escuro
            paper: "#1e1e1e",               // cartões e caixas
        },
        text: {
            primary: "#ffffff",
            secondary: "#bdbdbd",
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none", // tira o CAPSLOCK automático
                    borderRadius: "8px",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: "16px",
                    borderRadius: "12px",
                },
            },
        },
    },
});

export default theme;
