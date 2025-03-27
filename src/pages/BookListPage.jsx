import { useState } from "react";
import BookList from "../components/BookList/BookList";
import { Link } from "react-router-dom";

function BookListPage() {
  const [books, setBooks] = useState([
    {
      title: "Pai Rico, Pai Pobre",
      author: "Robert Kiyosaki",
      genre: "Finanças pessoais",
      date: "2024-03-10",
    },
    {
      title: "O Programador Pragmático",
      author: "Andrew Hunt e David Thomas",
      genre: "Tecnologia, Desenvolvimento",
      date: "2024-03-12",
    },
    {
      title: "Como Fazer Amigos e Influenciar Pessoas",
      author: "Dale Carnegie",
      genre: "Relacionamentos, Comunicação",
      date: "2024-03-14",
    },
    {
      title: "Extraordinário",
      author: "R. J. Palacio",
      genre: "Ficção, Drama",
      date: "2024-03-16",
    },
    {
      title: "O Cortiço",
      author: "Aluísio Azevedo",
      genre: "Romance Naturalista",
      date: "2024-03-18",
    },
  ]);

  const handleDeleteBook = (indexToDelete) => {
    const updatedBooks = books.filter((_, index) => index !== indexToDelete);
    setBooks(updatedBooks);
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
