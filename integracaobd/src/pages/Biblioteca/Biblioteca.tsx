import style from "./Biblioteca.module.css";
import { useState, useEffect } from "react";
import LinkReturn from "../../components/LinkReturn/LinkReturn.tsx";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter.tsx";
import { BiCode, BiCodeAlt } from "react-icons/bi";
import { MdClose, MdDelete, MdCheckCircle } from "react-icons/md";

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

interface CartItem {
  id: number;
  titulo: string;
  autor: string;
}

interface CartBook extends CartItem {
  quantidade: number;
}

function Biblioteca() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [rawData, setRawData] = useState<any>(null);
  const [cart, setCart] = useState<Map<number, CartBook>>(new Map());
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [confirmingLoan, setConfirmingLoan] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    message: string;
    bookTitle: string;
  } | null>(null);

  // Toast auto-close
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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
        return bookCategory?.toLowerCase() === selectedCategory.toLowerCase();
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

  // Adicionar livro ao carrinho
  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      if (newCart.has(book.id)) {
        const cartItem = newCart.get(book.id)!;
        cartItem.quantidade += 1;
        setToast({
          message: `Quantidade aumentada para ${cartItem.quantidade}`,
          bookTitle: book.title,
        });
      } else {
        newCart.set(book.id, {
          id: book.id,
          titulo: book.title,
          autor: book.author,
          quantidade: 1,
        });
        setToast({
          message: "Adicionado ao carrinho com sucesso!",
          bookTitle: book.title,
        });
      }
      return newCart;
    });
  };

  // Remover livro do carrinho
  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      const cartItem = newCart.get(bookId);
      if (cartItem) {
        if (cartItem.quantidade > 1) {
          cartItem.quantidade -= 1;
        } else {
          newCart.delete(bookId);
        }
      }
      return newCart;
    });
  };

  // Remover livro completamente do carrinho
  const removeFromCartCompletely = (bookId: number) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      newCart.delete(bookId);
      return newCart;
    });
  };

  // Calcular quantidade total de livros no carrinho
  const getTotalCartItems = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantidade;
    });
    return total;
  };

  // Confirmar empréstimo
  const confirmLoan = async () => {
    if (cart.size === 0) {
      alert("Carrinho vazio! Adicione livros antes de confirmar.");
      return;
    }

    setConfirmingLoan(true);

    try {
      const loanData = {
        id: Date.now(),
        data: new Date().toISOString().split("T")[0],
        livros: Array.from(cart.values()).map((item) => ({
          id: item.id,
          titulo: item.titulo,
          autor: item.autor,
        })),
      };

      const response = await fetch("http://localhost:3001/emprestimos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loanData),
      });

      if (!response.ok) {
        throw new Error("Erro ao confirmar empréstimo");
      }

      // Limpar carrinho após sucesso
      setCart(new Map());
      setIsCartOpen(false);
      alert("Empréstimo confirmado com sucesso!");
    } catch (err) {
      console.error("Erro ao confirmar empréstimo:", err);
      alert("Erro ao confirmar empréstimo. Tente novamente.");
    } finally {
      setConfirmingLoan(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <LinkReturn />
      <div className={style.container}>
        <div className={style.titleContainer}>
          <BiCode size={40} color="#4A90E2" />
          <h1 className={style.title}>
            Bem-vindo à Biblioteca do Programador !
          </h1>
          <BiCodeAlt size={40} color="#4A90E2" />
        </div>

        {/* Botão Ver Carrinho no topo */}
        <div className={style.cartButtonContainer}>
          <button
            className={style.cartButton}
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            Ver Carrinho ({getTotalCartItems()})
          </button>
        </div>

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
                  <button
                    className={style.addToCartBtn}
                    onClick={() => addToCart(book)}
                  >
                    Adicionar ao Carrinho
                  </button>
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

      {/* Toast Notification */}
      {toast && (
        <div className={style.toast}>
          <div className={style.toastContent}>
            <MdCheckCircle className={style.toastIcon} size={24} />
            <div className={style.toastText}>
              <p className={style.toastMessage}>{toast.message}</p>
              <p className={style.toastTitle}>{toast.bookTitle}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal/Sidebar do Carrinho */}
      {isCartOpen && (
        <>
          <div
            className={style.cartOverlay}
            onClick={() => setIsCartOpen(false)}
          ></div>
          <aside className={style.cartSidebar}>
            <div className={style.cartHeader}>
              <h2 className={style.cartTitle}>Meu Carrinho</h2>
              <button
                className={style.cartCloseBtn}
                onClick={() => setIsCartOpen(false)}
              >
                <MdClose size={24} />
              </button>
            </div>

            {cart.size === 0 ? (
              <p className={style.emptyCartMessage}>Seu carrinho está vazio.</p>
            ) : (
              <>
                <div className={style.cartItemsList}>
                  {Array.from(cart.values()).map((item) => (
                    <div key={item.id} className={style.cartItem}>
                      <div className={style.cartItemInfo}>
                        <h4 className={style.cartItemTitle}>{item.titulo}</h4>
                        <p className={style.cartItemAuthor}>{item.autor}</p>
                        <p className={style.cartItemQuantity}>
                          Quantidade: {item.quantidade}
                        </p>
                      </div>
                      <div className={style.cartItemActions}>
                        <button
                          className={style.decreaseBtn}
                          onClick={() => removeFromCart(item.id)}
                          title="Diminuir quantidade"
                        >
                          −
                        </button>
                        <button
                          className={style.removeBtn}
                          onClick={() => removeFromCartCompletely(item.id)}
                          title="Remover do carrinho"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={style.cartSummary}>
                  <p className={style.cartTotal}>
                    Total de livros: {getTotalCartItems()}
                  </p>
                </div>

                <button
                  className={style.confirmLoanBtn}
                  onClick={confirmLoan}
                  disabled={confirmingLoan}
                >
                  {confirmingLoan ? "Processando..." : "Confirmar Empréstimo"}
                </button>
              </>
            )}
          </aside>
        </>
      )}
    </div>
  );
}

export default Biblioteca;
