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

  gsap.set(element, {
    opacity: 0,
  });

  ScrollTrigger.create({
    trigger: element,
    start: "top 85%",
    once: true,
    onEnter: () => {
      element.classList.add("is-split");

      const heading = new SplitText(element, {
        type: "words",
        wordsClass: "gsap-word",
      });

      gsap.set(element, {
        opacity: 1,
      });

      gsap.fromTo(
        heading.words,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
        }
      );
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
