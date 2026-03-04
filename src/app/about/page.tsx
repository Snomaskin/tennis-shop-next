import { getAllAboutContentFormatted } from "@/lib/api/about";
import AboutExpandable from "./components/AboutExpandable";

export default async function About() {
  const content = await getAllAboutContentFormatted();

  return (
    <main className="mx-auto max-w-3xl px-4 py-30">
      <h1 className="mb-6 text-3xl font-bold">About</h1>

      <div className="flex flex-col gap-4">
        {content.map((section) => (
          <AboutExpandable key={section.section} content={section} />
        ))}
      </div>
    </main>
  );
}
