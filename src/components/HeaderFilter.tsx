import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { LuSlidersHorizontal } from "react-icons/lu";
import FiltreComponent from "./FiltreComponent";
import { RxCross2 } from "react-icons/rx";
import type { HeaderFiltersProps } from "../types/productType";


const HeaderFilters: React.FC<HeaderFiltersProps> = ({ resultsCount }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState("pertinence");

  return (
    <div className="w-full lg:container lg:mx-auto p-1">
      <div className="w-full flex items-center justify-between mb-4 md:mb-6 px-3 gap-4">
        <p className="text-sm text-[#505050] hidden md:inline font-medium">
          {resultsCount.toLocaleString() || "1465"}{" "}
          <span className="text-[#858585] font-normal">résultats</span>
        </p>

        {/* Menu de tri */}
        <div className="flex items-center justify-between sm:justify-normal w-full sm:w-fit">
          <div className="flex items-center">
            <span className="text-sm text-[#505050] font-semibold ">
              Trier par :
            </span>
            <div className="relative">
              <select
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value)}
                className="appearance-none rounded-md pl-3  py-2 text-sm text-[#858585] focus:outline-none  focus:ring-green-500 cursor-pointer bg-white"
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
            className="lg:hidden flex items-center border bg-primary text-white rounded-full sm:px-3 sm:py-2 p-2 text-sm  hover:bg-gray-100 transition"
          >
            <LuSlidersHorizontal className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:block">Filtres ({99})</span>
          </button>
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="fixed  inset-0"
              onClick={() => setMobileFiltersOpen(false)}
            />

            {/* Contenu du panneau */}
            <div
              className={`fixed top-0 left-0 bg-white w-full max-w-full h-full shadow-lg p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out 
                ${mobileFiltersOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="cursor-pointer p-2 flex mb-4 ml-auto rounded-full bg-[#F4F4F4] hover:bg-gray-100 transition"
              >
                <RxCross2 className="h-5 w-5 text-[#AAAAAA]" />
              </button>

              {/* Le FiltreComponent reçoit la fonction pour fermer le panneau */}
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
