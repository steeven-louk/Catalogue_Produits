import { BiChevronLeft, BiHome } from "react-icons/bi";

const HeaderComponent = () => {
  return (
    <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
      <img
        src="/assets/header.jpg"
        alt="header image"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      
      {/* Breadcrumb */}
      <div className="absolute top-4 md:top-6 left-4 md:left-6 flex items-center gap-2 md:gap-3">
        <div className="bg-white p-1 rounded-full">
          <BiChevronLeft className="text-lg md:text-xl" />
        </div>
        <div className="flex items-center gap-1 text-white text-sm md:text-base cursor-pointer">
          <BiHome />
          <div className="flex items-center gap-1">
            <span>Accueil</span>
            <span>/</span>
            <span>Tous nos produits</span>
          </div>
        </div>
      </div>

      {/* Titre */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
            Tous nos produits
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
