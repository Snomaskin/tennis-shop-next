import { fetchCategories } from "../products";

export default async function findCategoryBySlug(slug: string): Promise<number> {
  const categories = await fetchCategories();
  const category = categories.find(c => c.slug === slug);
  
  if (!category) throw new Error(`Category with slug "${slug}" not found`);
  return category.id;
}