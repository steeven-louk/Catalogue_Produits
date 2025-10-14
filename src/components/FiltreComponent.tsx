import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

type Filter = {
  id: string;
  label: string;
  count: number;
};

type FiltreComponentProps = {
  onFilterApply?: (data:boolean) => void;
};

const FiltreComponent: React.FC<FiltreComponentProps> = ({ onFilterApply }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 60]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    labels: true,
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "BIO",
    "Label Rouge",
  ]);
console.log("onFilterApply",onFilterApply)
  const toggleSection = (section: "categories" | "labels") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };


  const toggleFilter = (label: string) => {
    setActiveFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setPriceRange([0, 60]);
  };

  const categories: Filter[] = [
    { id: "fruits-legumes", label: "Fruits & Légumes", count: 9999 },
    { id: "viandes", label: "Viandes & Charcuteries", count: 2646 },
    { id: "poissons", label: "Poissons & Fruits de mer", count: 511 },
    { id: "boissons", label: "Boissons & Alcools", count: 681 },
    { id: "epicerie-salee", label: "Épicerie salée", count: 2575 },
    { id: "epicerie-sucree", label: "Épicerie sucrée", count: 425 },
    { id: "produits-laitiers", label: "Produits laitiers", count: 112 },
    { id: "plats-traiteur", label: "Plats traiteur", count: 8361 },
  ];

  const labels: Filter[] = [
    { id: "bio", label: "BIO", count: 9999 },
    { id: "bleu-coeur", label: "Bleu Blanc Coeur", count: 8 },
    { id: "msc", label: "Pêche durable MSC", count: 9 },
    { id: "produit-annee", label: "Élu produit de l'année", count: 2 },
    { id: "montagne", label: "Produit de montagne", count: 1 },
    { id: "label-rouge", label: "Label Rouge", count: 9999 },
    { id: "aoc", label: "Appellation d'origine contrôlée", count: 1 },
    { id: "demeter", label: "Demeter", count: 0 },
  ];

  return (
    <aside className="w-full flex-shrink-0 p-4 overflow-y-auto">
      {/* Filtres actifs */}
      <h2 className="primary font-semibold mb-1 inline-flex items-baseline gap-1">Filtres <span className="block md:hidden plus-jakarta-sans text-[10px] text-[#AAAAAA]">(99)</span></h2>
      <hr className="mb-3  text-[#AAAAAA]" />
      <div className="flex flex-wrap gap-2 mb-3">
        <div className="flex items-center gap-1   text-xs px-2 py-1 text-[#AAAAAA] ">
          <RxCross2
            className="h-3 w-3 cursor-pointer primary"
            onClick={() => setPriceRange([0, 60])}
          />
          <span>
            {priceRange[0]}€ - {priceRange[1]}€
          </span>
        </div>

        {activeFilters.map((filter) => (
          <div
            key={filter}
            className="flex items-center gap-1   text-xs px-2 py-1 text-[#AAAAAA] "
          >
            <RxCross2
              className="h-3 w-3 cursor-pointer primary"
              onClick={() => toggleFilter(filter)}
            />
            <span className="plus-jakarta-sans">{filter}</span>
          </div>
        ))}
      </div>

      <button
        onClick={clearFilters}
        className="w-full text-sm bg-[#4EA04C1A] primary py-2 rounded-full hover:bg-green-200 transition mb-5"
      >
        Effacer tous les filtres
      </button>

      {/* Catégories */}
      <div className="mb-1">
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full mb-5 pb-1 border-b-1 border-[#AAAAAA]"
        >
          <h3 className="text-base font-semibold primary ">Catégories</h3>
          {expandedSections.categories ? (
            <BiMinus className="h-4 w-5 text[#E3E3E3]" />
          ) : (
            <BiPlus className="h-4 w-5 text[#E3E3E3]" />
          )}
        </button>

        {expandedSections.categories && (
          <ul className="space-y-2 text-sm text-[#AAAAAA] font-normal">
            {categories.map((item) => (
              <li
                key={item.id}
                className="flex justify-between hover:text-green-600"
              >
                <label className="cursor-pointer">{item.label}</label>
                <span className="text-[#AAAAAA]  text-xs">
                  {item.count >= 9999 ? "+9999" : item.count}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Labels */}
      <div className="my-4">
        <button
          onClick={() => toggleSection("labels")}
          className="flex items-center justify-between w-full mb-5 pb-1 border-b-1 border-[#AAAAAA]"
        >
          <div className="flex justify-between w-full">
            <h3 className="text-base font-semibold primary">Labels</h3>
            <div className="h-5 w-5 rounded-full bg-[#858585] flex text-white font-semibold text-xs   justify-center">
              <span className="m-auto">+9</span>
            </div>
          </div>
          {expandedSections.labels ? (
            <BiMinus className="h-4 w-5 text[#E3E3E3]" />
          ) : (
            <BiPlus className="h-4 w-5 text[#E3E3E3]" />
          )}
        </button>

        {expandedSections.labels && (
          <div className="space-y-2 text-sm">
            {labels.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={activeFilters.includes(item.label)}
                    onChange={() => toggleFilter(item.label)}
                    className="accent-green-600 cursor-pointer p-1"
                  />
                  <label
                    htmlFor={item.id}
                    className={`cursor-pointer plus-jakarta-sans ${
                      activeFilters.includes(item.label)
                        ? "primary font-medium"
                        : "text-[#AAAAAA] hover:text-green-600"
                    }`}
                  >
                    {item.label}
                  </label>
                </div>
                <span className="text-[#AAAAAA]  text-xs">
                  {item.count >= 9999 ? "+9999" : item.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={clearFilters}
        className="w-full text-sm bg-green-100 primary py-2 rounded-full hover:bg-green-200 transition"
      >
        Effacer le filtre
      </button>

      {onFilterApply && (
        <button
          onClick={()=>onFilterApply(false)}
         className="w-full mt-6 text-white py-2 rounded-full hover:bg-green-700 transition"
          style={{ backgroundColor: '#4EA04C' }} // Use inline style for clarity on primary color
        >
          Appliqué (9999)
        </button>
      )}
    </aside>
  );
};

export default FiltreComponent;
