import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, beforeEach, vi } from "vitest";
import BookList from "./BookList";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("BookList", () => {
  let books;
  let mockOnDelete;
  let mockItemRefs;

  beforeEach(() => {
    books = [
      {
        id: 1,
        title: "O Alquimista",
        author: "Paulo Coelho",
        genre: "Ficção",
        readAt: "2023-04-10",
      },
      {
        id: 2,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        genre: "Romance",
        readAt: "2023-04-11",
      },
    ];
    mockOnDelete = vi.fn();
    mockNavigate.mockReset();
    mockItemRefs = { current: {} }; // simula um useRef real
  });

  it("deve renderizar a lista de livros corretamente", () => {
    render(
      <BookList books={books} onDelete={mockOnDelete} itemRefs={mockItemRefs} />
    );

    books.forEach((book) => {
      expect(screen.getByText(new RegExp(book.title, "i"))).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(book.author, "i"))
      ).toBeInTheDocument();
      expect(screen.getByText(new RegExp(book.genre, "i"))).toBeInTheDocument();
    });
  });

  it("deve chamar onDelete com o id correto ao clicar no botão Excluir", () => {
    render(
      <BookList books={books} onDelete={mockOnDelete} itemRefs={mockItemRefs} />
    );

    const excluirButtons = screen.getAllByRole("button", { name: /excluir/i });
    fireEvent.click(excluirButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("deve navegar para a página de edição com os dados corretos ao clicar em Editar", () => {
    render(
      <BookList books={books} onDelete={mockOnDelete} itemRefs={mockItemRefs} />
    );

    const editarButtons = screen.getAllByRole("button", { name: /editar/i });
    fireEvent.click(editarButtons[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/cadastrar", {
      state: { book: books[0], index: 0 },
    });
  });
});
