import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  LinearProgress,
  Slide,
} from "@mui/material";
import BookList from "../components/BookList/BookList";
import api from "../services/api";
import usePageTitle from "../hooks/pageTitle";

function BookListPage() {
  usePageTitle("Lista de Livros");

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletedTitle, setDeletedTitle] = useState("");
  const [progress, setProgress] = useState(100);
  const duration = 3000;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async (id) => {
    try {
      const bookToDelete = books.find((book) => book.id === id);
      await api.delete(`/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));

      setDeletedTitle(bookToDelete?.title || "Livro");
      setSnackbarOpen(true);
      startProgress();
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
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

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box maxWidth="md" mx="auto" px={2} py={4} sx={{ paddingBottom: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Livros
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar livros..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      <BookList books={filteredBooks} onDelete={handleDeleteBook} />

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/cadastrar"
        >
          Cadastrar novo livro
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={duration}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        slots={{ transition: Slide }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="info"
          variant="filled"
          sx={{
            width: "100%",
            px: 2,
            py: 1,
            fontSize: "0.95rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          📚 "{deletedTitle}" foi removido da lista.
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
    </Box>
  );
}

export default BookListPage;
