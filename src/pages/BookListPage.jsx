import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookList from "../components/BookList/BookList";
import api from "../services/api";
import usePageTitle from "../hooks/pageTitle";

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
} from "@mui/material";

function BookListPage() {
  usePageTitle("Lista de Livros");

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

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
      await api.delete(`/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4" component="h1" fontWeight="bold">
          Lista de Livros
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar livros..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <BookList books={filteredBooks} onDelete={handleDeleteBook} />

        <Box>
          <Button
            component={Link}
            to="/cadastrar"
            variant="contained"
            color="secondary"
          >
            Cadastrar novo livro
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

export default BookListPage;
