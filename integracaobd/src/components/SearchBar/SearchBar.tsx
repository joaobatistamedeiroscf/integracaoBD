import { FaSearch } from "react-icons/fa";
import style from "./SearchBar.module.css";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className={style.searchContainer}>
      <div className={style.searchBox}>
        <FaSearch className={style.searchIcon} />
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={style.searchInput}
        />
      </div>
    </div>
  );
}

export default SearchBar;
