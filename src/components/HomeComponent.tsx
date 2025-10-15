import { useEffect, useState } from "react";

import HeaderComponent from "./HeaderComponent";
import FiltreComponent from "./FiltreComponent";
import CardComponent from "./CardComponent";
import HeaderFilters from "./HeaderFilter";
import Pagination from "./PaginationComponent";

import { renderPageNumbers } from "../function/renderPageNumber";
import { getProducts} from "../services/getProduct";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import type { Product } from "../types/productType";

const HomeComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const itemsPerPage = 30;

  const renderPages = renderPageNumbers(currentPage, totalPages);

  useEffect(() => {
    setLoading(true);
    getProducts({ page: currentPage, limit: itemsPerPage })
      .then((res) => {
        setProducts(res.data);
        setTotalProduct(res.total)
        setTotalPages(res.totalPages);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  const goToPage = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <HeaderComponent />
      <HeaderFilters resultsCount={totalProduct} />

      <div className="flex flex-col lg:flex-row">
        <aside className="hidden lg:block lg:w-78">
          <FiltreComponent />
        </aside>

        <main className="flex-1 px-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-4 gap-3">
          {loading ? (
            <div className="w-fit mx-auto items-center justify-center absolute flex">
              <AiOutlineLoading3Quarters className="w-10 h-10 animate-spin" />
            </div>
          ) : (
            products.map((product) => (
              <CardComponent key={product.id} product={product} />
            ))
          )}
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
