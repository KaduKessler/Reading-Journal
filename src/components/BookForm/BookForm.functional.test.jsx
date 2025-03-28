import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookForm from "./BookForm";
import { useState } from "react";

function BookFormWithList() {
  const [books, setBooks] = useState([]);

  const handleAddBook = (book) => {
    setBooks((prev) => [...prev, book]);
  };

  return (
    <>
      <BookForm onAddBook={handleAddBook} setSuccessMessage={() => {}} />
      <ul data-testid="book-list">
        {books.map((book, index) => (
          <li key={index}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>
    </>
  );
}

describe("Fluxo funcional do BookForm", () => {
  it("permite adicionar um livro e exibi-lo na lista", () => {
    render(<BookFormWithList />);

    fireEvent.change(screen.getByPlaceholderText("Título"), {
      target: { value: "Clean Code" },
    });
    fireEvent.change(screen.getByPlaceholderText("Autor(a)"), {
      target: { value: "Robert C. Martin" },
    });
    fireEvent.change(screen.getByPlaceholderText("Gênero"), {
      target: { value: "Tecnologia" },
    });
    fireEvent.change(screen.getByDisplayValue(""), {
      target: { value: "2023-04-10" },
    });

    fireEvent.click(screen.getByText("Adicionar"));

    expect(screen.getByTestId("book-list")).toHaveTextContent("Clean Code");
    expect(screen.getByTestId("book-list")).toHaveTextContent(
      "Robert C. Martin"
    );
  });
});
