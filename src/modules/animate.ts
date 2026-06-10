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

export function createObserver(
  callback: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => any,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry, observer);
      }
    });
  }, options);
  return observer;
}

export function headingAnimation(
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
): void {
  const element = entry.target as HTMLElement;

  if (element.classList.contains("is-split")) return;

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

  observer.unobserve(element);
}

export function animateHeadings(): void {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const headings = document.querySelectorAll<HTMLElement>(
    "h1, h2, h3, h4, h5, h6"
  );

  const observer = createObserver(headingAnimation, {
    rootMargin: "0px 0px -15% 0px",
  });

  headings.forEach((element) => {
    gsap.set(element, {
      opacity: 0,
    });

    observer.observe(element);
  });
}
