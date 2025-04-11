import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
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

  const [actionMessage, setActionMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletedTitle, setDeletedTitle] = useState("");
  const [progress, setProgress] = useState(100);
  const duration = 3000;

  const location = useLocation();
  const scrollToId = location.state?.scrollToId ?? null;
  const scrollToTitle = location.state?.scrollToTitle ?? null;
  const itemRefs = useRef({});
  const incomingSuccessMessage = location.state?.successMessage;

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

  useEffect(() => {
    if (books.length > 0) {
      if (scrollToId) {
        setTimeout(() => {
          itemRefs.current[scrollToId]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 200);
      } else if (scrollToTitle) {
        const book = books.find((b) => b.title === scrollToTitle);
        if (book?.id) {
          setTimeout(() => {
            itemRefs.current[book.id]?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 200);
        }
      }
    }
  }, [scrollToId, scrollToTitle, books]);

  useEffect(() => {
    if (incomingSuccessMessage) {
      setActionMessage(incomingSuccessMessage);
      setSnackbarOpen(true);
      startProgress();

      window.history.replaceState({}, document.title);
    }
  }, [incomingSuccessMessage]);

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

      <BookList
        books={filteredBooks}
        onDelete={handleDeleteBook}
        itemRefs={itemRefs}
      />

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
          severity="success"
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
          {deletedTitle
            ? `📚 "${deletedTitle}" foi removido da lista.`
            : actionMessage}
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
