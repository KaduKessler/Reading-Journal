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
    // Reseta o mock do navigate antes de cada teste
    mockNavigate.mockReset();
  });

  it("deve renderizar a lista de livros corretamente", () => {
    render(<BookList books={books} onDelete={mockOnDelete} />);

    // Verifica se os títulos, autores e gêneros dos livros estão na tela
    books.forEach((book) => {
      expect(screen.getByText(new RegExp(book.title, "i"))).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(book.author, "i"))
      ).toBeInTheDocument();
      expect(screen.getByText(new RegExp(book.genre, "i"))).toBeInTheDocument();
    });
  });

  it("deve chamar onDelete com o id correto ao clicar no botão Excluir", () => {
    render(<BookList books={books} onDelete={mockOnDelete} />);

    const excluirButtons = screen.getAllByRole("button", { name: /excluir/i });
    // Clica no botão de excluir do primeiro livro
    fireEvent.click(excluirButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("deve navegar para a página de edição com os dados corretos ao clicar em Editar", () => {
    render(<BookList books={books} onDelete={mockOnDelete} />);

    const editarButtons = screen.getAllByRole("button", { name: /editar/i });
    // Clica no botão de editar do primeiro livro
    fireEvent.click(editarButtons[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/cadastrar", {
      state: { book: books[0], index: 0 },
    });
  });
});
