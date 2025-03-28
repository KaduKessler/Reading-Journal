import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookList from "./BookList";

describe("BookList Component", () => {
  const mockBooks = [
    {
      id: 1,
      title: "O Alquimista",
      author: "Paulo Coelho",
      genre: "Ficção",
      readAt: "2024-01-15",
    },
  ];

  it("renderiza um livro corretamente", () => {
    render(
      <MemoryRouter>
        <BookList books={mockBooks} onDelete={() => {}} />
      </MemoryRouter>
    );

    const bookTitle = screen.getByText(/O Alquimista/i);
    const bookAuthor = screen.getByText(/Paulo Coelho/i);
    const bookGenre = screen.getByText(/Ficção/i);
    const bookDate = screen.getByText(/2024/i);

    expect(bookTitle).toBeInTheDocument();
    expect(bookAuthor).toBeInTheDocument();
    expect(bookGenre).toBeInTheDocument();
    expect(bookDate).toBeInTheDocument();
  });

  it("aciona o botão de exclusão", () => {
    const mockDelete = vi.fn();

    render(
      <MemoryRouter>
        <BookList books={mockBooks} onDelete={mockDelete} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByText(/Excluir/i);
    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith(1); // ID do livro
  });
});
