import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { FaCross } from "react-icons/fa";
import { LuSlidersHorizontal } from "react-icons/lu";
import FiltreComponent from "./FiltreComponent";

type HeaderFiltersProps = {
  resultsCount: number;
};

const HeaderFilters: React.FC<HeaderFiltersProps> = ({ resultsCount }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState("pertinence");

  return (
    <div className="w-full container mx-auto p-1">
      {/* HEADER FILTRES */}
      <div className="flex items-center justify-between mb-4 md:mb-6 gap-4">
        <p className="text-sm text-gray-600 hidden md:inline">
          {resultsCount.toLocaleString()} résultats
        </p>

        {/* Menu de tri */}
        <div className="flex items-center justify-between sm:justify-normal w-full sm:w-fit">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 font-semibold ">
              Trier par :
            </span>
            <div className="relative">
              <select
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value)}
                className="appearance-none rounded-md pl-3  py-2 text-sm text-gray-700 focus:outline-none  focus:ring-green-500 cursor-pointer bg-white"
              >
                <option value="pertinence">Pertinence</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
                <option value="nouveaute">Nouveauté</option>
              </select>
              <BiChevronDown className="h-4 w-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Bouton Filtres Mobile */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center border bg-green-600 text-white rounded-full sm:px-3 sm:py-2 p-2 text-sm  hover:bg-gray-100 transition"
          >
            <LuSlidersHorizontal className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:block">Filtres ({99})</span>
          </button>
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={() => setMobileFiltersOpen(false)}
            />

            {/* Contenu du panneau */}
            <div className="relative bg-white w-80 max-w-full h-full shadow-lg p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Filtres</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <FaCross className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <FiltreComponent
                onFilterApply={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderFilters;
