import { WFRoute } from "@xatom/core";
import { animateHeadings } from "../modules/animate";

function pathIsNot(...paths: string[]): boolean {
  return !paths.some((path) => window.location.pathname.includes(path));
}

export const app = () => {
  if (pathIsNot("impressum", "datenschutz")) {
    animateHeadings();
  }
};
