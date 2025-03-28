import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre</Link>
        </li>
        <li>
          <Link to="/livros">Lista de livros</Link>
        </li>
        <li>
          <Link to="/cadastrar">Cadastrar</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
