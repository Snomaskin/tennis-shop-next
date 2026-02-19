import { getProductCategories } from "../products";

export default async function getCategoryId(name: string): Promise<number> {
  const categories = await getProductCategories();
  const category = categories.find(c => c.slug === name.toLowerCase());
  
  if (!category) throw new Error(`Category with slug "${name}" not found`);
  return category.id;
}