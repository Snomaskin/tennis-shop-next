import ShadowOverlay from "./ShadowOverlay";

export default function TennisCourt({
  shadowIntensity,
}: {
  shadowIntensity?: number;
}) {
  const W = 1000;
  const H = 650;

  const navbarH = 80;
  const courtStartY = navbarH + 40;

  const padX = 60;
  const padY = courtStartY;
  const courtW = W - padX * 2;
  const courtH = H - padY - 40;

  const left = padX;
  const right = padX + courtW;
  const top = padY;
  const bottom = padY + courtH;
  const midX = left + courtW / 2;

  const alleyFraction = (36.58 - 27.43) / 2 / 36.58;
  const alley = alleyFraction * courtH;
  const singlesTop = top + alley;
  const singlesBottom = bottom - alley;

  const serviceOffset = (6.4 / 11.885) * (courtW / 2);
  const serviceLineLeft = midX - serviceOffset;
  const serviceLineRight = midX + serviceOffset;

  const midY = top + courtH / 2;
  const centerMarkLen = 8;

  const lineColor = "#ffffff";
  const lineWidth = 3;
  const netPost = 10;

  return (
    <div
      className="absolute inset-0"
      style={{
        perspective: "900px",
        perspectiveOrigin: "50% 40%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: "rotateX(8deg)",
          transformOrigin: "50% 50%",
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <filter id="line-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#line-glow)">
            {/* Outer court boundary */}
            <rect
              x={left}
              y={top}
              width={courtW}
              height={courtH}
              fill="none"
              stroke={lineColor}
              strokeWidth={lineWidth}
            />

            {/* Singles sidelines */}
            <line
              x1={left}
              y1={singlesTop}
              x2={right}
              y2={singlesTop}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />
            <line
              x1={left}
              y1={singlesBottom}
              x2={right}
              y2={singlesBottom}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />

            {/* Service lines */}
            <line
              x1={serviceLineLeft}
              y1={singlesTop}
              x2={serviceLineLeft}
              y2={singlesBottom}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />
            <line
              x1={serviceLineRight}
              y1={singlesTop}
              x2={serviceLineRight}
              y2={singlesBottom}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />

            {/* Center service line */}
            <line
              x1={serviceLineLeft}
              y1={midY}
              x2={serviceLineRight}
              y2={midY}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />

            {/* Net */}
            <line
              x1={midX}
              y1={top - netPost}
              x2={midX}
              y2={bottom + netPost}
              stroke={lineColor}
              strokeWidth={lineWidth * 1.8}
            />

            {/* Net posts */}
            <rect
              x={midX - 12}
              y={top - netPost - 4}
              width={24}
              height={8}
              rx={2}
              fill={lineColor}
            />
            <rect
              x={midX - 12}
              y={bottom + netPost - 4}
              width={24}
              height={8}
              rx={2}
              fill={lineColor}
            />

            {/* Center marks on baselines */}
            <line
              x1={left}
              y1={midY}
              x2={left + centerMarkLen}
              y2={midY}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />
            <line
              x1={right}
              y1={midY}
              x2={right - centerMarkLen}
              y2={midY}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />
          </g>
        </svg>
      </div>
      <ShadowOverlay intensity={shadowIntensity} />
    </div>
  );
}
