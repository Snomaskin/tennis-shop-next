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

  const resizeObserver = new ResizeObserver(handleResize);
  if (ref.current) resizeObserver.observe(ref.current);

  window.addEventListener("resize", handleResize);

  return () => {
    resizeObserver.disconnect();
    window.removeEventListener("resize", handleResize);
  };
}
