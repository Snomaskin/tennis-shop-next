import Spinner from "@/components/loaders/Spinner";
import FadeInOut from "@/components/wrappers/FadeInOut";

export default function LoadingScreen() {
  return (
    <FadeInOut className="flex h-screen bg-gray-700 justify-center items-center z-10">
      <Spinner />
    </FadeInOut>
  );
}