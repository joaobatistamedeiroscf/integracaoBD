import style from "./Biblioteca.module.css";
import { useState, useEffect } from "react";
import LinkReturn from "../../components/LinkReturn/LinkReturn.tsx";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter.tsx";

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  isbn: string;
  pages: number;
  description: string;
  price: number;
  quantity: number;
  cover_url: string;
}

function Biblioteca() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [rawData, setRawData] = useState<any>(null);

  // Fetch dos livros
  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/books");
      if (!response.ok) {
        throw new Error("Erro ao carregar livros");
      }
      const data = await response.json();
      setRawData({ books: data });

      // Flatten dos livros de todas as categorias
      let allBooks: Book[] = [];
      Object.values(data).forEach((categoryBooks: any) => {
        allBooks = [...allBooks, ...categoryBooks];
      });

      setBooks(allBooks);
      setFilteredBooks(allBooks);
      setError("");
    } catch (err) {
      setError("Falha ao carregar biblioteca. Tente novamente mais tarde.");
      console.error("Erro ao buscar livros:", err);
    } finally {
      setLoading(false);
    }
  }

  // Filtra livros por busca e categoria
  useEffect(() => {
    let results = books;

    // Filtro de categoria
    if (selectedCategory !== "Todas" && rawData) {
      results = results.filter((book) => {
        const bookCategory = Object.keys(rawData.books).find((cat) =>
          rawData.books[cat].some((b: Book) => b.id === book.id)
        );
        return bookCategory === selectedCategory;
      });
    }

    // Filtro de busca
    if (searchTerm.trim()) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(results);
  }, [searchTerm, selectedCategory, books, rawData]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className={style.wrapper}>
      <LinkReturn />
      <div className={style.container}>
        <h1 className={style.title}>Bem-vindo à Biblioteca do Programador !</h1>

        {/* Barra de busca e filtros */}
        <div className={style.controlsContainer}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Mensagem de erro */}
        {error && <p className={style.errorMessage}>{error}</p>}

        {/* Loading */}
        {loading && (
          <p className={style.loadingMessage}>Carregando livros...</p>
        )}

        {/* Grid de livros */}
        {!loading && filteredBooks.length > 0 && (
          <div className={style.booksGrid}>
            {filteredBooks.map((book) => (
              <div key={book.id} className={style.bookCard}>
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className={style.bookCover}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/150x200?text=Sem+Capa";
                  }}
                />
                <div className={style.bookInfo}>
                  <h3 className={style.bookTitle}>{book.title}</h3>
                  <p className={style.bookAuthor}>Autor: {book.author}</p>
                  <p className={style.bookYear}>Ano: {book.year}</p>
                  <p className={style.bookPrice}>R$ {book.price.toFixed(2)}</p>
                  <p className={style.bookPages}>{book.pages} páginas</p>
                  <p className={style.bookDescription}>{book.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mensagem quando não há resultados */}
        {!loading && filteredBooks.length === 0 && (
          <p className={style.noResultsMessage}>Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Biblioteca;
