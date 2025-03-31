import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, beforeEach, vi } from "vitest";
import BookForm from "./BookForm";

describe("BookForm", () => {
  let mockOnAddBook;
  let mockSetSuccessMessage;

  beforeEach(() => {
    mockOnAddBook = vi.fn();
    mockSetSuccessMessage = vi.fn();
  });

  it("deve renderizar o formulário corretamente", () => {
    render(
      <BookForm
        onAddBook={mockOnAddBook}
        setSuccessMessage={mockSetSuccessMessage}
      />
    );

    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/autor\(a\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gênero/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de leitura/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /adicionar/i })
    ).toBeInTheDocument();
  });

  it("deve submeter o formulário com sucesso e limpar os campos quando não estiver editando", () => {
    render(
      <BookForm
        onAddBook={mockOnAddBook}
        setSuccessMessage={mockSetSuccessMessage}
      />
    );

    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "Livro Teste" },
    });
    fireEvent.change(screen.getByLabelText(/autor\(a\)/i), {
      target: { value: "Autor Teste" },
    });
    fireEvent.change(screen.getByLabelText(/gênero/i), {
      target: { value: "Ficção" },
    });
    fireEvent.change(screen.getByLabelText(/data de leitura/i), {
      target: { value: "2025-03-30" },
    });

    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(mockOnAddBook).toHaveBeenCalledWith(
      {
        title: "Livro Teste",
        author: "Autor Teste",
        genre: "Ficção",
        readAt: "2025-03-30",
      },
      undefined
    );
    expect(mockSetSuccessMessage).toHaveBeenCalledWith(
      "Livro cadastrado com sucesso!"
    );

    // Verifica se os campos foram limpos após o cadastro
    expect(screen.getByLabelText(/título/i)).toHaveValue("");
    expect(screen.getByLabelText(/autor\(a\)/i)).toHaveValue("");
    expect(screen.getByLabelText(/gênero/i)).toHaveValue("");
    expect(screen.getByLabelText(/data de leitura/i)).toHaveValue("");
  });

  it("deve submeter o formulário com sucesso ao editar um livro", () => {
    const bookToEdit = {
      id: 123,
      title: "Livro Editado",
      author: "Autor Editado",
      genre: "Drama",
      readAt: "2025-03-30",
    };

    render(
      <BookForm
        onAddBook={mockOnAddBook}
        setSuccessMessage={mockSetSuccessMessage}
        bookToEdit={bookToEdit}
        bookIndex={1}
      />
    );

    // Verifica se os campos já estão preenchidos com os dados do livro a ser editado
    expect(screen.getByLabelText(/título/i)).toHaveValue("Livro Editado");
    expect(screen.getByLabelText(/autor\(a\)/i)).toHaveValue("Autor Editado");
    expect(screen.getByLabelText(/gênero/i)).toHaveValue("Drama");
    expect(screen.getByLabelText(/data de leitura/i)).toHaveValue("2025-03-30");
    expect(
      screen.getByRole("button", { name: /atualizar/i })
    ).toBeInTheDocument();

    // Altera o título e submete o formulário
    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "Livro Editado 2" },
    });
    fireEvent.click(screen.getByRole("button", { name: /atualizar/i }));

    expect(mockOnAddBook).toHaveBeenCalledWith(
      {
        title: "Livro Editado 2",
        author: "Autor Editado",
        genre: "Drama",
        readAt: "2025-03-30",
        id: 123,
      },
      1
    );
    expect(mockSetSuccessMessage).toHaveBeenCalledWith(
      "Livro atualizado com sucesso!"
    );
  });
});
