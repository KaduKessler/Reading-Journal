import { Box, Typography, Paper } from "@mui/material";
import usePageTitle from "../hooks/pageTitle";

function Home() {
  usePageTitle("Home");

  return (
    <Box maxWidth="md" mx="auto" px={2} py={6}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Página Inicial
        </Typography>
        <Typography variant="body1">
          Bem-vindo ao <strong>Reading Journal</strong>!
          <br />
          Aqui você pode cadastrar, listar, editar e excluir livros que você já
          leu.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Home;
