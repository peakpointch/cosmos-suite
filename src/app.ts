import { onReady } from "@xatom/core";
import { app } from "./routes";
import Lenis from "lenis";

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
    autoRaf: true,
  });

  const resizeObserver = new ResizeObserver(() => {
    lenis.resize();
  });

  resizeObserver.observe(document.body);
}
