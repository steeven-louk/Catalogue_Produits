import { useMemo, useState } from "react";

import HeaderComponent from "./HeaderComponent";
import FiltreComponent from "./FiltreComponent";
import CardComponent from "./CardComponent";
import HeaderFilters from "./HeaderFilter"; // ← Corrigé : HeaderFilter → HeaderFilters
import Pagination from "./PaginationComponent";

import { renderPageNumbers } from "../function/renderPageNumber";

// ✅ Typage du produit
type Label = {
  titre: string;
  icon: string;
};

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  labels: Label[];
  isSeasonal: boolean;
};

// ✅ Liste d'images
const IMAGES: string[] = [
  "/assets/produit-1.png",
  "/assets/produit-2.png",
  "/assets/produit-3.png",
  "/assets/produit-4.png",
  "/assets/produit-5.png",
];

// ✅ Génération de produits aléatoires
const generateProducts = (count: number): Product[] => {
  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    const hasBio = Math.random() < 0.5;
    const hasStg = Math.random() < 0.3;
    const isSeasonal = Math.random() < 0.4;

    const labels: Label[] = [];
    if (hasBio) labels.push({ titre: "BIO", icon: "/assets/bio.png" });
    if (hasStg) labels.push({ titre: "STG", icon: "/assets/stg.png" });

    products.push({
      id: i + 1,
      name: `Produit ${i + 1}`,
      image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
      price: Math.floor(Math.random() * 30) + 3,
      labels,
      isSeasonal,
    });
  }

  return products;
};

// ✅ Composant principal
const HomeComponent = () => {
  const products = useMemo(() => generateProducts(110), []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const renderPages = renderPageNumbers(currentPage, totalPages);

  const goToPage = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <HeaderComponent />
      <HeaderFilters resultsCount={1688} />

      <div className="flex flex-col lg:flex-row">
        <aside className="hidden lg:block lg:w-78">
        <FiltreComponent />

        </aside>

        <main className="flex-1 px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-4 gap-4">
          {currentProducts.map((product) => (
            <CardComponent key={product.id} product={product} />
          ))}
        </main>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        renderPages={renderPages}
      />
    </div>
  );
};

export default HomeComponent;
