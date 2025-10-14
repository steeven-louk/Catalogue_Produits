import { BiChevronLeft, BiHome } from "react-icons/bi"

const HeaderComponent = () => {
  return (
      <div className="relative h-32 md:h-40 lg:h-48 overflow-hidden">
        <img
          src="/assets/header.jpg"
          alt="header image"
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute container inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="container flex mx-auto gap-[10px] absolute top-5 left-15">
          <div className="bg-white p-0.5 rounded-full">
            <BiChevronLeft className="text-xl"/>
          </div>
          <div className="flex items-center gap-1 text-white cursor-pointer">
            <BiHome/>
            <div className="gap-1 items-center inline-flex">
              <span className="cursor-pointer">Acceuil</span>
              <span>/</span>
              <span>Tous nos produit</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Tous nos produits</h1>
          </div>
        </div>
      </div>
  )
}

export default HeaderComponent