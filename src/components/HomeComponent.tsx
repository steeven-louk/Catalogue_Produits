import HeaderComponent from "./HeaderComponent";
import FiltreComponent from "./FiltreComponent";
import CardComponent from "./CardComponent";
import { LuSlidersHorizontal } from "react-icons/lu";
import { useState } from "react";

const HomeComponent = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  return (
    <div>
      <HeaderComponent />
      {/* Results Header */}
      <div className="container mx-auto flex items-center justify-between mb-4 md:mb-6 gap-4 p-2">
        <div className="flex items-center gap-3">
          {/* 1. Mobile Filter Button (replacing SheetTrigger/Button) */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-md lg:hidden bg-transparent hover:bg-gray-50 transition"
            aria-label="Ouvrir les filtres"
          >
            {/* SlidersHorizontal icon would be rendered here */}
            <LuSlidersHorizontal className="h-4 w-4 mr-2" />
            Filtres
          </button>

          <p className="text-sm">
            1 665 <span className="text-gray-600">résultats</span>
          </p>
        </div>

        <div className="flex items-center">
          <span className="text-sm hidden sm:inline">Trier par</span>

          {/* 2. Sort Dropdown (replacing Select component) */}
          <select
            defaultValue="pertinence"
            className="w-[120px] sm:w-[140px] text-gray-600 border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm bg-white  focus:ring-blue-500 "
          >
            <option value="pertinence">Pertinence</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="nouveaute">Nouveauté</option>
          </select>
          {/* Note: In production, you might add a custom arrow icon next to the select for better styling, as 'appearance-none' removes the default one. */}
        </div>
      </div>
      <div className="flex">
        <div className="sidebar">
          <FiltreComponent />
        </div>
        <CardComponent />
      </div>
    </div>
  );
};

export default HomeComponent;
