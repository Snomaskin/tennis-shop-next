import { getAllAboutContentFormatted } from "@/lib/api/about";
import AboutExpandable from "./components/AboutExpandable";
import TennisCourt from "@/components/backgrounds/TennisCourt";

export default async function About() {
  const content = await getAllAboutContentFormatted();

  return (
    <main className="relative flex min-h-screen max-w-2xl min-w-screen justify-center overflow-hidden bg-amber-100 px-4 pb-5">
      <TennisCourt shadowIntensity={3} />
      <div className="flex max-w-1/2 min-w-1/2 flex-col items-center justify-center gap-2">
        <div className="flex w-full flex-col items-center self-center rounded-2xl border border-neutral-200/60 bg-white/50 p-5 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold text-neutral-800">About</h1>
          <p className="mt-1 text-sm text-neutral-400">Learn more about us</p>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          {content.map((section) => (
            <AboutExpandable key={section.section} content={section} />
          ))}
        </div>
      </div>
    </main>
  );
}
