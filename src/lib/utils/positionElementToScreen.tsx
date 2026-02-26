export default function positionElementToScreen(
  ref: React.RefObject<HTMLElement | null>,
) {
  const handleResize = () => {
    if (!ref.current) return;

    ref.current.style.transform = "none";
    const rect = ref.current.getBoundingClientRect();

    if (rect.right > window.innerWidth) {
      const overflow = rect.right - window.innerWidth;
      ref.current.style.transform = `translateX(-${overflow + 15}px)`;
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}
