"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import WheelGestures from "embla-carousel-wheel-gestures";
import { Product } from "@/types/products";
import Card from "./Card";
import "./embla.css";

type Props = {
  products: Product[];
  options?: EmblaOptionsType;
};

const EmblaCarousel = ({ products, options }: Props) => {
  const [emblaRef] = useEmblaCarousel({ ...options, loop: true }, [
    AutoScroll({
      startDelay: 0,
      playOnInit: true,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
    WheelGestures(),
  ]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {products.map((product) => (
          <div className="embla__slide" key={product.id}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
