import Spinner from "@/components/loaders/Spinner";
import FadeInOut from "@/components/wrappers/FadeInOut";
import ShadowOverlay from "../backgrounds/ShadowOverlay";

export default function LoadingScreen() {
  return (
    <FadeInOut className="z-10 flex h-screen w-screen items-center justify-center bg-amber-100">
      <ShadowOverlay intensity={5} />
      <Spinner />
    </FadeInOut>
  );
}
