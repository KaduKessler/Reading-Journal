import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import NavBar from "./NavBar";

describe("NavBar Component", () => {
  it("deve renderizar os links de navegação", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Sobre")).toBeInTheDocument();
    expect(screen.getByText("Lista de livros")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  it("deve navegar para a rota correta ao clicar nos links", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <NavBar />
        <Routes>
          <Route path="/" element={<div>Página Inicial</div>} />
          <Route path="/sobre" element={<div>Página Sobre</div>} />
          <Route path="/cadastrar" element={<div>Página Cadastrar</div>} />
          <Route path="/livros" element={<div>Página Lista de livros</div>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByText("Sobre"));
    expect(screen.getByText("Página Sobre")).toBeInTheDocument();

    await user.click(screen.getByText("Cadastrar"));
    expect(screen.getByText("Página Cadastrar")).toBeInTheDocument();

    await user.click(screen.getByText("Lista de livros"));
    expect(screen.getByText("Página Lista de livros")).toBeInTheDocument();
  });
});
