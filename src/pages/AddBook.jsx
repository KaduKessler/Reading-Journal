import { useLocation, useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm/BookForm";
import api from "../services/api";
import usePageTitle from "../hooks/pageTitle";

function AddBook() {
  const location = useLocation();
  const bookToEdit = location.state?.book || null;
  const bookIndex = location.state?.index ?? null;

  usePageTitle(bookToEdit ? "Editar Livro" : "Cadastrar Livro");

  const navigate = useNavigate();

  const handleAddBook = async (newBook) => {
    try {
      if (bookToEdit) {
        const response = await api.put("/books", newBook);
        navigate("/livros", {
          state: {
            scrollToId: response.data.id || newBook.id,
            successMessage: "Livro atualizado com sucesso!",
          },
        });
      } else {
        await api.post("/books", newBook);

        const { data } = await api.get("/books");

        const createdBook = [...data]
          .reverse()
          .find((book) => book.title === newBook.title);

        navigate("/livros", {
          state: {
            scrollToId: createdBook?.id,
            successMessage: "Livro cadastrado com sucesso!",
          },
        });
      }
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
    }
  };

  return (
    <>
      <BookForm
        onAddBook={handleAddBook}
        bookToEdit={bookToEdit}
        bookIndex={bookIndex}
      />
    </>
  );
}

export default AddBook;
