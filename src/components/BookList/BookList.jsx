import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Box,
} from "@mui/material";

function BookList({ books, onDelete, itemRefs }) {
  const navigate = useNavigate();

  const handleEdit = (book, index) => {
    navigate("/cadastrar", {
      state: { book, index },
    });
  };

  return (
    <Stack spacing={2} width="100%" maxWidth="md">
      {books.map((book, index) => (
        <Card
          key={book.id}
          ref={(el) => (itemRefs.current[book.id] = el)}
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="body1">
              <strong>{book.title}</strong> – {book.author} ({book.genre}) –{" "}
              {formatDate(book.readAt)}
            </Typography>
          </CardContent>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => handleEdit(book, index)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => onDelete(book.id)}
            >
              Excluir
            </Button>
          </Box>
        </Card>
      ))}
    </Stack>
  );
}

export default BookList;
