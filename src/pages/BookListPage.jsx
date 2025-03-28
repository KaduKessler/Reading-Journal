import { useEffect, useState } from "react";
import BookList from "../components/BookList/BookList";
import { Link } from "react-router-dom";
import api from "../services/api";
import usePageTitle from "../hooks/pageTitle";

function BookListPage() {
  usePageTitle("Lista de Livros");

  const [books, setBooks] = useState([]);

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

  return (
    <div className="book-list-container">
      <h1>Lista de Livros</h1>
      <BookList books={books} onDelete={handleDeleteBook} />
      <Link to="/cadastrar">
        <button className="back-button">Cadastrar novo livro</button>
      </Link>
    </div>
  );
}

export default BookListPage;
