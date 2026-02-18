"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "@/types/products";
import Card from "./Card";
import { Observer } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Observer);

const RADIUS = 200;
const SCALE_MIN = 0.2;
const SCALE_MAX = 1.7;

function map(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const rotation = useRef({ value: 0 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const total = products.length;
      const baseAngles = products.map((_, i) => (i / total) * Math.PI * 3);

      const render = () => {
        itemsRef.current.forEach((el, i) => {
          const angle = baseAngles[i] + rotation.current.value;
          const depth = Math.cos(angle);
          const scale = map(depth, -1, 1, SCALE_MAX, SCALE_MIN);
          const radiusScale = map(depth, -1, 1, 3, 1);
          const scaledRadius = RADIUS * radiusScale;

          const x = Math.sin(angle) * scaledRadius * 1.4;
          const bendAmount = 100;
          const bend = (x / (scaledRadius * 1.4)) ** 2 * bendAmount;
          const y = Math.cos(angle) * scaledRadius * 0.5 + bend;
          gsap.set(el, {
            x,
            y,
            force3D: true,
            willChange: "transform",
            xPercent: 500,
            yPercent: 800,
            scale,
          });
        });
      };

      const loop = gsap.to(rotation.current, {
        value: `+=${Math.PI * 2}`,
        duration: 10,
        repeat: -1,
        ease: "none",
        onUpdate: render,
      });

      const slow = gsap.to(loop, { timeScale: 0, duration: 0.5 });

      Observer.create({
        target: wheelRef.current,
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onChange: (self) => {
          loop.timeScale(-self.deltaY * 0.03);
          slow.invalidate().restart();
        },
      });

      render();
    }, wheelRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: "1000px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "900px",
          height: "900px",
        }}
      >
        <div
          ref={wheelRef}
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transform: "rotateZ(-30deg)",
          }}
        >
          {products.map((p, i) => (
            <Card
              key={p.id}
              ref={(el: HTMLDivElement | null) => {
                if (!el) return;
                itemsRef.current[i] = el;
              }}
              product={p}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
