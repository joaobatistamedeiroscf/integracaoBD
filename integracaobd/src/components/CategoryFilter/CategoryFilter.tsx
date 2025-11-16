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
  const categoryMapping = {
    JavaScript: "javascript",
    Python: "python",
    Java: "java",
    Algoritmos: "algoritmos",
    Redes: "redes",
    "Sistemas Operacionais": "sistemas_operacionais",
    "Engenharia de Software": "engenharia_de_software",
    "Bancos de Dados": "bancos_de_dados",
    "Inteligência Artificial": "inteligencia_artificial",
    "Web Design": "web_design",
    Segurança: "seguranca",
  };

  const displayCategories = Object.keys(categoryMapping);
  const [categories, setCategories] = useState<string[]>(displayCategories);

  useEffect(() => {
    setCategories(displayCategories);
  }, []);

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
          <option
            key={category}
            value={categoryMapping[category as keyof typeof categoryMapping]}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
