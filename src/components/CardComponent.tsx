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

type CardComponentProps = {
  product: Product;
};

const CardComponent = ({ product }: CardComponentProps) => {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition bg-white relative">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />

        {/* Labels sur l’image */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isSeasonal && (
            <span className="text-[10px] font-medium bg-white text-green-600 px-2 py-0.5 rounded-full shadow border border-green-200">
              Produit de saison
            </span>
          )}

          {product.labels?.map((label, index) => (
            <div
              key={`${label.titre}-${index}`}
              className="flex items-center w-fit gap-1 bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100"
            >
              <img
                src={label.icon}
                alt={label.titre}
                className="w-4 h-4 object-contain"
              />
              <span className="text-[10px] font-medium text-gray-700">
                {label.titre}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Infos du produit */}
      <div className="p-3 flex flex-col gap-1">
        <p className="text-sm font-medium text-[#505050] truncate">
          {product.name}
        </p>
      </div>
    </div>
  );
};

export default CardComponent;
