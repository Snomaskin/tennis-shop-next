import { EmblaEventType } from "embla-carousel";

declare module "embla-carousel" {
  interface EmblaEventListType {
    "autoscroll:play": EmblaEventType;
    "autoscroll:stop": EmblaEventType;
  }
}
