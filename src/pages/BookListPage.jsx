import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BookList from "../components/BookList/BookList";
import api from "../services/api";
import usePageTitle from "../hooks/pageTitle";

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
    <Container maxWidth="md">
      <Stack spacing={4} alignItems="center" sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight="bold">
          Lista de Livros
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Buscar livros..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <BookList books={filteredBooks} onDelete={handleDeleteBook} />

        <Box width="100%" display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/cadastrar"
          >
            Cadastrar novo livro
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

export default BookListPage;
