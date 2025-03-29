import { createTheme } from "@mui/material/styles";

const getTheme = (mode = "dark") =>
    createTheme({
        palette: {
            mode,
            primary: { main: "#1976d2" },
            secondary: { main: "#90caf9" },
            background: {
                default: mode === "dark" ? "#121212" : "#f5f5f5",
                paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
            },
            text: {
                primary: mode === "dark" ? "#ffffff" : "#000000",
                secondary: mode === "dark" ? "#bdbdbd" : "#333333",
            },
        },
        typography: {
            fontFamily: "Roboto, sans-serif",
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
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

export default getTheme;
