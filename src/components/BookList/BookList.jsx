import "./BookList.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

function BookList({ books, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = (book, index) => {
    navigate("/cadastrar", {
      state: { book, index },
    });
  };

  return (
    <div className="book-list">
      {books.map((book, index) => (
        <div className="book-item">
          <span>
            <strong>{book.title}</strong> – {book.author} ({book.genre}) –{" "}
            {formatDate(book.readAt)}
          </span>
          <div className="actions">
            <button onClick={() => handleEdit(book, index)}>Editar</button>
            <button onClick={() => onDelete(book.id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
