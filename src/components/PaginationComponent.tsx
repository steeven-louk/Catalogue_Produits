import React from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
type Product = {
  id: number
  name: string
  image: string
  price: number
  labels: string[]
  isSeasonal: boolean
}
type paginationType={
    currentPage: number;
    totalPages: number;
    goToPage: (currentPage:number)=> void;
    renderPages: any
}

const Pagination:React.FC<paginationType> = ({currentPage, goToPage,renderPages,totalPages}) => {

  return (
    <div className="flex justify-center items-center gap-2 my-5">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-1 py-1 rounded-full text-sm border border-gray-300 hover:bg-gray-100 transition ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <BiChevronLeft/>
            </button>
            {renderPages.map((page, index) =>
              
              typeof page === "number" ? (
                <button
                  key={index}
                  onClick={() => goToPage(page)}
                  className={`relative px-3 py-1 text-sm ${
                    page === currentPage
                      ? "text-green-600 "
                      : " hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {page}
                  {page === currentPage && <div className="bg-green-600 w-1 h-1 rounded-full absolute left-3.5">
                    
                    </div>}
                </button>
              ) : (
                <span key={index} className="px-2 text-gray-400">
                  {page}
                </span>
              )
            )}
    
    
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-1 py-1 rounded-full text-sm border border-gray-300 hover:bg-gray-100 transition ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
                        <BiChevronRight/>
            </button>
          </div>
  )
}

export default Pagination