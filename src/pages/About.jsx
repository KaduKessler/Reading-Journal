import { Box, Typography, Paper } from "@mui/material";
import usePageTitle from "../hooks/pageTitle";

function About() {
  usePageTitle("Sobre");

  return (
    <Box maxWidth="md" mx="auto" px={2} py={6}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Sobre o Projeto
        </Typography>
        <Typography variant="body1">
          Este projeto foi desenvolvido como parte da disciplina de{" "}
          <strong>Desenvolvimento de Sistemas Frontend</strong> no curso de
          Análise e Desenvolvimento de Sistemas da <strong>PUCRS</strong>.
          <br />O objetivo é criar um CRUD para gerenciar um diário de leitura
          (Reading Journal), utilizando React, Axios, React Router e Material
          UI.
        </Typography>
      </Paper>
    </Box>
  );
}

export default About;
