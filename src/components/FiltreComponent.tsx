import React, { useState } from "react";
import { BiCross, BiMinus, BiPlus } from "react-icons/bi";



type Filter = {
  id: string
  label: string
  count: number
}

type FiltreComponentProps = {
  onFilterApply?: () => void
}

const FiltreComponent:React.FC<FiltreComponentProps> = ({onFilterApply}) => {
 const [priceRange, setPriceRange] = useState<[number, number]>([0, 60])
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    labels: true,
  })
  const [activeFilters, setActiveFilters] = useState<string[]>(["BIO", "Label Rouge"])

  const toggleSection = (section: "categories" | "labels") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handlePriceChange = (index: number, value: string) => {
    const newRange = [...priceRange] as [number, number]
    newRange[index] = Number(value)
    setPriceRange(newRange)
  }

  const toggleFilter = (label: string) => {
    setActiveFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    )
  }

  const clearFilters = () => {
    setActiveFilters([])
    setPriceRange([0, 60])
  }

  const categories: Filter[] = [
    { id: "fruits-legumes", label: "Fruits & Légumes", count: 9999 },
    { id: "viandes", label: "Viandes & Charcuteries", count: 2646 },
    { id: "poissons", label: "Poissons & Fruits de mer", count: 511 },
    { id: "boissons", label: "Boissons & Alcools", count: 681 },
    { id: "epicerie-salee", label: "Épicerie salée", count: 2575 },
    { id: "epicerie-sucree", label: "Épicerie sucrée", count: 425 },
    { id: "produits-laitiers", label: "Produits laitiers", count: 112 },
    { id: "plats-traiteur", label: "Plats traiteur", count: 8361 },
  ]

  const labels: Filter[] = [
    { id: "bio", label: "BIO", count: 9999 },
    { id: "bleu-coeur", label: "Bleu Blanc Coeur", count: 8 },
    { id: "msc", label: "Pêche durable MSC", count: 9 },
    { id: "produit-annee", label: "Élu produit de l'année", count: 2 },
    { id: "montagne", label: "Produit de montagne", count: 1 },
    { id: "label-rouge", label: "Label Rouge", count: 9999 },
    { id: "aoc", label: "Appellation d'origine contrôlée", count: 1 },
    { id: "demeter", label: "Demeter", count: 0 },
  ]

  return (
    <aside className="w-full lg:w-78 flex-shrink-0 bg-white h-[400px]  p-4 shadow-sm overflow-y-scroll">
      {/* Filtres actifs */}
      <h2 className="text-green-700 font-semibold mb-1">Filtres</h2>
      <hr className="mb-3"/>
      <div className="flex flex-wrap gap-2 mb-3">
        <div className="flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">
          <span>
            {priceRange[0]}€ - {priceRange[1]}€
          </span>
          <BiCross className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 60])} />
        </div>

        {activeFilters.map((filter) => (
          <div
            key={filter}
            className="flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200"
          >
            <span>{filter}</span>
            <BiCross
              className="h-3 w-3 cursor-pointer"
              onClick={() => toggleFilter(filter)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={clearFilters}
        className="w-full text-sm bg-green-100 text-green-700 py-2 rounded-full hover:bg-green-200 transition mb-5"
      >
        Effacer tous les filtres
      </button>

      {/* Catégories */}
      <div className="mb-1">
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full mb-1"
        >
          <h3 className="text-base font-semibold text-gray-700">Catégories</h3>
          {expandedSections.categories ? (
            <BiMinus className="h-4 w-4 text-gray-500" />
          ) : (
            <BiPlus className="h-4 w-4 text-gray-500" />
          )}
        </button>
        <hr className="mb-5"/>

        {expandedSections.categories && (
          <ul className="space-y-2 text-sm text-gray-700">
            {categories.map((item) => (
              <li key={item.id} className="flex justify-between">
                <label className="cursor-pointer">{item.label}</label>
                <span className="text-gray-400 text-xs">
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
          className="flex items-center justify-between w-full mb-1"
        >
          <h3 className="text-base font-semibold text-gray-700">Labels</h3>
          {expandedSections.labels ? (
            <BiMinus className="h-4 w-4 text-gray-500" />
          ) : (
            <BiPlus className="h-4 w-4 text-gray-500" />
          )}
        </button>
        <hr className="mb-5"/>

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
                    className="accent-green-600 cursor-pointer"
                  />
                  <label htmlFor={item.id} className="cursor-pointer text-gray-700">
                    {item.label}
                  </label>
                </div>
                <span className="text-gray-400 text-xs">
                  {item.count >= 9999 ? "+9999" : item.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={clearFilters}
        className="w-full text-sm bg-green-100 text-green-700 py-2 rounded-full hover:bg-green-200 transition"
      >
        Effacer le filtre
      </button>

      {onFilterApply && (
        <button
          onClick={onFilterApply}
          className="w-full mt-6 lg:hidden bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Appliquer les filtres
        </button>
      )}
    </aside>
  )
}

export default FiltreComponent