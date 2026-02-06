import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Selector } from "peakflow";

type AnimateElement =
  | "heading"
  | "nav-component"
  | "nav-brand"
  | "nav-link"
  | "nav-button"
  | "light-nav";
const animateSelector = Selector.attr<AnimateElement>("data-animate");

export function animateHeading(element: HTMLElement): void {
  if (element.classList.contains("is-split")) return;
  element.classList.add("is-split");

  const heading = new SplitText(element, {
    type: "words",
    wordsClass: "gsap-word",
  });
  gsap.from(heading.words, {
    y: 50,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: element,
      start: "top 80%", // Trigger when heading is 80% down the viewport
    },
  });
}

export function animateHeadings(): void {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const headings = document.querySelectorAll<HTMLElement>(
    "h1, h2, h3, h4, h5, h6"
  );

  headings.forEach((element) => animateHeading(element));
}
