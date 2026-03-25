export default function ShadowOverlay({
  intensity = 1,
}: {
  intensity?: number;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse 70% 60% at 50% 55%, transparent 10%, rgba(120,80,20,${0.08 * intensity}) 70%, rgba(80,40,0,${0.1 * intensity}) 100%)`,
      }}
    />
  );
}
