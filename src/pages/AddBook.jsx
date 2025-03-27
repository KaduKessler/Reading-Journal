import { useState } from "react";
import { useLocation } from "react-router-dom";
import BookForm from "../components/BookForm/BookForm";
import { formatDate } from "../utils/formatDate";

function AddBook() {
  const [books, setBooks] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
  const editBook = location.state?.book || null;
  const editIndex = location.state?.index ?? null;

  const handleAddBook = (newBook, index) => {
    if (index !== null && index !== undefined) {
      const updatedBooks = [...books];
      updatedBooks[index] = newBook;
      setBooks(updatedBooks);
      setSuccessMessage("Livro atualizado com sucesso!");
    } else {
      setBooks([...books, newBook]);
      setSuccessMessage("Livro cadastrado com sucesso!");
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

      {successMessage && books.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p
            className="success-message"
            style={{
              color: successMessage.includes("atualizado")
                ? "#4ea1ff"
                : "green",
              fontWeight: "bold",
            }}
          >
            {successMessage}
          </p>
          <h2>
            Último livro{" "}
            {successMessage.includes("atualizado")
              ? "atualizado"
              : "cadastrado"}
            :
          </h2>
          <p>
            <strong>{books[books.length - 1].title}</strong> –{" "}
            {books[books.length - 1].author} ({books[books.length - 1].genre}) –{" "}
            {formatDate(books[books.length - 1].date)}
          </p>
        </div>
      )}
    </div>
  );
}

export default AddBook;
