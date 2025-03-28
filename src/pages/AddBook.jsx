import { useState } from "react";
import { useLocation } from "react-router-dom";
import BookForm from "../components/BookForm/BookForm";
import api from "../services/api";

function AddBook() {
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();
  const editBook = location.state?.book || null;
  const editIndex = location.state?.index ?? null;
  const [lastBook, setLastBook] = useState(null);

  const handleAddBook = async (newBook) => {
    try {
      if (editBook) {
        await api.put("/books", newBook);
        setSuccessMessage("Livro atualizado com sucesso!");
        setLastBook(newBook);
      } else {
        const response = await api.post("/books", newBook);
        setLastBook(response.data);
        setSuccessMessage("Livro cadastrado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
    }
  };

  return (
    <div>
      <BookForm
        onAddBook={handleAddBook}
        bookToEdit={editBook}
        bookIndex={editIndex}
        setSuccessMessage={setSuccessMessage}
      />

      {lastBook && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <h2>Último livro cadastrado:</h2>
          <p>
            <strong>{lastBook.title}</strong> – {lastBook.author} (
            {lastBook.genre}) – {lastBook.readAt}
          </p>
        </div>
      )}
    </div>
  );
}

export default AddBook;
