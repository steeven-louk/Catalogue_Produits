
  export const renderPageNumbers = (currentPage:number, totalPages:number) => {
    const pages: (number | string)[] = []
    const visiblePages = 3 // nombre de pages avant l'ellipse

    if (totalPages < 11) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= visiblePages) {
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (currentPage > totalPages - visiblePages) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        )
      }
    }
    return pages
  }