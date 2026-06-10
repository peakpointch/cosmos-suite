import { onReady } from "@xatom/core";
import { app } from "./routes";
import Lenis from "lenis";
import gsap from "gsap";

import peakflow, { Selector } from "peakflow";

onReady(() => {
  global();

  app();
});

/**
 * Code that runs on all pages
 */
function global(): void {
  smoothScroll();
}

function smoothScroll(): void {
  const lenis = new Lenis({
    autoRaf: false,
  });

  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const resizeObserver = new ResizeObserver(() => {
    lenis.resize();
  });

  resizeObserver.observe(document.body);
}
