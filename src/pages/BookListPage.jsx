import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
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
    </Box>
  );
}

export default BookListPage;
