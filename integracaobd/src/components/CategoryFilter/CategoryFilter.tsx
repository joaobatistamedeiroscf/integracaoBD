import { useEffect, useState } from "react";
import style from "./CategoryFilter.module.css";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch("http://localhost:3001/books");
      if (!response.ok) {
        throw new Error("Erro ao carregar categorias");
      }
      const data = await response.json();
      const cats = Object.keys(data.books);
      setCategories(cats);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  }

  return (
    <div className={style.filterContainer}>
      <label htmlFor="categorySelect" className={style.filterLabel}>
        Categoria:
      </label>
      <select
        id="categorySelect"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={style.filterSelect}
      >
        <option value="Todas">Todas</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
