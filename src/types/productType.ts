// 🔹 Typage des labels
export type Label = {
  titre: string;
  icon: string;
};

// 🔹 Typage du produit retourné par Supabase
export type Product = {
  id: number;
  name: string;
  image: string;
  price?: number;
  is_seasonal: boolean;
  product_labels: {
    labels: Label;
  }[];
};

// FILLTER
export type Filter = {
  id: string;
  label: string;
  count: number;
};

export type FiltreComponentProps = {
  onFilterApply?: (data: boolean) => void;
};

export type HeaderFiltersProps = {
  resultsCount: number;
};
// FILLTER

export type CardComponentProps = {
  product: Product;
};

// PAGINATION
export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  renderPages: (number | string)[];
};