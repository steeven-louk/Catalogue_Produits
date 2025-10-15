import { supabase } from "../lib/supabaseClient";
import type { Product } from "../types/productType";


// 🔹 Fonction pour récupérer les produits paginés
export async function getProducts({
  page = 1,
  limit = 12,
  labels = [],
}: {
  page?: number;
  limit?: number;
  labels?: string[];
}) {
  let query = supabase
    .from("products")
    .select(
      `
      id,
      name,
      image,
      is_seasonal,
      product_labels:product_labels(
        labels:labels(titre, icon)
      )
      `,
      { count: "exact" }
    )
    .range((page - 1) * limit, page * limit - 1);

  if (labels.length > 0) {
    query = query.contains("product_labels.labels.titre", labels);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    data: (data as unknown) as Product[] || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}
