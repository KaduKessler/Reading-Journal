import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm/BookForm";
import api from "../services/api";
import usePageTitle from "../hooks/pageTitle";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Snackbar, Alert, LinearProgress, Slide } from "@mui/material";

function AddBook() {
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [progress, setProgress] = useState(100);

  const location = useLocation();
  const bookToEdit = location.state?.book || null;
  const bookIndex = location.state?.index ?? null;
  const duration = 3000;

  usePageTitle(bookToEdit ? "Editar Livro" : "Cadastrar Livro");

  const navigate = useNavigate();

  const handleAddBook = async (newBook) => {
    try {
      if (bookToEdit) {
        await api.put("/books", newBook);
        setSuccessMessage("Livro atualizado com sucesso!");
        navigate("/livros", { state: { scrollToId: newBook.id } });
      } else {
        await api.post("/books", newBook);
        setSuccessMessage("Livro cadastrado com sucesso!");
        setSnackbarOpen(true);
        startProgress();
      }
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
    }
  };

  const startProgress = () => {
    let startTime = Date.now();
    const interval = 100;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(newProgress);
      if (newProgress === 0) clearInterval(timer);
    }, interval);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setProgress(100);
  };

  return (
    <>
      <BookForm
        onAddBook={handleAddBook}
        bookToEdit={bookToEdit}
        bookIndex={bookIndex}
        setSuccessMessage={setSuccessMessage}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={duration}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" />,
          }}
          sx={{
            width: "100%",
            px: 2,
            py: 1,
            fontSize: "0.95rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {successMessage}
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 4,
              borderBottomLeftRadius: 6,
              borderBottomRightRadius: 6,
              backgroundColor: "rgba(255,255,255,0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#ffffff",
              },
            }}
          />
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddBook;
