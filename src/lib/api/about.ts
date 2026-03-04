import { AboutSection } from "@/types/about";
import { get } from "./fetcher";
import createAboutContent from "./utils/about";

const BASE_URL = "http://test.local/wp-json/wp/v2/pages?slug=about";

async function getAllAboutContentFormatted(): Promise<AboutSection[]> {
  const rawData = await get(BASE_URL).then((res) => res.json());
  const formattedData = createAboutContent(rawData[0]);
  return formattedData;
}

export { getAllAboutContentFormatted };
