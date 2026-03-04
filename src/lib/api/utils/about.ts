import { formatLabel } from "@/lib/utils/textFormat";
import { AboutResponse, AboutSection } from "@/types/about";

export default function createAboutContent(raw: AboutResponse): AboutSection[] {
  return Object.entries(raw.acf.about).map(([sectionName, fields]) => ({
    section: formatLabel(sectionName),
    fields: Object.entries(fields).map(([fieldName, fieldValue]) => ({
      name: formatLabel(fieldName),
      value: fieldValue,
    })),
  }));
}
