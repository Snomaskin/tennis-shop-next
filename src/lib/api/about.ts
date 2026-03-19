import { AboutSection } from "@/types/about";
import { wp } from "./kyApi";
import createAboutContent from "./utils/about";

async function getAllAboutContentFormatted(): Promise<AboutSection[]> {
  const data = await wp
    .get("pages", {
      searchParams: { slug: "about" },
    })
    .json<any[]>();

  return createAboutContent(data[0]);
}

export { getAllAboutContentFormatted };
