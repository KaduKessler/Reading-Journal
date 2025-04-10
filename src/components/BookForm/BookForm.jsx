import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
  Alert,
} from "@mui/material";

function BookForm({ onAddBook, bookToEdit, bookIndex, setSuccessMessage }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [readAt, setReadAt] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setGenre(bookToEdit.genre);
      setReadAt(bookToEdit.readAt || "");
    }
  }, [bookToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !genre || !readAt) {
      setError(true);
      return;
    }

    const newBook = {
      ...(bookToEdit?.id && { id: bookToEdit.id }),
      title,
      author,
      genre,
      readAt,
    };

    onAddBook(newBook, bookIndex);

    if (!bookToEdit) {
      setTitle("");
      setAuthor("");
      setGenre("");
      setReadAt("");
    }

    setError(false);
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {bookToEdit ? "Editar Livro" : "Cadastrar Livro"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Autor(a)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Gênero"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Data de Leitura"
              type="date"
              value={readAt}
              onChange={(e) => setReadAt(e.target.value)}
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <Button type="submit" variant="contained" size="large">
              {bookToEdit ? "Atualizar" : "Adicionar"}
            </Button>
          </Stack>
        </Box>

        {error && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Por favor, preencha todos os campos.
          </Alert>
        )}
      </Paper>
    </Box>
  );
}

export default BookForm;
