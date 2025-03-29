import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";

function BookList({ books, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = (book, index) => {
    navigate("/cadastrar", {
      state: { book, index },
    });
  };

  return (
    <Stack spacing={2} alignItems="center">
      {books.map((book, index) => (
        <Paper
          key={book.id}
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: 600,
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ flex: 1, mr: 2 }}>
            <Typography variant="body1">
              <strong>{book.title}</strong> – {book.author} ({book.genre}) –{" "}
              {formatDate(book.readAt)}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEdit(book, index)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => onDelete(book.id)}
            >
              Excluir
            </Button>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}

export default BookList;
