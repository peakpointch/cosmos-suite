import { WFRoute } from "@xatom/core";
import { animateHeadings } from "../modules/animate";

function isPath(...paths: string[]): boolean {
  return paths.some((path) => window.location.pathname.includes(path));
}

export const app = () => {
  if (!isPath("impressum", "datenschutz")) {
    animateHeadings();
  }
};
