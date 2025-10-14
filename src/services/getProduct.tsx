import { supabase } from "../lib/supabaseClient";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      image,
      is_seasonal,
      categories(name),
      product_labels(
        labels(titre, icon)
      )
    `)
    .limit(100);

  if (error) throw error;
  return data;
}
