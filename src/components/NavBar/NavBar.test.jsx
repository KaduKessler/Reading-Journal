import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";
import { MemoryRouter } from "react-router-dom";
import { ThemeModeProvider } from "../../ThemeProvider";

// Utilitário para renderizar com Router + Tema
const renderWithProviders = () =>
  render(
    <ThemeModeProvider>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </ThemeModeProvider>
  );

describe("NavBar", () => {
  it("renderiza título e links principais no modo desktop", () => {
    renderWithProviders();

    expect(screen.getByText(/Reading Journal/i)).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Sobre")).toBeInTheDocument();
    expect(screen.getByText("Lista de livros")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  it("permite alternar entre tema claro/escuro", () => {
    renderWithProviders();

    const toggleBtn = screen.getByRole("button", { name: /alternar tema/i });
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn); // Simula troca de tema
  });
});
