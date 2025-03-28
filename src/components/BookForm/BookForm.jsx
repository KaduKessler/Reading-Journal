import { useEffect, useRef, useState } from "react";
import "./BookForm.css";

function BookForm({ onAddBook, bookToEdit, bookIndex, setSuccessMessage }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [readAt, setReadAt] = useState("");
  const [error, setError] = useState(false);

  const titleRef = useRef();
  const authorRef = useRef();
  const genreRef = useRef();
  const dateRef = useRef();

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

    if (!title) {
      setError(true);
      titleRef.current.focus();
      return;
    }
    if (!author) {
      setError(true);
      authorRef.current.focus();
      return;
    }
    if (!genre) {
      setError(true);
      genreRef.current.focus();
      return;
    }
    if (!readAt) {
      setError(true);
      dateRef.current.focus();
      return;
    }

    const newBook = { title, author, genre, readAt };
    onAddBook(newBook, bookIndex);

    if (bookIndex !== null && bookIndex !== undefined) {
      setSuccessMessage("Livro atualizado com sucesso!");
    } else {
      setSuccessMessage("Livro cadastrado com sucesso!");
      setTitle("");
      setAuthor("");
      setGenre("");
      setReadAt("");
    }

    setError(false);
  };

  return (
    <div className="book-form-container">
      <h1>{bookToEdit ? "Editar Livro" : "Cadastrar Livro"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleRef}
        />
        <input
          type="text"
          placeholder="Autor(a)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          ref={authorRef}
        />
        <input
          type="text"
          placeholder="Gênero"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          ref={genreRef}
        />
        <input
          type="date"
          value={readAt}
          onChange={(e) => setReadAt(e.target.value)}
          ref={dateRef}
        />
        <button type="submit">{bookToEdit ? "Atualizar" : "Adicionar"}</button>
      </form>

      {error && <p className="error-message">Preencha todos os campos!</p>}
    </div>
  );
}

export default BookForm;
