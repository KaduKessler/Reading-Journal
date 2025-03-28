import { useEffect, useState } from "react";
import BookList from "../components/BookList/BookList";
import { Link } from "react-router-dom";
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
    <div className="book-list-container">
      <h1>Lista de Livros</h1>

      <input
        type="text"
        placeholder="Buscar livros..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <BookList books={filteredBooks} onDelete={handleDeleteBook} />
      <Link to="/cadastrar">
        <button className="back-button">Cadastrar novo livro</button>
      </Link>
    </div>
  );
}

export default BookListPage;
