

type Product = {
  id: number
  name: string
  image: string
  price: number
  labels: string[]
  isSeasonal: boolean
}

const CardComponent = ({product}) => {

  return (
     <div 
          className="border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition bg-white relative"
        >
          {/* Image */}
          <div className="relative aspect-square bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />

            {/* Labels sur l’image */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isSeasonal && (
                <span className="text-[10px] font-medium text-white bg-green-500 px-2 py-0.5 rounded-full shadow">
                  Produit de saison
                </span>
              )}
              {product.labels?.map((label) => (
                <span
                  key={label}
                  className="text-[10px] font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full border border-green-300"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Infos du produit */}
          <div className="p-3">
            <p className="text-sm font-medium text-gray-800 truncate">
              {product.name}
            </p>
          </div>
        </div>
  )
}

export default CardComponent