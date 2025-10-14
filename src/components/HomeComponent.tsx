import HeaderComponent from "./HeaderComponent";
import FiltreComponent from "./FiltreComponent";
import CardComponent from "./CardComponent";
// import { LuSlidersHorizontal } from "react-icons/lu";
import HeaderFilters from "./HeaderFilter";
import { useMemo } from "react";



type Product = {
  id: number
  name: string
  image: string
  price: number
  labels: string[]
  isSeasonal: boolean
}

const IMAGES = [
  "/assets/produit-1.png",
  "/assets/produit-2.png",
  "/assets/produit-3.png",
  "/assets/produit-4.png",
  "/assets/produit-5.png",
]


// Génération aléatoire des produits
const generateProducts = (count: number): Product[] => {
  const products: Product[] = []
  for (let i = 0; i < count; i++) {
    const hasBio = Math.random() < 0.5
    const hasStg = Math.random() < 0.3
    const isSeasonal = Math.random() < 0.4

    const labels = []
    if (hasBio) labels.push("BIO")
    if (hasStg) labels.push("STG")

    products.push({
      id: i + 1,
      name: `Produit ${i + 1}`,
      image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
      price: Math.floor(Math.random() * 30) + 3,
      labels,
      isSeasonal,
    })
  }
  return products
}
const HomeComponent = () => {
  const products = useMemo(()=>generateProducts(50), [])
  return (
    <div>
      <HeaderComponent />
      {/* Results Header */}
      <HeaderFilters resultsCount={1688}/>
      <div className="flex">
          <FiltreComponent />
          <main className="flex-1 px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* <CardComponent /> */}
        {products.map((product) => (
          <CardComponent key={product.id} product={product}/>
      ))}
          </main>
      </div>
    </div>
  );
};

export default HomeComponent;
