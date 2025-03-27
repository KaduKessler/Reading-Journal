import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import BookListPage from "./pages/BookListPage";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/livros" element={<BookListPage />} />
        <Route path="/cadastrar" element={<AddBook />} />
      </Routes>
    </div>
  );
}

export default App;
